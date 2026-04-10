# VuePress to Astro Migration - Master Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the personal blog at weibaichao.com from VuePress 1.x + vdoing theme to Astro, preserving all existing URLs, visual features, and content with zero SEO impact.

**Architecture:** Astro SSG with Content Collections for markdown management, Tailwind CSS for styling, file-based routing with custom `getStaticPaths()` to preserve `/pages/{hash}/` permalinks. Interactive features (time greeting, love-me click effect, canvas bubbles) implemented as client-side vanilla JS scripts. Dark mode and reading mode via CSS variables + Tailwind.

**Tech Stack:**
- Framework: Astro 5.x (SSG mode)
- Styling: Tailwind CSS 4.x
- Content: Astro Content Collections (Markdown)
- Search: Pagefind
- Code highlighting: Shiki (Astro built-in)
- Deployment: GitHub Pages + Cloudflare Pages (dual)
- Package manager: pnpm

---

## Plan Index

This migration is broken into 7 independent sub-plans, each producing working, testable output:

| # | Sub-Plan | File | Skill | Description |
|---|----------|------|-------|-------------|
| 1 | Project Scaffold | [01-scaffold.md](./01-scaffold.md) | `next-best-practices` | Minimal template + expressive-code + tailwind + vdoing tokens |
| 2 | Content Migration | [02-content.md](./02-content.md) | — | Migrate 110 md files (slug conflict detection + sortOrder) |
| 3 | Layout & Components | [03-layouts.md](./03-layouts.md) | `frontend-design` | 20 components: Navbar, Sidebar, PostList, Banner, BloggerBar, etc. |
| 4 | Pages & Routing | [04-pages-routing.md](./04-pages-routing.md) | context7 | Permalink routing, pagination, archives/categories/tags |
| 5 | Interactive Features | [05-interactive.md](./05-interactive.md) | — | Time greeting, love-me, typing animation, reading progress |
| 6 | Search & Utilities | [06-search-utils.md](./06-search-utils.md) | — | Pagefind + medium-zoom (code copy via expressive-code) |
| 7 | Deploy & Validation | [07-deploy.md](./07-deploy.md) | `web-design-guidelines` | GH Pages + CF Pages + URL validation + cross-validation |
| 8 | **Amendments** | [08-amendments.md](./08-amendments.md) | — | **19 corrections. Overrides conflicting content in 01-07.** |
| 9 | **Documentation** | (in 08-amendments.md #19) | `design-consultation` | Generate DESIGN.md + CLAUDE.md + theme documentation |
| - | **Structured Sidebar** | (in 08-amendments.md #2) | `frontend-design` | Full left tree sidebar: sidebar.ts + 3 components |

## Execution Strategy

1. **Phase 1 (Team 1):** Execute sub-plans 1-6 sequentially (each depends on the previous)
2. **Phase 2 (Team 2):** Cross-validation team verifies every feature against the original site

## Key Constraints

- **SEO first:** All 110 `/pages/{hash}/` URLs must resolve to the exact same path. Zero broken links.
- **Based on astro-paper:** Use astro-paper as template base, but restyle UI to match vdoing theme. See `08-amendments.md` for details.
- **No百度统计/busuanzi/评论系统:** These are removed in this migration.
- **Demo block:** Not used (only one commented-out instance in index.md). Removed.
- **No dark/reading mode:** Only light mode. Remove all theme switching functionality.
- **No canvas bubbles:** Config already has `bubble: false`. Removed.
- **Preserve:** Time greeting popup, love-me click hearts, typing animation, reading progress bar, **full left tree structured sidebar**, category/tag/archive pages, recent articles card, back-to-top button, article prev/next navigation.
- **IMPORTANT:** All amendments in `08-amendments.md` override conflicting content in Sub-Plans 01-07.

## Current vs Target File Structure

```
# CURRENT (VuePress)
docs/
├── .vuepress/
│   ├── config.ts              # VuePress config
│   ├── components/            # IndexBigImg.vue, WebInfo.vue
│   ├── plugins/love-me/       # Click heart effect
│   ├── styles/                # palette.styl, index.styl
│   ├── webSiteInfo/           # readFile.js, utils.js
│   ├── config/                # baiduCode.ts, htmlModules.ts
│   └── public/img/            # Static images
├── 00.目录页/                  # Catalogue pages
├── 01.个人博客/                # Blog posts
├── 02.学习笔记/                # Study notes
├── 03.个人作品/                # Portfolio
├── _posts/                    # Fragmented posts (笔记 + 随笔)
├── @pages/                    # Archive/category/tag pages
└── index.md                   # Home page

# TARGET (Astro)
src/
├── content/
│   ├── config.ts              # Content Collections schema
│   ├── blog/                  # 01.个人博客 → flat structure
│   ├── notes/                 # 02.学习笔记 → flat structure
│   ├── posts/                 # _posts → flat structure
│   └── works/                 # 03.个人作品
├── layouts/
│   ├── BaseLayout.astro       # HTML shell, head, scripts
│   ├── PostLayout.astro       # Blog/note article layout
│   └── CatalogueLayout.astro  # Directory listing layout
├── components/
│   ├── Navbar.astro           # Navigation bar
│   ├── Sidebar.astro          # Structured sidebar
│   ├── Footer.astro           # Footer with copyright
│   ├── PostList.astro         # Article list with pagination
│   ├── TagsBar.astro          # Tags display
│   ├── CategoriesBar.astro    # Categories display
│   ├── BloggerBar.astro       # Blogger info card
│   ├── SiteInfo.astro         # Site statistics (word count, runtime)
│   ├── ReadingProgress.astro  # Reading progress bar
│   ├── RightMenu.astro        # Right-side TOC
│   ├── Pagination.astro       # Pagination component
│   ├── HomeBanner.astro       # Full-screen banner with effects
│   └── ContactCard.astro      # "联系我" sidebar card
├── scripts/
│   ├── love-me.js             # Click heart effect (vanilla JS)
│   ├── canvas-bubble.js       # Canvas bubble animation
│   ├── time-greeting.js       # Time-based greeting popup
│   ├── typing-animation.js   # Text typing effect
│   ├── dark-mode.js           # Theme mode switcher
│   └── medium-zoom.js         # Image zoom initialization
├── styles/
│   └── global.css             # Global styles + CSS variables for themes
├── pages/
│   ├── index.astro            # Home page
│   ├── archives.astro         # Archives page
│   ├── categories/
│   │   ├── index.astro        # All categories
│   │   └── [category].astro   # Single category
│   ├── tags/
│   │   ├── index.astro        # All tags
│   │   └── [tag].astro        # Single tag
│   ├── blog.astro             # Blog catalogue
│   ├── notes.astro            # Notes catalogue
│   ├── works.astro            # Works page
│   └── pages/
│       └── [...slug].astro    # Catch-all for /pages/{hash}/ permalinks
├── utils/
│   ├── content.ts             # Content helpers (word count, reading time)
│   └── date.ts                # Date formatting utilities
public/
├── img/                       # Static images (copied from .vuepress/public/img)
└── fonts/                     # If needed
astro.config.mjs               # Astro configuration
tailwind.config.mjs            # Tailwind configuration
package.json
tsconfig.json
```

## Frontmatter Mapping

```yaml
# CURRENT (VuePress + vdoing)
---
title: 小白都能看懂的闭包
permalink: /pages/fa532d/
titleTag: 原创
categories:
  - 个人博客
  - 技术分享
tags:
  - 闭包
  - 垃圾回收
author:
  name: 夏天夏
  link: https://github.com/qq919006380
date: 2022-05-15 13:17:52
---

# TARGET (Astro Content Collections)
---
title: 小白都能看懂的闭包
slug: fa532d                    # extracted from permalink
titleTag: 原创
categories:
  - 个人博客
  - 技术分享
tags:
  - 闭包
  - 垃圾回收
author:
  name: 夏天夏
  link: https://github.com/qq919006380
date: 2022-05-15T13:17:52.000Z  # ISO 8601 format
sidebar: auto                    # preserved if present
draft: false                     # default
---
```

## URL Routing Strategy

| Current URL | Astro Route | Implementation |
|-------------|-------------|----------------|
| `/` | `src/pages/index.astro` | Static page |
| `/pages/{hash}/` | `src/pages/pages/[...slug].astro` | `getStaticPaths()` reads `slug` from frontmatter |
| `/blog/` | `src/pages/blog.astro` | Catalogue page |
| `/notes/` | `src/pages/notes.astro` | Catalogue page |
| `/works/` | `src/pages/works.astro` | Static page |
| `/archives/` | `src/pages/archives.astro` | Dynamic from content |
| `/categories/` | `src/pages/categories/index.astro` | Dynamic from content |
| `/tags/` | `src/pages/tags/index.astro` | Dynamic from content |
| `/categories/{name}/` | `src/pages/categories/[category].astro` | `getStaticPaths()` |
| `/tags/{name}/` | `src/pages/tags/[tag].astro` | `getStaticPaths()` |

## Design Tokens (from vdoing palette.styl)

```css
:root {
  /* Colors */
  --accent-color: #11A8CD;
  --active-color: #ff5722;
  --badge-tip-color: #42b983;
  --banner-text-color: #fff;
  --reading-progress-color: #b160ea;

  /* Layout */
  --navbar-height: 3.6rem;
  --sidebar-width: 18rem;
  --content-width: 860px;
  --home-page-width: 1100px;
  --right-menu-width: 230px;
}

/* Light mode */
[data-theme="light"] {
  --body-bg: #f4f4f4;
  --main-bg: rgba(255,255,255,1);
  --sidebar-bg: rgba(255,255,255,.8);
  --blur-bg: rgba(255,255,255,.9);
  --text-color: #004050;
  --text-lighten-color: #0085AD;
  --border-color: rgba(0,0,0,.15);
  --code-bg: #f6f6f6;
  --code-color: #525252;
}

/* Dark mode */
[data-theme="dark"] {
  --body-bg: rgb(39,39,43);
  --main-bg: rgba(30,30,34,1);
  --sidebar-bg: rgba(30,30,34,.8);
  --blur-bg: rgba(30,30,34,.8);
  --text-color: rgb(140,140,150);
  --text-lighten-color: #0085AD;
  --border-color: #2C2C3A;
  --code-bg: #252526;
  --code-color: #fff;
}

/* Reading mode */
[data-theme="reading"] {
  --body-bg: rgb(240,240,208);
  --main-bg: rgba(245,245,213,1);
  --sidebar-bg: rgba(245,245,213,.8);
  --blur-bg: rgba(245,245,213,.9);
  --text-color: #004050;
  --text-lighten-color: #0085AD;
  --border-color: rgba(0,0,0,.15);
  --code-bg: #282c34;
  --code-color: #fff;
}
```

## Feature Preservation Checklist

| Feature | Source | Target | Status |
|---------|--------|--------|--------|
| Full-screen home banner with bg image | IndexBigImg.vue | HomeBanner.astro + scripts | Planned |
| Time-based background color overlay | IndexBigImg.vue:bgTimeColor | time-greeting.js | Planned |
| Time greeting popup (早上好/晚上好) | IndexBigImg.vue:addTip | time-greeting.js | Planned |
| Canvas bubble animation | IndexBigImg.vue:canvasBubble | canvas-bubble.js | Planned |
| Text typing animation | IndexBigImg.vue:textFadeInAndOut | typing-animation.js | Planned |
| Scroll arrow on banner | IndexBigImg.vue:scrollFn | HomeBanner.astro | Planned |
| Navbar transparency on banner | IndexBigImg.vue:watchScroll | HomeBanner.astro script | Planned |
| Click heart effect | love-me plugin | love-me.js | Planned |
| Dark mode / Reading mode | vdoing theme | dark-mode.js + CSS vars | Planned |
| Reading progress bar | reading-progress plugin | ReadingProgress.astro | Planned |
| Structured sidebar | vdoing sidebar:structuring | Sidebar.astro + content utils | Planned |
| Category/Tag/Archive pages | @pages + vdoing | Dynamic Astro pages | Planned |
| Catalogue (directory) pages | 00.目录页 + pageComponent | CatalogueLayout.astro | Planned |
| Blog info card (avatar, slogan) | vdoing BloggerBar | BloggerBar.astro | Planned |
| Site info (word count, runtime) | WebInfo.vue | SiteInfo.astro | Planned |
| Post metadata (date, words, reading time) | vdoing ArticleInfo | PostLayout.astro | Planned |
| titleTag badge (原创) | vdoing titleBadge | PostLayout.astro | Planned |
| Pagination | vdoing Pagination | Pagination.astro | Planned |
| Right-side TOC | vdoing RightMenu | RightMenu.astro | Planned |
| Image zoom | zooming plugin | medium-zoom lib | Planned |
| Code copy button | one-click-copy | Shiki + custom script | Planned |
| Full-text search | thirdparty-search | Pagefind | Planned |
| Contact card in sidebar | htmlModules homeSidebarB | ContactCard.astro | Planned |
| Social icons (email, GitHub, juejin) | vdoing social config | Footer.astro | Planned |
| Footer (copyright, year) | vdoing footer config | Footer.astro | Planned |
| `<!-- more -->` excerpt separator | VuePress built-in | Custom remark plugin | Planned |
| `::: warning` container | VuePress markdown-it | remark-directive plugin | Planned |
| iconfont icons | Alicdn CSS | Same CSS link in head | Planned |
