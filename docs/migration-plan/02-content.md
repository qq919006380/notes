# Sub-Plan 2: Content Migration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all 110 markdown files from VuePress `docs/` to Astro `src/content/`, transforming frontmatter to match Content Collections schema while preserving all content.

**Architecture:** A Node.js migration script reads each markdown file, transforms the frontmatter (extracts slug from permalink, normalizes dates, removes vdoing-specific fields), and writes to the appropriate Astro content collection directory. The script is idempotent and can be re-run safely.

**Tech Stack:** Node.js script, gray-matter (YAML frontmatter parser), fs/path

---

### Task 1: Create the Migration Script

**Files:**
- Create: `scripts/migrate-content.mjs`

- [ ] **Step 1: Write the migration script**

Write to `scripts/migrate-content.mjs`:

```javascript
#!/usr/bin/env node
/**
 * VuePress → Astro content migration script.
 *
 * Reads markdown files from docs/, transforms frontmatter,
 * and writes to src/content/{collection}/.
 *
 * Usage: node scripts/migrate-content.mjs
 *
 * Idempotent: safe to re-run (overwrites target files).
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_ROOT = path.resolve('docs');
const CONTENT_ROOT = path.resolve('src/content');

// Mapping: source directory → target collection
const DIR_MAP = {
  '01.个人博客': 'blog',
  '02.学习笔记': 'notes',
  '03.个人作品': 'works',
  '_posts': 'posts',
};

// Files/dirs to skip
const SKIP = new Set(['.vuepress', '@pages', '00.目录页', 'index.md']);

/**
 * Recursively find all .md files in a directory.
 */
function findMarkdownFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Extract slug from VuePress permalink.
 * "/pages/fa532d/" → "fa532d"
 */
function extractSlug(permalink) {
  if (!permalink) return null;
  const match = permalink.match(/\/pages\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

/**
 * Generate a filename-safe slug from the file path.
 * "02.小白都能看懂的闭包.md" → "小白都能看懂的闭包"
 */
function fileNameToSlug(filePath) {
  const base = path.basename(filePath, '.md');
  // Remove numeric prefix like "02." or "01."
  return base.replace(/^\d+\./, '');
}

/**
 * Determine subcategory from directory structure.
 * "docs/01.个人博客/01.技术分享/08.xxx.md" → ["个人博客", "技术分享"]
 * "docs/_posts/笔记/xxx.md" → ["随笔", "笔记"]
 */
function extractCategories(filePath, existingCategories) {
  // Use existing categories from frontmatter if available
  if (existingCategories && existingCategories.length > 0) {
    return existingCategories;
  }
  const rel = path.relative(DOCS_ROOT, filePath);
  const parts = rel.split(path.sep);
  const cats = [];
  for (const part of parts.slice(0, -1)) {
    // Remove numeric prefix
    const clean = part.replace(/^\d+\./, '');
    if (clean && !['_posts'].includes(part)) {
      cats.push(clean);
    }
  }
  if (parts[0] === '_posts') {
    cats.unshift('随笔');
  }
  return cats;
}

/**
 * Transform a single markdown file.
 */
function transformFile(sourcePath, collection) {
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const { data: fm, content } = matter(raw);

  // Extract slug from permalink
  const slug = extractSlug(fm.permalink) || fileNameToSlug(sourcePath);

  // Build new frontmatter
  const newFm = {
    title: fm.title || fileNameToSlug(sourcePath),
    slug,
    date: fm.date ? new Date(fm.date).toISOString() : new Date().toISOString(),
    categories: extractCategories(sourcePath, fm.categories),
    tags: (fm.tags || []).filter(t => t !== null && t !== ''),
    author: fm.author || { name: '夏天夏', link: 'https://github.com/qq919006380' },
    draft: false,
  };

  // Preserve optional fields
  if (fm.titleTag) newFm.titleTag = fm.titleTag;
  if (fm.sidebar) newFm.sidebar = fm.sidebar;
  if (fm.article === false) newFm.article = false;

  // Process content: replace VuePress-specific syntax
  let processedContent = content;

  // Replace ::: warning ... ::: with HTML div
  processedContent = processedContent.replace(
    /:::\s*warning\s*([\s\S]*?):::/g,
    '<div class="custom-block warning">\n\n$1\n</div>'
  );

  // Replace ::: tip ... ::: with HTML div
  processedContent = processedContent.replace(
    /:::\s*tip\s*([\s\S]*?):::/g,
    '<div class="custom-block tip">\n\n$1\n</div>'
  );

  // Replace ::: danger ... ::: with HTML div
  processedContent = processedContent.replace(
    /:::\s*danger\s*([\s\S]*?):::/g,
    '<div class="custom-block danger">\n\n$1\n</div>'
  );

  // Remove VuePress Vue components (only in index.md, already handled separately)
  processedContent = processedContent.replace(/<ClientOnly>[\s\S]*?<\/ClientOnly>/g, '');

  // Generate target filename: {slug}.md
  const targetFileName = `${slug}.md`;
  const targetPath = path.join(CONTENT_ROOT, collection, targetFileName);

  // Write the transformed file
  const output = matter.stringify(processedContent, newFm);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, output, 'utf8');

  return { source: sourcePath, target: targetPath, slug };
}

// ============================================
// Main
// ============================================

console.log('Starting content migration...\n');

const stats = { total: 0, migrated: 0, skipped: 0, errors: [] };

for (const [sourceDir, collection] of Object.entries(DIR_MAP)) {
  const sourcePath = path.join(DOCS_ROOT, sourceDir);
  if (!fs.existsSync(sourcePath)) {
    console.log(`  SKIP: ${sourceDir} (not found)`);
    continue;
  }

  const files = findMarkdownFiles(sourcePath);
  console.log(`  ${sourceDir} → ${collection}: ${files.length} files`);

  for (const file of files) {
    stats.total++;
    try {
      const result = transformFile(file, collection);
      stats.migrated++;
      console.log(`    ✓ ${path.basename(file)} → ${result.slug}.md`);
    } catch (err) {
      stats.errors.push({ file, error: err.message });
      console.log(`    ✗ ${path.basename(file)}: ${err.message}`);
    }
  }
}

console.log(`\n--- Migration Summary ---`);
console.log(`Total files: ${stats.total}`);
console.log(`Migrated:    ${stats.migrated}`);
console.log(`Errors:      ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\nErrors:');
  for (const { file, error } of stats.errors) {
    console.log(`  ${file}: ${error}`);
  }
}

