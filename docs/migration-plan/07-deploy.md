# Sub-Plan 7: Deployment & Validation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure deployment to both GitHub Pages and Cloudflare Pages. Validate all 110+ URLs resolve correctly. Run a comprehensive cross-validation to ensure feature parity with the original VuePress site.

**Architecture:** GitHub Actions for GitHub Pages deployment, Cloudflare Pages connected to the repo for automatic deploys. URL validation script crawls build output to verify all original permalinks.

**Tech Stack:** GitHub Actions, Cloudflare Pages, Node.js validation scripts

---

### Task 1: GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `astro.config.mjs` (if needed)

- [ ] **Step 1: Create GitHub Actions workflow**

Write to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build Astro site
        run: pnpm build

      - name: Add CNAME
        run: echo 'weibaichao.com' > dist/CNAME

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit GitHub Pages workflow**

```bash
mkdir -p .github/workflows
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Pages deployment workflow"
```

---

### Task 2: Cloudflare Pages Configuration

**Files:**
- Create: `wrangler.toml` (optional, for CF CLI)

- [ ] **Step 1: Document Cloudflare Pages setup**

Cloudflare Pages is configured via the CF dashboard, not files. Steps:

1. Go to Cloudflare Dashboard → Pages → Create a project
2. Connect GitHub repository: `qq919006380/notes`
3. Build settings:
   - Framework preset: Astro
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Node.js version: 20
4. Environment variables: None needed
5. Custom domain: Add `weibaichao.com` (or use as preview URL)

- [ ] **Step 2: Create _redirects file for Cloudflare**

Write to `public/_redirects`:

```
# Redirect www to non-www
https://www.weibaichao.com/* https://weibaichao.com/:splat 301
```

Note: This is optional. Cloudflare handles this via Page Rules too.

- [ ] **Step 3: Commit Cloudflare config**

```bash
git add public/_redirects
git commit -m "feat: add Cloudflare Pages redirect configuration"
```

---

### Task 3: URL Validation Script

**Files:**
- Create: `scripts/validate-urls.mjs`

- [ ] **Step 1: Create comprehensive URL validation script**

Write to `scripts/validate-urls.mjs`:

```javascript
#!/usr/bin/env node
/**
 * Validates that all original VuePress URLs exist in the Astro build output.
 * Run after `pnpm build`.
 *
 * Usage: node scripts/validate-urls.mjs
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DIST = path.resolve('dist');
const DOCS = path.resolve('docs');

// ============================================
// 1. Collect all original permalinks from VuePress docs
// ============================================
const originalUrls = new Map(); // url → title

function scanDocs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      scanDocs(full);
    } else if (entry.name.endsWith('.md')) {
      try {
        const raw = fs.readFileSync(full, 'utf8');
        const { data } = matter(raw);
        if (data.permalink) {
          originalUrls.set(data.permalink, data.title || entry.name);
        }
      } catch (e) {
        // skip unparseable files
      }
    }
  }
}

scanDocs(DOCS);

// ============================================
// 2. Check each URL exists in dist/
// ============================================
const results = { pass: [], fail: [] };

for (const [url, title] of originalUrls) {
  // /pages/fa532d/ → dist/pages/fa532d/index.html
  const htmlPath = path.join(DIST, url, 'index.html');
  if (fs.existsSync(htmlPath)) {
    results.pass.push({ url, title });
  } else {
    results.fail.push({ url, title });
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
console.log(`Total original URLs: ${originalUrls.size}`);
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
```

- [ ] **Step 2: Run URL validation after build**

```bash
pnpm build
node scripts/validate-urls.mjs
```

Expected:
```
=== URL Validation Report ===

Total original URLs: ~110
Special pages:       7
PASS:                ~117
FAIL:                0

  ALL URLs VALIDATED SUCCESSFULLY
  Sitemap: FOUND
```

- [ ] **Step 3: Commit validation script**

```bash
git add scripts/validate-urls.mjs
git commit -m "feat: add URL validation script for migration integrity"
```

---

### Task 4: Cross-Validation Checklist

This task is designed for the **second Agent Team** — the cross-validation team.

**Files:**
- Create: `scripts/cross-validation-checklist.md`

- [ ] **Step 1: Create the cross-validation checklist**

Write to `scripts/cross-validation-checklist.md`:

