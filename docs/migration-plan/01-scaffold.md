# Sub-Plan 1: Project Scaffold

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the Astro project alongside existing VuePress files, configure Tailwind CSS, TypeScript, and base project structure.

**Architecture:** Astro 5.x with Tailwind CSS 4.x, pnpm as package manager. The new Astro project lives at the repo root, VuePress files are preserved until migration is validated.

**Tech Stack:** Astro 5.x, Tailwind CSS 4.x, TypeScript, pnpm

---

## Pre-requisite

- Node.js >= 18
- pnpm installed globally (`npm i -g pnpm`)

---

### Task 1: Initialize Astro Project

**Files:**
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/pages/index.astro` (placeholder)
- Modify: `package.json`

- [ ] **Step 1: Back up existing package.json**

```bash
cp package.json package.json.vuepress.bak
```

- [ ] **Step 2: Initialize Astro project**

```bash
pnpm create astro@latest . -- --template minimal --no-install --typescript strict
```

If prompted about overwriting files, allow overwriting `package.json` and `tsconfig.json`. The `docs/` directory is untouched.

- [ ] **Step 3: Verify astro.config.mjs was created**

```bash
cat astro.config.mjs
```

Expected: A minimal Astro config file exists.

- [ ] **Step 4: Update astro.config.mjs with project settings**

Write to `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.weibaichao.com',
  integrations: [
    tailwindcss(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});
```

- [ ] **Step 5: Commit scaffold initialization**

```bash
git add astro.config.mjs tsconfig.json src/ package.json
git commit -m "feat: initialize Astro project scaffold"
```

---

### Task 2: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install core dependencies**

```bash
pnpm add astro @astrojs/tailwind @astrojs/sitemap tailwindcss @tailwindcss/typography @tailwindcss/vite
```

- [ ] **Step 2: Install utility dependencies**

```bash
pnpm add medium-zoom dayjs pagefind
```

- [ ] **Step 3: Install dev dependencies**

```bash
pnpm add -D @types/node typescript
```

- [ ] **Step 4: Add scripts to package.json**

Edit `package.json` scripts section:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "dev:old": "vuepress dev docs",
    "build:old": "vuepress build docs"
  }
}
```

Note: Old VuePress scripts are renamed with `:old` suffix for comparison during validation.

- [ ] **Step 5: Run dev to verify it starts**

```bash
pnpm dev
```

Expected: Astro dev server starts on `http://localhost:4321` without errors.

- [ ] **Step 6: Commit dependencies**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: install Astro dependencies (tailwind, sitemap, medium-zoom, pagefind)"
```

---

### Task 3: Configure Tailwind CSS

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global CSS with Tailwind and design tokens**

Write to `src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* ============================================
   Design Tokens - migrated from vdoing palette.styl
   ============================================ */

:root {
  /* Brand colors */
  --accent-color: #11A8CD;
  --active-color: #ff5722;
  --badge-tip-color: #42b983;
  --banner-text-color: #fff;
  --reading-progress-color: #b160ea;

  /* Layout */
  --navbar-height: 3.6rem;
  --sidebar-width: 18rem;
  --content-width: 860px;
  --home-page-width: 1200px;
  --right-menu-width: 230px;
}

/* Light mode (default) */
:root,
[data-theme="light"] {
  --body-bg: #f4f4f4;
  --main-bg: rgba(255,255,255,1);
  --sidebar-bg: rgba(255,255,255,0.8);
  --blur-bg: rgba(255,255,255,0.9);
  --text-color: #004050;
  --text-lighten-color: #0085AD;
  --border-color: rgba(0,0,0,0.15);
  --code-bg: #f6f6f6;
  --code-color: #525252;
}

/* Dark mode */
[data-theme="dark"] {
  --body-bg: rgb(39,39,43);
  --main-bg: rgba(30,30,34,1);
  --sidebar-bg: rgba(30,30,34,0.8);
  --blur-bg: rgba(30,30,34,0.8);
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
  --sidebar-bg: rgba(245,245,213,0.8);
  --blur-bg: rgba(245,245,213,0.9);
  --text-color: #004050;
  --text-lighten-color: #0085AD;
  --border-color: rgba(0,0,0,0.15);
  --code-bg: #282c34;
  --code-color: #fff;
}

