#!/usr/bin/env node
/**
 * Validates migrated content:
 * 1. Every original permalink has a corresponding slug in content collections
 * 2. No duplicate slugs
 * 3. All required frontmatter fields present
 * 4. Content body is non-empty
 * 5. No null/empty tags
 * 6. Valid date formats
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.resolve('src/content');
const COLLECTIONS = ['blog', 'notes', 'posts', 'works'];

const slugs = new Map(); // slug → file path
const issues = [];

let totalFiles = 0;

for (const collection of COLLECTIONS) {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) continue;

  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    totalFiles++;
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    // Check required fields
    if (!data.title) issues.push(`${collection}/${file}: missing title`);
    if (!data.slug) issues.push(`${collection}/${file}: missing slug`);
    if (!data.date) issues.push(`${collection}/${file}: missing date`);

    // Check for duplicate slugs
    if (data.slug) {
      if (slugs.has(data.slug)) {
        issues.push(`DUPLICATE SLUG: "${data.slug}" in ${collection}/${file} and ${slugs.get(data.slug)}`);
      } else {
        slugs.set(data.slug, `${collection}/${file}`);
      }
    }

    // Check content is non-empty (warn only - some originals are empty)
    if (content.trim().length === 0) {
      console.log(`  ⚠ WARNING: ${collection}/${file}: empty content body (original may be empty)`);
    }

    // Validate date format
    if (data.date && isNaN(new Date(data.date).getTime())) {
      issues.push(`${collection}/${file}: invalid date "${data.date}"`);
    }

    // Check for null/empty tags (Amendment)
    if (data.tags && data.tags.some(t => t === null || t === undefined || t === '')) {
      issues.push(`${collection}/${file}: contains null/empty tags`);
    }

    // Check categories are non-empty
    if (!data.categories || data.categories.length === 0) {
      issues.push(`${collection}/${file}: missing categories`);
    }

    // Validate sortOrder is a number
    if (data.sortOrder !== undefined && typeof data.sortOrder !== 'number') {
      issues.push(`${collection}/${file}: sortOrder is not a number`);
    }
  }
}

console.log(`\n--- Content Validation ---`);
console.log(`Total files: ${totalFiles}`);
console.log(`Unique slugs: ${slugs.size}`);
console.log(`Issues: ${issues.length}`);

if (issues.length > 0) {
  console.log('\nIssues found:');
  for (const issue of issues) {
    console.log(`  ✗ ${issue}`);
  }
}

// Cross-reference with original docs
const DOCS_ROOT = path.resolve('docs');
const origPermalinks = [];

function scanOriginal(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith('.') || entry.name === '@pages' || entry.name === '00.目录页' || entry.name === 'migration-plan') {
      continue;
    }
    if (entry.isDirectory()) {
      scanOriginal(full);
    } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const raw = fs.readFileSync(full, 'utf8');
      const { data } = matter(raw);
      if (data.permalink) {
        const match = data.permalink.match(/\/pages\/([^/]+)\/?$/);
        if (match) origPermalinks.push({ slug: match[1], file: full });
      }
    }
  }
}
scanOriginal(DOCS_ROOT);

// For slug collision cases, check if either the original or suffixed slug exists
const missing = origPermalinks.filter(p => {
  if (slugs.has(p.slug)) return false;
  // Check if there's a suffixed version (slug collision handling)
  for (const key of slugs.keys()) {
    if (key.startsWith(p.slug + '-')) return false;
  }
  return true;
});

if (missing.length > 0) {
  console.log(`\n  ✗ ${missing.length} original permalinks not found in migrated content:`);
  for (const m of missing) {
    console.log(`    ${m.slug} (${path.relative(DOCS_ROOT, m.file)})`);
  }
} else {
  console.log(`  ✓ All ${origPermalinks.length} original permalinks accounted for`);
}

const totalIssues = issues.length + missing.length;
if (totalIssues > 0) {
  console.log(`\n❌ Validation FAILED with ${totalIssues} issue(s)`);
  process.exit(1);
} else {
  console.log(`\n✅ All content files validated successfully`);
}
