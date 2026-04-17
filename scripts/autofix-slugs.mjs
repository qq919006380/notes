#!/usr/bin/env node
/**
 * Pre-build hook: auto-fill missing slugs in frontmatter.
 *
 * Rules:
 * - Only fills when slug field is ABSENT. Never touches an existing slug
 *   (even if malformed) — existing slugs are treated as SEO contracts.
 * - Writes slug directly after the title line to keep diffs minimal.
 * - In CI, exits non-zero if any file was modified (forces local commit).
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { customAlphabet } from 'nanoid';

const COLLECTIONS = ['blog', 'notes', 'posts', 'works'];
const nanohex = customAlphabet('0123456789abcdef', 6);

function collectExistingSlugs() {
  const slugs = new Set();
  for (const c of COLLECTIONS) {
    const dir = path.resolve('src/content', c);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (data.slug) slugs.add(String(data.slug));
    }
  }
  return slugs;
}

function uniqueSlug(existing) {
  for (let i = 0; i < 50; i++) {
    const s = nanohex();
    if (!existing.has(s)) {
      existing.add(s);
      return s;
    }
  }
  throw new Error('Could not generate a unique slug after 50 tries');
}

// Insert `slug: xxx` right after the `title:` line in frontmatter.
// Falls back to inserting at the top of frontmatter if no title line.
function insertSlug(raw, slug) {
  const fmMatch = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)/);
  if (!fmMatch) return null;
  const [full, open, body, close] = fmMatch;
  const rest = raw.slice(full.length);

  let newBody;
  if (/^title:/m.test(body)) {
    newBody = body.replace(/^(title:\s*.*)$/m, `$1\nslug: ${slug}`);
  } else {
    newBody = `slug: ${slug}\n${body}`;
  }
  return open + newBody + close + rest;
}

const existing = collectExistingSlugs();
const filled = [];
const skipped = [];

for (const c of COLLECTIONS) {
  const dir = path.resolve('src/content', c);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const filePath = path.join(dir, f);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);
    if (data.slug !== undefined && data.slug !== null && data.slug !== '') continue;

    const slug = uniqueSlug(existing);
    const newRaw = insertSlug(raw, slug);
    if (newRaw === null) {
      skipped.push(`${c}/${f}: no frontmatter block`);
      continue;
    }
    fs.writeFileSync(filePath, newRaw);
    filled.push({ file: `${c}/${f}`, slug });
  }
}

if (filled.length > 0) {
  console.log(`\n⚠ autofix-slugs: generated ${filled.length} slug(s)`);
  for (const { file, slug } of filled) {
    console.log(`  + ${file}  →  slug: ${slug}`);
  }
  console.log('\n  These changes were written to source files.');
  console.log('  Please `git commit` them so URLs stay stable.\n');
}

if (skipped.length > 0) {
  console.log('skipped:');
  for (const s of skipped) console.log(`  ${s}`);
}

if (process.env.CI && filled.length > 0) {
  console.error('❌ CI build detected un-committed slug generation.');
  console.error('   Run `pnpm build` locally, commit the changes, then push.');
  process.exit(1);
}