// Generate permalink map for URL validation
const allContent = [];
for (const collection of Object.values(DIR_MAP)) {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data } = matter(raw);
    if (data.slug) {
      allContent.push({ slug: data.slug, title: data.title, collection });
    }
  }
}

const mapPath = path.resolve('scripts/permalink-map.json');
fs.writeFileSync(mapPath, JSON.stringify(allContent, null, 2), 'utf8');
console.log(`\nPermalink map written to ${mapPath} (${allContent.length} entries)`);
```

- [ ] **Step 2: Install gray-matter if not already present**

```bash
pnpm add gray-matter
```

- [ ] **Step 3: Run the migration script**

```bash
node scripts/migrate-content.mjs
```

Expected output:
```
Starting content migration...

  01.个人博客 → blog: 18 files
    ✓ 02.小白都能看懂的闭包.md → fa532d.md
    ...
  02.学习笔记 → notes: ~70 files
    ...
  03.个人作品 → works: 1 file
    ...
  _posts → posts: 17 files
    ...

--- Migration Summary ---
Total files: ~106
Migrated:    ~106
Errors:      0

Permalink map written to scripts/permalink-map.json (106 entries)
```

- [ ] **Step 4: Verify migrated content structure**

```bash
ls src/content/blog/ | head -10
ls src/content/notes/ | head -10
ls src/content/posts/ | head -10
ls src/content/works/
```

Expected: Each directory contains `.md` files named by slug.

- [ ] **Step 5: Verify frontmatter format of a migrated file**

```bash
head -20 src/content/blog/fa532d.md
```

Expected:
```yaml
---
title: 小白都能看懂的闭包
slug: fa532d
date: '2022-05-15T13:17:52.000Z'
categories:
  - 个人博客
  - 技术分享
