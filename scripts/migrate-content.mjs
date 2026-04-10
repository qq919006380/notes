#!/usr/bin/env node
/**
 * VuePress → Astro content migration script.
 *
 * Reads markdown files from docs/, transforms frontmatter,
 * and writes to src/content/{collection}/.
 *
 * Features:
 * - Slug conflict detection (Amendment 5)
 * - sortOrder extraction from filename prefix (Amendment 7)
 * - Null tag filtering (Amendment content)
 * - VuePress container syntax transformation
 *
 * Usage: node scripts/migrate-content.mjs
 * Idempotent: safe to re-run (overwrites target files).
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_ROOT = path.resolve('docs');
const CONTENT_ROOT = path.resolve('src/content');

const DIR_MAP = {
  '01.个人博客': 'blog',
  '02.学习笔记': 'notes',
  '03.个人作品': 'works',
  '_posts': 'posts',
};

const SKIP = new Set(['.vuepress', '@pages', '00.目录页', 'index.md', 'migration-plan']);

// Slug conflict tracking (Amendment 5)
const usedSlugs = new Map(); // slug → file path

/**
 * Recursively find all .md files in a directory.
 */
function findMarkdownFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
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
  return base.replace(/^\d+\./, '');
}

/**
 * Extract sort order from filename numeric prefix (Amendment 7).
 * "02.小白都能看懂的闭包.md" → 2
 * "心流.md" → 0
 */
function extractSortOrder(filePath) {
  const base = path.basename(filePath, '.md');
  const match = base.match(/^(\d+)\./);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Get unique slug, handling conflicts (Amendment 5).
 */
function getUniqueSlug(slug, filePath) {
  if (!usedSlugs.has(slug)) {
    usedSlugs.set(slug, filePath);
    return slug;
  }
  const suffix = fileNameToSlug(filePath).replace(/\s+/g, '-');
  const newSlug = slug + '-' + suffix;
  console.log(`  ⚠ Slug collision: "${slug}" → "${newSlug}" (${path.basename(filePath)})`);
  usedSlugs.set(newSlug, filePath);
  return newSlug;
}

/**
 * Determine categories from directory structure.
 */
function extractCategories(filePath, existingCategories) {
  if (existingCategories && existingCategories.length > 0) {
    return existingCategories.filter(c => c !== null && c !== '');
  }
  const rel = path.relative(DOCS_ROOT, filePath);
  const parts = rel.split(path.sep);
  const cats = [];
  for (const part of parts.slice(0, -1)) {
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
  const rawSlug = extractSlug(fm.permalink) || fileNameToSlug(sourcePath);
  const slug = getUniqueSlug(rawSlug, sourcePath);

  // Extract sortOrder from filename prefix
  const sortOrder = extractSortOrder(sourcePath);

  // Build new frontmatter
  const newFm = {
    title: fm.title || fileNameToSlug(sourcePath),
    slug,
    date: fm.date ? new Date(fm.date).toISOString() : new Date().toISOString(),
    categories: extractCategories(sourcePath, fm.categories),
    tags: (fm.tags || []).filter(t => t !== null && t !== undefined && t !== ''),
    author: fm.author || { name: '夏天夏', link: 'https://github.com/qq919006380' },
    draft: false,
    sortOrder,
  };

  // Preserve optional fields
  if (fm.titleTag) newFm.titleTag = fm.titleTag;
  if (fm.sidebar) newFm.sidebar = fm.sidebar;
  if (fm.article === false) newFm.article = false;

  // Process content: replace VuePress-specific syntax
  let processedContent = content;

  // Replace ::: containers with HTML divs
  processedContent = processedContent.replace(
    /:::\s*warning\s*([\s\S]*?):::/g,
    '<div class="custom-block warning">\n\n$1\n</div>'
  );
  processedContent = processedContent.replace(
    /:::\s*tip\s*([\s\S]*?):::/g,
    '<div class="custom-block tip">\n\n$1\n</div>'
  );
  processedContent = processedContent.replace(
    /:::\s*danger\s*([\s\S]*?):::/g,
    '<div class="custom-block danger">\n\n$1\n</div>'
  );
  processedContent = processedContent.replace(
    /:::\s*details\s*([\s\S]*?):::/g,
    '<details>\n<summary>Details</summary>\n\n$1\n</details>'
  );

  // Remove VuePress Vue components
  processedContent = processedContent.replace(/<ClientOnly>[\s\S]*?<\/ClientOnly>/g, '');

  // Generate target filename
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
