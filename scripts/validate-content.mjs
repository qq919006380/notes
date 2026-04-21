#!/usr/bin/env node
/**
 * Validates content collections:
 * 1. Required frontmatter fields present (title, slug, date, categories)
 * 2. Slug matches /^[a-f0-9]{6}$/ or is legacy-whitelisted
 * 3. No duplicate slugs
 * 4. Date is valid, tags contain no null/empty, sortOrder is a number
 * 5. Every permalink in permalink-map.json still exists (SEO registry check)
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.resolve('src/content');
// works is excluded: it has its own schema and semantic slugs.
const COLLECTIONS = ['blog', 'notes', 'posts'];
const HEX6 = /^[a-f0-9]{6}$/;
const LEGACY_SLUGS = new Set(['796ac5-心流']);

const slugs = new Map();
const issues = [];
let totalFiles = 0;

for (const collection of COLLECTIONS) {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) continue;

  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    totalFiles++;
    const filePath = path.join(dir, file);
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    const tag = `${collection}/${file}`;

    if (!data.title) issues.push(`${tag}: missing title`);
    if (!data.date) issues.push(`${tag}: missing date`);
    if (data.date && isNaN(new Date(data.date).getTime())) {
      issues.push(`${tag}: invalid date "${data.date}"`);
    }
    if (!data.categories || data.categories.length === 0) {
      issues.push(`${tag}: missing categories`);
    }
    if (data.tags && data.tags.some(t => t === null || t === undefined || t === '')) {
      issues.push(`${tag}: contains null/empty tags`);
    }
    if (data.sortOrder !== undefined && typeof data.sortOrder !== 'number') {
      issues.push(`${tag}: sortOrder is not a number`);
    }
    if (content.trim().length === 0) {
      console.log(`  ⚠ ${tag}: empty content body`);
    }

    // Slug validation
    if (!data.slug) {
      issues.push(`${tag}: missing slug`);
      continue;
    }
    const slug = String(data.slug);
    if (!HEX6.test(slug) && !LEGACY_SLUGS.has(slug)) {
      issues.push(`${tag}: slug "${slug}" must be 6-hex or legacy-whitelisted`);
    }
    if (slugs.has(slug)) {
      issues.push(`DUPLICATE SLUG "${slug}": ${tag} vs ${slugs.get(slug)}`);
    } else {
      slugs.set(slug, tag);
    }
  }
}

// SEO registry check: every slug recorded in permalink-map.json must still exist.
const MAP_FILE = path.resolve('scripts/permalink-map.json');
let missingFromRegistry = [];
if (fs.existsSync(MAP_FILE)) {
  const registry = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
  missingFromRegistry = registry.filter(entry => !slugs.has(entry.slug));
}

console.log(`\n--- Content Validation ---`);
console.log(`Files:        ${totalFiles}`);
console.log(`Unique slugs: ${slugs.size}`);
console.log(`Issues:       ${issues.length}`);

if (issues.length > 0) {
  console.log('\nIssues:');
  for (const issue of issues) console.log(`  ✗ ${issue}`);
}

if (missingFromRegistry.length > 0) {
  console.log(`\n  ✗ ${missingFromRegistry.length} registered permalinks have no matching article:`);
  for (const m of missingFromRegistry) {
    console.log(`    ${m.slug} — "${m.title}" (${m.collection})`);
  }
}

const total = issues.length + missingFromRegistry.length;
if (total > 0) {
  console.log(`\n❌ Validation FAILED (${total} issue(s))`);
  process.exit(1);
}
console.log(`\n✅ All ${totalFiles} files passed`);
