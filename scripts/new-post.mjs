#!/usr/bin/env node
/**
 * Create a new post with an auto-generated 6-hex slug.
 *
 * Usage:
 *   pnpm new "标题"                    # defaults to notes
 *   pnpm new "标题" blog              # specify collection
 *   pnpm new "标题" blog --slug abc123  # custom slug (must be 6-hex)
 */

import fs from 'node:fs';
import path from 'node:path';
import { customAlphabet } from 'nanoid';
import matter from 'gray-matter';

const HEX6 = /^[a-f0-9]{6}$/;
const nanohex = customAlphabet('0123456789abcdef', 6);

const COLLECTIONS = {
  blog: { dir: 'src/content/blog', category: '个人博客' },
  notes: { dir: 'src/content/notes', category: '笔记' },
  posts: { dir: 'src/content/posts', category: '随笔' },
  works: { dir: 'src/content/works', category: '个人作品' },
};

const MAP_FILE = 'scripts/permalink-map.json';

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) flags[a.slice(2)] = argv[++i];
    else positional.push(a);
  }
  return { positional, flags };
}

function sanitizeFilename(title) {
  // Replace filesystem-hostile chars with '_', collapse whitespace
  return title.replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, ' ').trim();
}

function collectExistingSlugs() {
  const slugs = new Map();
  for (const [name, { dir }] of Object.entries(COLLECTIONS)) {
    const abs = path.resolve(dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      if (!f.endsWith('.md')) continue;
      const raw = fs.readFileSync(path.join(abs, f), 'utf8');
      const { data } = matter(raw);
      if (data.slug) slugs.set(String(data.slug), `${name}/${f}`);
    }
  }
  return slugs;
}

function generateUniqueSlug(existing) {
  for (let tries = 0; tries < 50; tries++) {
    const s = nanohex();
    if (!existing.has(s)) return s;
  }
  throw new Error('Could not generate a unique slug after 50 tries');
}

function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const [title, collectionArg = 'notes'] = positional;

  if (!title) {
    console.error('Usage: pnpm new "标题" [collection] [--slug abc123]');
    process.exit(1);
  }

  const collection = COLLECTIONS[collectionArg];
  if (!collection) {
    console.error(`Unknown collection "${collectionArg}". Valid: ${Object.keys(COLLECTIONS).join(', ')}`);
    process.exit(1);
  }

  const existing = collectExistingSlugs();

  let slug = flags.slug;
  if (slug) {
    if (!HEX6.test(slug)) {
      console.error(`--slug "${slug}" must match ${HEX6}`);
      process.exit(1);
    }
    if (existing.has(slug)) {
      console.error(`slug "${slug}" already used by ${existing.get(slug)}`);
      process.exit(1);
    }
  } else {
    slug = generateUniqueSlug(existing);
  }

  const filename = `${sanitizeFilename(title)}.md`;
  const filepath = path.resolve(collection.dir, filename);
  if (fs.existsSync(filepath)) {
    console.error(`File exists: ${filepath}\nUse a different title or add a suffix.`);
    process.exit(1);
  }

  const today = new Date().toISOString();
  const frontmatter = [
    '---',
    `title: ${title}`,
    `slug: ${slug}`,
    `date: '${today}'`,
    'categories:',
    `  - ${collection.category}`,
    'tags: []',
    'draft: false',
    'sortOrder: 0',
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(filepath, frontmatter);

  // Append to permalink registry so validator knows this slug is live.
  const mapPath = path.resolve(MAP_FILE);
  if (fs.existsSync(mapPath)) {
    const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    map.push({ slug, title, collection: collectionArg });
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2) + '\n');
  }

  console.log(`Created ${path.relative(process.cwd(), filepath)}`);
  console.log(`  slug: ${slug}`);
  console.log(`  url:  /pages/${slug}/`);
}

main();
