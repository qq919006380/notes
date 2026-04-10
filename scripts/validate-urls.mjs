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

// ============================================
// 1. Collect all slugs from content collections
// ============================================
const slugs = new Map(); // slug → title

function scanContent(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanContent(full);
    } else if (entry.name.endsWith('.md')) {
      try {
        const raw = fs.readFileSync(full, 'utf8');
        // Simple frontmatter parsing (no dependency on gray-matter)
        const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
        if (fmMatch) {
          const fm = fmMatch[1];
          const slugMatch = fm.match(/^slug:\s*['"]?(.+?)['"]?\s*$/m);
          const titleMatch = fm.match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
          if (slugMatch) {
            slugs.set(slugMatch[1], titleMatch ? titleMatch[1] : entry.name);
          }
        }
      } catch (e) {
        // skip unparseable files
      }
    }
  }
}

scanContent(CONTENT_DIR);

// ============================================
// 2. Check each slug exists in dist/pages/
// ============================================
const results = { pass: [], fail: [] };

for (const [slug, title] of slugs) {
  const htmlPath = path.join(DIST, 'pages', slug, 'index.html');
  if (fs.existsSync(htmlPath)) {
    results.pass.push({ url: `/pages/${slug}/`, title });
  } else {
    results.fail.push({ url: `/pages/${slug}/`, title });
  }
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
console.log(`Total article slugs: ${slugs.size}`);
console.log(`Special pages:       ${specialPages.length}`);
console.log(`PASS:                ${results.pass.length}`);
console.log(`FAIL:                ${results.fail.length}`);

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