```markdown
# Cross-Validation Checklist

Use this checklist to verify feature parity between the original VuePress site and the new Astro site.

## A. URL Integrity (Critical)

- [ ] Run `node scripts/validate-urls.mjs` — all URLs pass
- [ ] Spot-check 5 random `/pages/{hash}/` URLs in browser
- [ ] Verify `/blog/`, `/notes/`, `/works/` catalogue pages load
- [ ] Verify `/archives/`, `/categories/`, `/tags/` pages load
- [ ] Home page `/` loads with banner

## B. Visual Features

- [ ] **Home Banner**: Full-screen background image displays correctly
- [ ] **Time greeting**: Popup appears ~1s after page load on home page
- [ ] **Typing animation**: "Hello world!" types in/out on banner
- [ ] **Scroll arrow**: Arrow bounces, scrolls page down on click
- [ ] **Navbar transparency**: Navbar is transparent over banner, solid after scroll
- [ ] **Time-based overlay**: Banner has color overlay based on current time
- [ ] **Love-me hearts**: Click anywhere → floating hearts appear
- [ ] **Dark mode**: Toggle cycles light → dark → reading → light
- [ ] **Dark mode persists**: Refresh page, theme is remembered
- [ ] **Reading progress bar**: Purple bar at top tracks scroll position

## C. Content

- [ ] Article count matches original (110 articles)
- [ ] Article titles display correctly (Chinese characters OK)
- [ ] Article metadata shows: date, word count, reading time, author
- [ ] `titleTag: 原创` badge displays on relevant articles
- [ ] Categories display and link correctly
- [ ] Tags display and link correctly
- [ ] `<!-- more -->` excerpts render in post lists
- [ ] `::: warning` container renders correctly (1 instance)
- [ ] Code blocks have syntax highlighting (Shiki)
- [ ] Code blocks have copy button (hover to show)

## D. Navigation

- [ ] Navbar shows all nav items: 首页, 个人博客, 学习笔记, 我的作品, 索引
- [ ] Dropdown menus work on hover
- [ ] GitHub icon links to repo
- [ ] All nav links navigate to correct pages

## E. Sidebar

- [ ] Blogger card shows avatar, name, slogan on home page
- [ ] Contact card shows WeChat info and "请喝咖啡" link
- [ ] Site info shows article count, runtime days, total words
- [ ] TOC (目录) shows on article pages with correct headings

## F. Index Pages

- [ ] Archives: Articles grouped by year, sorted newest first
- [ ] Categories: All categories listed with counts
- [ ] Categories: Clicking a category shows filtered articles
- [ ] Tags: Tag cloud with size variation
- [ ] Tags: Clicking a tag shows filtered articles
- [ ] Blog catalogue: Lists blog articles
- [ ] Notes catalogue: Lists study notes

## G. Technical

- [ ] Build succeeds with zero errors: `pnpm build`
- [ ] No console errors in browser
- [ ] Sitemap generated at /sitemap-index.xml
- [ ] Pagefind search works (type in search box)
- [ ] Image zoom works (click article image)
- [ ] All images load (no 404s)
- [ ] iconfont icons render correctly
- [ ] Responsive: Page looks good at 375px, 768px, 1024px, 1440px
- [ ] HTML is valid (no unclosed tags)

## H. Performance (Bonus)

- [ ] Lighthouse performance score > 90
- [ ] No layout shift (CLS < 0.1)
- [ ] First Contentful Paint < 1.5s
- [ ] Total JS bundle < 50kb (Astro should be near-zero)
```

- [ ] **Step 2: Commit cross-validation checklist**

```bash
git add scripts/cross-validation-checklist.md
git commit -m "docs: add cross-validation checklist for migration verification"
```

---

### Task 5: Clean Up VuePress Files

**Files:**
- Delete: `docs/.vuepress/` (after validation)
- Delete: `vdoing/` (after validation)
- Modify: `package.json` (remove old scripts and devDependencies)
- Delete: `baiduPush.sh`

- [ ] **Step 1: DO NOT execute this task until cross-validation team approves**

This is the final step. Only proceed after:
1. URL validation passes
2. Cross-validation checklist is 100% complete
3. User explicitly confirms "clean up old files"

- [ ] **Step 2: Remove old VuePress devDependencies**

```bash
pnpm remove vuepress vuepress-theme-vdoing vuepress-plugin-baidu-autopush vuepress-plugin-baidu-tongji vuepress-plugin-comment vuepress-plugin-demo-block vuepress-plugin-fulltext-search vuepress-plugin-one-click-copy vuepress-plugin-thirdparty-search vuepress-plugin-zooming vuepress-plugin-reading-progress busuanzi.pure.js inquirer json2yaml yamljs
```

- [ ] **Step 3: Remove old scripts from package.json**

Remove `dev:old`, `build:old`, `deploy`, `editFm`, `baiduPush`, `publish`, `updateTheme` from scripts.

- [ ] **Step 4: Archive (don't delete yet) old VuePress files**

```bash
mkdir -p _archive
mv docs/.vuepress _archive/vuepress-backup
mv vdoing _archive/vdoing-backup
mv baiduPush.sh _archive/
mv deploy.sh _archive/
```

- [ ] **Step 5: Commit cleanup**

```bash
git add -A
git commit -m "chore: archive VuePress files after successful Astro migration"
```

- [ ] **Step 6: Update README.md**

Edit `README.md`:

```markdown
## 个人博客

基于 [Astro](https://astro.build) 构建的个人技术博客。

#### [点击预览](https://www.weibaichao.com)

### 开发

```bash
pnpm install
pnpm dev        # 启动开发服务器
pnpm build      # 构建生产版本
pnpm preview    # 预览构建结果
```

### 技术栈

- **框架**: Astro 5.x (SSG)
- **样式**: Tailwind CSS
- **搜索**: Pagefind
- **部署**: GitHub Pages / Cloudflare Pages
```

- [ ] **Step 7: Commit README**

```bash
git add README.md
git commit -m "docs: update README for Astro migration"
```
