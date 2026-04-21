#!/usr/bin/env node
/**
 * Validates that all original VuePress URLs exist in the Astro build output.
 * Run after `pnpm build`.
 *
 * Usage: node scripts/validate-urls.mjs
 */

import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const CONTENT_DIR = path.resolve('src/content');
const WORKS_DIR = path.join(CONTENT_DIR, 'works');

// ============================================
// 1. Collect slugs from article collections (blog/notes/posts)
//    — these map to /pages/{slug}/
//    works uses /works/{slug}/ and is handled separately below.
// ============================================
const articleSlugs = new Map(); // slug → title
const workSlugs = new Map();

function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return {};
  const fm = fmMatch[1];
  const slugMatch = fm.match(/^slug:\s*['"]?(.+?)['"]?\s*$/m);
  const titleMatch = fm.match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
  return {
    slug: slugMatch ? slugMatch[1] : null,
    title: titleMatch ? titleMatch[1] : null,
  };
}

function scanDir(dir, target) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full, target);
    } else if (entry.name.endsWith('.md')) {
      try {
        const { slug, title } = parseFrontmatter(fs.readFileSync(full, 'utf8'));
        if (slug) target.set(slug, title || entry.name);
      } catch {
        // skip unparseable files
      }
    }
  }
}

for (const entry of fs.readdirSync(CONTENT_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = path.join(CONTENT_DIR, entry.name);
  if (dir === WORKS_DIR) {
    scanDir(dir, workSlugs);
  } else {
    scanDir(dir, articleSlugs);
  }
}

// ============================================
// 2. Check each slug exists in its respective dist path
// ============================================
const results = { pass: [], fail: [] };

for (const [slug, title] of articleSlugs) {
  const htmlPath = path.join(DIST, 'pages', slug, 'index.html');
  const url = `/pages/${slug}/`;
  if (fs.existsSync(htmlPath)) results.pass.push({ url, title });
  else results.fail.push({ url, title });
}

for (const [slug, title] of workSlugs) {
  const htmlPath = path.join(DIST, 'works', slug, 'index.html');
  const url = `/works/${slug}/`;
  if (fs.existsSync(htmlPath)) results.pass.push({ url, title });
  else results.fail.push({ url, title });
}

// ============================================
// 3. Check special pages
// ============================================
const specialPages = [
  '/',
  '/blog/',
  '/notes/',
  '/works/',
  '/archives/',
  '/categories/',
  '/tags/',
];

for (const url of specialPages) {
  const htmlPath = path.join(DIST, url, 'index.html');
  if (fs.existsSync(htmlPath)) {
    results.pass.push({ url, title: 'Special: ' + url });
  } else {
    results.fail.push({ url, title: 'Special: ' + url });
  }
}

// ============================================
// 4. Report
// ============================================
console.log('\n=== URL Validation Report ===\n');
console.log(`Article slugs: ${articleSlugs.size}`);
console.log(`Work slugs:    ${workSlugs.size}`);
console.log(`Special pages: ${specialPages.length}`);
console.log(`PASS:          ${results.pass.length}`);
console.log(`FAIL:          ${results.fail.length}`);

if (results.fail.length > 0) {
  console.log('\n--- FAILED URLs ---');
  for (const { url, title } of results.fail) {
    console.log(`  MISSING: ${url} (${title})`);
  }
  process.exit(1);
} else {
  console.log('\n  ALL URLs VALIDATED SUCCESSFULLY');
}

// ============================================
// 5. Check for sitemap
// ============================================
const sitemapPath = path.join(DIST, 'sitemap-index.xml');
if (fs.existsSync(sitemapPath)) {
  console.log('\n  Sitemap: FOUND');
} else {
  console.log('\n  Sitemap: MISSING (check @astrojs/sitemap config)');
}