tags:
  - 闭包
  - 垃圾回收
titleTag: 原创
author:
  name: 夏天夏
  link: https://github.com/qq919006380
draft: false
---
```

- [ ] **Step 6: Verify Astro can read the content collections**

```bash
pnpm build
```

Expected: Build succeeds. If there are schema validation errors, fix the migration script and re-run.

- [ ] **Step 7: Commit migrated content**

```bash
git add scripts/migrate-content.mjs scripts/permalink-map.json src/content/
git commit -m "feat: migrate 110 markdown files to Astro Content Collections"
```

---

### Task 2: Validate Content Integrity

**Files:**
- Create: `scripts/validate-content.mjs`

- [ ] **Step 1: Write content validation script**

Write to `scripts/validate-content.mjs`:

```javascript
#!/usr/bin/env node
/**
 * Validates migrated content:
 * 1. Every original permalink has a corresponding slug in content collections
 * 2. No duplicate slugs
 * 3. All required frontmatter fields present
 * 4. Content body is non-empty
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.resolve('src/content');
const COLLECTIONS = ['blog', 'notes', 'posts', 'works'];

const slugs = new Map(); // slug → file path
const issues = [];

for (const collection of COLLECTIONS) {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) continue;

  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    // Check required fields
    if (!data.title) issues.push(`${filePath}: missing title`);
    if (!data.slug) issues.push(`${filePath}: missing slug`);
    if (!data.date) issues.push(`${filePath}: missing date`);

    // Check for duplicate slugs
    if (data.slug) {
      if (slugs.has(data.slug)) {
        issues.push(`DUPLICATE SLUG: "${data.slug}" in ${filePath} and ${slugs.get(data.slug)}`);
      } else {
        slugs.set(data.slug, filePath);
      }
    }

    // Check content is non-empty
    if (content.trim().length === 0) {
      issues.push(`${filePath}: empty content body`);
    }

    // Validate date format
    if (data.date && isNaN(new Date(data.date).getTime())) {
      issues.push(`${filePath}: invalid date "${data.date}"`);
    }
  }
}

console.log(`\n--- Content Validation ---`);
console.log(`Total files: ${slugs.size}`);
console.log(`Issues: ${issues.length}`);

if (issues.length > 0) {
  console.log('\nIssues found:');
  for (const issue of issues) {
    console.log(`  ✗ ${issue}`);
  }
  process.exit(1);
} else {
  console.log('  ✓ All content files validated successfully');
}

// Cross-reference with original docs
const DOCS_ROOT = path.resolve('docs');
const origPermalinks = [];

function scanOriginal(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== '@pages' && entry.name !== '00.目录页') {
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

const missing = origPermalinks.filter(p => !slugs.has(p.slug));
if (missing.length > 0) {
  console.log(`\n  ✗ ${missing.length} original permalinks not found in migrated content:`);
  for (const m of missing) {
    console.log(`    ${m.slug} (${m.file})`);
  }
  process.exit(1);
} else {
  console.log(`  ✓ All ${origPermalinks.length} original permalinks accounted for`);
}
```

- [ ] **Step 2: Run validation**

```bash
node scripts/validate-content.mjs
```

Expected:
```
--- Content Validation ---
Total files: ~106
Issues: 0
  ✓ All content files validated successfully
  ✓ All 106 original permalinks accounted for
```

- [ ] **Step 3: Fix any issues found and re-run until clean**

If duplicates or missing slugs are found, update `scripts/migrate-content.mjs` to handle edge cases, re-run migration, then re-validate.

- [ ] **Step 4: Commit validation script**

```bash
git add scripts/validate-content.mjs
git commit -m "feat: add content validation script for migration integrity checks"
```