/* Base element styles */
body {
  background-color: var(--body-bg);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

a {
  color: var(--accent-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Prose (article content) overrides */
.prose {
  --tw-prose-body: var(--text-color);
  --tw-prose-headings: var(--text-color);
  --tw-prose-links: var(--accent-color);
  --tw-prose-code: var(--code-color);
  max-width: var(--content-width);
}

/* Code blocks */
pre {
  background-color: var(--code-bg) !important;
  position: relative;
}

pre code {
  color: var(--code-color);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 3px;
}

/* Warning container (replaces VuePress ::: warning) */
.custom-block.warning {
  padding: 1rem 1.5rem;
  border-left: 4px solid #e6a23c;
  background-color: #fdf6ec;
  border-radius: 4px;
  margin: 1rem 0;
  color: #e6a23c;
}

[data-theme="dark"] .custom-block.warning {
  background-color: rgba(230, 162, 60, 0.1);
}
```

- [ ] **Step 2: Verify CSS imports work**

```bash
pnpm dev
```

Expected: Dev server starts, no CSS errors in console.

- [ ] **Step 3: Commit Tailwind configuration**

```bash
git add src/styles/global.css
git commit -m "feat: configure Tailwind CSS with design tokens from vdoing theme"
```

---

### Task 4: Set Up Project Directory Structure

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/blog/.gitkeep`
- Create: `src/content/notes/.gitkeep`
- Create: `src/content/posts/.gitkeep`
- Create: `src/content/works/.gitkeep`
- Create: `src/layouts/.gitkeep`
- Create: `src/components/.gitkeep`
- Create: `src/scripts/.gitkeep`
- Create: `src/utils/.gitkeep`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p src/content/blog src/content/notes src/content/posts src/content/works
mkdir -p src/layouts src/components src/scripts src/utils
touch src/content/blog/.gitkeep src/content/notes/.gitkeep src/content/posts/.gitkeep src/content/works/.gitkeep
touch src/layouts/.gitkeep src/components/.gitkeep src/scripts/.gitkeep src/utils/.gitkeep
```

- [ ] **Step 2: Create Content Collections schema**

Write to `src/content.config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.coerce.date(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  titleTag: z.string().optional(),
  author: z.object({
    name: z.string(),
    link: z.string().url().optional(),
  }).default({ name: '夏天夏', link: 'https://github.com/qq919006380' }),
  sidebar: z.union([z.literal('auto'), z.boolean()]).optional(),
  article: z.boolean().default(true),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: articleSchema,
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: articleSchema,
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: articleSchema,
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: articleSchema,
});

export const collections = { blog, notes, posts, works };
```

- [ ] **Step 3: Copy static assets**

```bash
cp -r docs/.vuepress/public/img/ public/img/
```

- [ ] **Step 4: Verify build still works**

```bash
pnpm build
```

Expected: Build succeeds (empty content collections are fine).

- [ ] **Step 5: Commit project structure**

```bash
git add src/content.config.ts src/content/ src/layouts/ src/components/ src/scripts/ src/utils/ public/img/
git commit -m "feat: set up Astro project structure with Content Collections schema"
```

---

### Task 5: Create Utility Modules

**Files:**
- Create: `src/utils/content.ts`
- Create: `src/utils/date.ts`
- Create: `src/utils/site-config.ts`

- [ ] **Step 1: Create site configuration**

Write to `src/utils/site-config.ts`:

```typescript
export const SITE_CONFIG = {
  title: '夏天夏',
  description: 'web前端技术博客,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,React,python,css3,html5,Node,git,github等技术文章。',
  author: {
    name: '夏天夏',
    link: 'https://github.com/qq919006380',
    avatar: '/img/a.jpg',
    slogan: '我也不饶岁月',
  },
  blogCreate: '2019-12-12',
  social: [
    { icon: 'icon-youjian', title: '发邮件', link: 'mailto:919006380@qq.com' },
    { icon: 'icon-github', title: 'GitHub', link: 'https://github.com/qq919006380' },
    { icon: 'icon-juejin', title: '掘金', link: 'https://juejin.cn/user/3825956194361406/posts' },
  ],
  footer: {
    createYear: 2019,
    copyrightInfo: '夏天夏 | <a href="https://github.com/qq919006380/notes/blob/master/LICENSE" target="_blank">MIT License</a>',
  },
  nav: [
    { text: '首页', link: '/' },
    {
      text: '个人博客', link: '/blog/',
      items: [
        {
          text: '技术分享',
          items: [
            { text: '小白都能看懂的闭包', link: '/pages/fa532d/' },
            { text: '关于后台管理应用', link: '/pages/aef645/' },
            { text: '关于技术的取舍', link: '/pages/fb0623/' },
            { text: '前端工程化', link: '/pages/495485/' },
            { text: '切换node版本', link: '/pages/c458cd/' },
            { text: '如何优雅的写事件代理', link: '/pages/d7b35b/' },
            { text: '我所不了解的技术', link: '/pages/e7e70a/' },
            { text: '我喜欢的parcel', link: '/pages/03aae3/' },
            { text: 'angular1使用', link: '/pages/a61c40/' },
            { text: 'npm script打造前端工作流', link: '/pages/367d88/' },
          ],
        },
        {
          text: '发布一个node插件',
          items: [
            { text: '发布一个npm包', link: '/pages/c63419/' },
            { text: '如何打包一个插件工具库', link: '/pages/dd8138/' },
            { text: '打包工具的选择', link: '/pages/9f5618/' },
          ],
        },
        {
          text: '年终总结',
          items: [
            { text: '2019年总结', link: '/pages/5fc367/' },
            { text: '2020年总结', link: '/pages/15eaf7/' },
            { text: '2021年总结', link: '/pages/5627f3/' },
          ],
        },
      ],
    },
    {
      text: '学习笔记', link: '/notes/',
      items: [
        { text: 'JavaScript', link: '/pages/71e5ba/' },
        { text: 'CSS', link: '/pages/5516f8/' },
        { text: '框架', link: '/pages/1b420d/' },
        { text: 'Node', link: '/pages/67ce30/' },
        { text: '服务', link: '/pages/3b063c/' },
        { text: 'web3', link: '/pages/693942/' },
        { text: '其他', link: '/pages/fb011d/' },
      ],
    },
    { text: '我的作品', link: '/works/' },
    {
      text: '索引', link: '/archives/',
      items: [
        { text: '分类', link: '/categories/' },
        { text: '标签', link: '/tags/' },
        { text: '归档', link: '/archives/' },
      ],
    },
  ],
  indexImg: {
    navColor: 2,
    switchNavColor: true,
    bgTimeColor: true,
    bgTimeColorArray: ['transparent', 'rgba(255, 148, 48, .2)', 'rgba(0, 0, 0, .3)', 'rgba(0, 0, 0, .5)'],
    descFade: true,
    desc: ['Hello world!'],
    descFontSize: '1.4rem',
    descFadeInTime: 200,
    descFadeOutTime: 100,
    descNextTime: 800,
    bubble: false,
    bubblePosition: 0,
    bubbleNum: 200,
  },
  bodyBgImg: '/img/bg.jpg',
} as const;
```

- [ ] **Step 2: Create date utilities**

Write to `src/utils/date.ts`:

```typescript
import dayjs from 'dayjs';

export function formatDate(date: Date | string, format = 'YYYY/MM/DD'): string {
  return dayjs(date).format(format);
}

export function formatDateTime(date: Date | string): string {
  return dayjs(date).format('YYYY/MM/DD, HH:mm:ss');
}

export function daysSince(startDate: string): number {
  const start = dayjs(startDate);
  const now = dayjs();
  return now.diff(start, 'day');
}

export function timeDiff(date: Date | string): string {
  const diff = Math.abs(dayjs().diff(dayjs(date), 'second'));
  if (diff === 0) return '刚刚';
  if (diff < 60) return `${diff} 秒`;
  if (diff < 3600) return `${Math.floor(diff / 60)} 分`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 时`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} 天`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} 月`;
  return `${Math.floor(diff / 31536000)} 年`;
}
```

- [ ] **Step 3: Create content utilities**

Write to `src/utils/content.ts`:

```typescript
/**
 * Count words in markdown content.
 * Returns [chineseCount, englishCount]
 */
export function countWords(content: string): [number, number] {
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
  const en = (
    content
      .replace(/[\u4E00-\u9FA5]/g, '')
      .match(
        /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
      ) || []
  ).length;
  return [cn, en];
}

/**
 * Calculate estimated reading time in minutes.
 */
export function readingTime(content: string, cnPerMin = 300, enPerMin = 160): string {
  const [cn, en] = countWords(content);
  const minutes = cn / cnPerMin + en / enPerMin;

  if (minutes > 1440) {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes - days * 1440) / 60);
    return hours > 0 ? `${days}d${hours}h` : `${days}d`;
  }
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes - hours * 60);
    return mins > 0 ? `${hours}h${mins}m` : `${hours}h`;
  }
  return minutes < 1 ? '1m' : `${Math.round(minutes * 10) / 10}m`;
}

/**
 * Format word count for display.
 */
export function formatWordCount(content: string): string {
  const [cn, en] = countWords(content);
  const total = cn + en;
  return total >= 1000 ? `${Math.round(total / 100) / 10}k` : `${total}`;
}

/**
 * Extract excerpt from content using <!-- more --> separator.
 */
export function extractExcerpt(content: string, maxLength = 200): string {
  const moreIndex = content.indexOf('<!-- more -->');
  if (moreIndex > -1) {
    return content
      .slice(0, moreIndex)
      .replace(/^---[\s\S]*?---/, '')  // remove frontmatter
      .replace(/[#*`>\-\[\]()!]/g, '') // remove markdown syntax
      .trim();
  }
  // Fallback: first N chars of content body
  const body = content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/[#*`>\-\[\]()!]/g, '')
    .trim();
  return body.length > maxLength ? body.slice(0, maxLength) + '...' : body;
}

/**
 * Get all unique categories from a collection of articles.
 */
export function getAllCategories(articles: { data: { categories: string[] } }[]): Map<string, number> {
  const categories = new Map<string, number>();
  for (const article of articles) {
    for (const cat of article.data.categories) {
      categories.set(cat, (categories.get(cat) || 0) + 1);
    }
  }
  return categories;
}

/**
 * Get all unique tags from a collection of articles.
 */
export function getAllTags(articles: { data: { tags: string[] } }[]): Map<string, number> {
  const tags = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.data.tags) {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    }
  }
  return tags;
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
pnpm astro check
```

Expected: No type errors.

- [ ] **Step 5: Commit utility modules**

```bash
git add src/utils/
git commit -m "feat: add utility modules (site config, date helpers, content helpers)"
```
