# Plan Amendments (修正记录)

> 本文件记录对原计划（Sub-Plan 01-07）的所有修正。执行时以本文件为准，覆盖原计划中的冲突内容。

---

## Amendment 1: 使用 Minimal 模板 + 借鉴 astro-paper 模式（影响 01/03/06）

**原计划：** 从零初始化 Astro minimal 项目，手写所有组件  
**二次修正（基于 solution 调研）：** 用 `--template minimal` 初始化，从 astro-paper **仅借鉴 3 样**：Content Collections schema 模式、SEO meta 组件写法、RSS 配置。不 fork astro-paper。

**调研结论：** astro-paper 是极简型（13 个组件），vdoing 是功能密集型（20+ 组件），UI 改动量 > 80%。Fork 后大部分要删掉重写，反而更慢。Reference 模式（借鉴精华、自主搭建）更高效。

### 01-scaffold 修正

**Task 1 Step 2** 保持原计划的 minimal 模板：

```bash
pnpm create astro@latest . -- --template minimal --no-install --typescript strict
```

**Task 2** 新增依赖：

```bash
pnpm add astro-expressive-code @astrojs/tailwind @astrojs/sitemap @astrojs/rss medium-zoom dayjs pagefind
```

注意：`astro-expressive-code` 替代 Shiki 作为代码块处理器，内置 copy 按钮，**删除手写的 code-copy.js**。

**astro.config.mjs 修正（基于官方文档）：**

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://www.weibaichao.com',
  integrations: [
    expressiveCode({
      themes: ['github-light'],
      styleOverrides: {
        borderRadius: '0.5rem',
      },
    }),
    tailwindcss(),
    sitemap(),
  ],
});
```

> **Skill**: 执行此任务时加载 `next-best-practices` skill 指导 Astro 项目结构

### 03-layouts 修正

全部自建组件（不依赖 astro-paper）：

**自建组件清单：**
- `src/layouts/BaseLayout.astro` — HTML 骨架 + head meta + scripts
- `src/layouts/PostLayout.astro` — 文章详情页布局
- `src/layouts/CatalogueLayout.astro` — 目录页布局
- `src/components/Navbar.astro` — 导航栏（多级下拉菜单、logo、iconfont）
- `src/components/Footer.astro` — 页脚（社交图标、版权）
- `src/components/PostList.astro` — 文章列表（卡片式、摘要、titleTag 徽章）
- `src/components/Pagination.astro` — 分页
- `src/components/StructuredSidebar.astro` — 左侧树形导航（见 Amendment 2）
- `src/components/SidebarGroup.astro` — 可折叠分组
- `src/components/SidebarLink.astro` — 单个链接
- `src/components/HomeBanner.astro` — 首页全屏 Banner
- `src/components/BloggerBar.astro` — 博主信息卡片
- `src/components/SiteInfo.astro` — 站点统计
- `src/components/ContactCard.astro` — 联系我卡片
- `src/components/RecentArticles.astro` — 最近更新（见 Amendment 8）
- `src/components/BackToTop.astro` — 返回顶部（见 Amendment 9）
- `src/components/ArticleNav.astro` — 上下篇导航（见 Amendment 10）
- `src/components/ReadingProgress.astro` — 阅读进度条
- `src/components/RightMenu.astro` — 右侧 TOC

**从 astro-paper 借鉴（复制+改造）：**
- SEO `<head>` meta 标签写法（OG tags、Twitter cards）
- RSS feed 配置模式
- Content Collections Zod schema 设计模式

> **Skill**: 执行此任务时加载 `frontend-design` skill 生成高质量 UI 代码
> **Skill**: 执行此任务时加载 `vercel-composition-patterns` skill 指导组件架构

### 06-search 修正

**不使用 astro-paper 的 FuseJS 搜索**。直接用 Pagefind（构建时索引，零运行时 JS，支持中文 CJK 分词）。

配置方式：
```json
// package.json scripts
"build": "astro build && npx pagefind --site dist"
```

> **Skill**: 无需特定 skill，Pagefind 配置简单

---

## Amendment 2: 补充左侧结构化侧边栏（新增 Sub-Task）

**原计划：** Sidebar 只有右侧小部件栏（BloggerBar + ContactCard）  
**修正为：** 新增完整的左侧树形导航侧边栏

### 设计方案

vdoing 的 `sidebar: 'structuring'` 基于文件目录结构自动生成树形导航。在 Astro 中需要：

1. **构建时**从 Content Collections 读取所有文章的 categories 和 sortOrder
2. 按 categories 层级构建树形数据结构
3. 渲染为可折叠的侧边栏组件

### 新增文件

- `src/components/StructuredSidebar.astro` — 侧边栏容器
- `src/components/SidebarGroup.astro` — 可折叠分组
- `src/components/SidebarLink.astro` — 单个链接项
- `src/utils/sidebar.ts` — 从 Content Collections 构建树形数据

### sidebar.ts 数据结构

```typescript
interface SidebarItem {
  text: string;
  link?: string;       // 文章链接 /pages/{slug}/
  sortOrder: number;   // 从文件名数字前缀提取
  children?: SidebarItem[];
  collapsed?: boolean;
}

interface SidebarGroup {
  text: string;        // 分类名，如 "JavaScript"
  sortOrder: number;
  items: SidebarItem[];
}

// 从 Content Collections 构建
export async function buildSidebarTree(collection: string): Promise<SidebarGroup[]>
```

### 显示逻辑

- 首页：不显示左侧侧边栏
- 文章页：显示当前文章所属 collection 的侧边栏树，高亮当前文章
- 目录页：显示对应 collection 的完整树
- 移动端（<1024px）：侧边栏收起，点击汉堡按钮滑出

---

## Amendment 3: 删除 Canvas 气泡代码

**影响文件：**
- `00-overview.md`: Feature Checklist 中 "Canvas bubble animation" 状态改为 **Removed**
- `05-interactive.md`: 删除 Task 4 中 `src/scripts/canvas-bubble.js` 的创建步骤
- `05-interactive.md`: HomeBanner.astro 中删除 `<canvas>` 元素和 bubble 相关条件判断
- `01-scaffold.md`: site-config.ts 中删除 `indexImg.bubble` / `bubblePosition` / `bubbleNum` 配置

---

## Amendment 4: GitHub Actions 分支修正

**影响文件：** `07-deploy.md` Task 1

```yaml
# 原计划
on:
  push:
    branches: [main]

# 修正为
on:
  push:
    branches: [master]
```

---

## Amendment 5: Slug 冲突处理

**影响文件：** `02-content.md` Task 1

迁移脚本 `scripts/migrate-content.mjs` 的 `transformFile()` 函数需增加重复检测：

```javascript
const usedSlugs = new Set();

function getUniqueSlug(slug, filePath) {
  if (!usedSlugs.has(slug)) {
    usedSlugs.add(slug);
    return slug;
  }
  // 冲突：拼接文件名作为后缀
  const suffix = fileNameToSlug(filePath).replace(/\s+/g, '-');
  const newSlug = slug + '-' + suffix;
  console.log(`  ⚠ Slug collision: "${slug}" → "${newSlug}" (${filePath})`);
  usedSlugs.add(newSlug);
  return newSlug;
}
```

**已知冲突：**
- `/pages/796ac5/` — `心流.md` 和 `了不起的盖茨比有感.md` 共享此 permalink
- 其中一篇将被重命名为 `796ac5-了不起的盖茨比有感`（或反过来，按文件遍历顺序）
- 验证脚本需更新以接受重命名后的 slug

---

## Amendment 6: 删除暗色/阅读模式

**原计划：** 实现 light/dark/reading 三档主题切换  
**修正为：** 仅保留 light 模式，删除所有主题切换功能

**影响文件：**
- `01-scaffold.md`: `global.css` 中删除 `[data-theme="dark"]` 和 `[data-theme="reading"]` 的 CSS 变量块
- `05-interactive.md`: 删除 Task 2 整体（dark-mode.js + ThemeToggle.astro）
- `03-layouts.md`: BaseLayout 中删除 `<ThemeToggle />` 组件和 `dark-mode.js` 引用
- `00-overview.md`: Feature Checklist 中 "Dark mode / Reading mode" 状态改为 **Removed**
- astro-paper 自带的暗色模式切换按钮和逻辑需要**删除**

---

## Amendment 7: 排序信息保留

**影响文件：** `01-scaffold.md` Task 4 + `02-content.md` Task 1

Content Collections schema 新增 `sortOrder` 字段：

```typescript
const articleSchema = z.object({
  // ... existing fields ...
  sortOrder: z.number().default(0),  // 从文件名数字前缀提取
});
```

迁移脚本提取排序号：

```javascript
function extractSortOrder(filePath) {
  const base = path.basename(filePath, '.md');
  const match = base.match(/^(\d+)\./);
  return match ? parseInt(match[1], 10) : 0;
}

// 在 transformFile() 中
newFm.sortOrder = extractSortOrder(sourcePath);
```

此字段用于 StructuredSidebar 组件的排序。

---

## Amendment 8: 新增"最近更新"卡片

**影响文件：** `03-layouts.md` 新增 Task

新增 `src/components/RecentArticles.astro`：

```astro
---
import { getCollection } from 'astro:content';
import { formatDate } from '../utils/date';

const blog = await getCollection('blog');
const notes = await getCollection('notes');
const posts = await getCollection('posts');

const recent = [...blog, ...notes, ...posts]
  .filter(a => a.data.article !== false && !a.data.draft)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  .slice(0, 5);
---

<div class="recent-articles card-box">
  <div class="recent-title">
    <i class="iconfont icon-zuixin" style="font-size: 0.875rem"></i>
    <span>最近更新</span>
  </div>
  <ul class="recent-list">
    {recent.map(a => (
      <li>
        <a href={`/pages/${a.data.slug}/`}>{a.data.title}</a>
        <span class="recent-date">{formatDate(a.data.date, 'MM-DD')}</span>
      </li>
    ))}
  </ul>
</div>
```

挂载位置：首页右侧侧边栏，在 SiteInfo 下方。

---

## Amendment 9: 新增返回顶部按钮

**影响文件：** `03-layouts.md` 新增 Task

新增 `src/components/BackToTop.astro`：

```astro
<button class="back-to-top" id="back-to-top" aria-label="返回顶部" style="display:none">
  <i class="iconfont icon-huidaodingbu"></i>
</button>

<style>
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background-color: var(--main-bg);
    color: var(--text-color);
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 100;
    transition: opacity 0.3s;
  }
  .back-to-top:hover { border-color: var(--accent-color); color: var(--accent-color); }
</style>

<script>
  const btn = document.getElementById('back-to-top');
  if (btn) {
    window.addEventListener('scroll', () => {
      btn.style.display = document.documentElement.scrollTop > 300 ? 'flex' : 'none';
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
</script>
```

挂载位置：BaseLayout 中 `</body>` 前。

---

## Amendment 10: 新增文章上下篇导航

**影响文件：** `03-layouts.md` 新增 Task

新增 `src/components/ArticleNav.astro`：

```astro
---
interface Props {
  prevArticle?: { title: string; slug: string } | null;
  nextArticle?: { title: string; slug: string } | null;
}

const { prevArticle, nextArticle } = Astro.props;
---

{(prevArticle || nextArticle) && (
  <nav class="article-nav">
    <div class="nav-prev">
      {prevArticle && (
        <a href={`/pages/${prevArticle.slug}/`}>
          <span class="nav-label">上一篇</span>
          <span class="nav-title">{prevArticle.title}</span>
        </a>
      )}
    </div>
    <div class="nav-next">
      {nextArticle && (
        <a href={`/pages/${nextArticle.slug}/`}>
          <span class="nav-label">下一篇</span>
          <span class="nav-title">{nextArticle.title}</span>
        </a>
      )}
    </div>
  </nav>
)}

<style>
  .article-nav {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
    gap: 1rem;
  }
  .nav-prev, .nav-next { flex: 1; }
  .nav-next { text-align: right; }
  .nav-label { display: block; font-size: 0.75rem; color: var(--text-color); opacity: 0.5; }
  .nav-title { color: var(--accent-color); font-size: 0.9rem; }
  .article-nav a { text-decoration: none; }
  .article-nav a:hover .nav-title { text-decoration: underline; }
</style>
```

使用位置：`PostLayout` / `PostDetails` 文章内容底部，tags 下方。

上下篇计算逻辑：在 `/pages/[...slug].astro` 中按日期排序所有文章，找到当前文章的前后相邻文章，作为 props 传入 ArticleNav。

---

## Amendment 11: 首页分页路由

**影响文件：** `04-pages-routing.md` Task 2

原计划首页只渲染第 1 页。修正为：

新增 `src/pages/page/[page].astro`：

```astro
---
import { getCollection } from 'astro:content';

const PAGE_SIZE = 10;

export async function getStaticPaths() {
  const blog = await getCollection('blog');
  const notes = await getCollection('notes');
  const posts = await getCollection('posts');

  const all = [...blog, ...notes, ...posts]
    .filter(a => a.data.article !== false && !a.data.draft)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const totalPages = Math.ceil(all.length / PAGE_SIZE);
  return Array.from({ length: totalPages }, (_, i) => ({
    params: { page: String(i + 1) },
    props: {
      articles: all.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
      currentPage: i + 1,
      totalPages,
    },
  }));
}

const { articles, currentPage, totalPages } = Astro.props;
---
<!-- 复用首页相同的布局，传入分页数据 -->
```

首页 `index.astro` 中 Pagination 的 `baseUrl` 改为 `/page/`。

---

## Amendment 12: 移动端导航

**影响文件：** `03-layouts.md` Task 2

Navbar 的汉堡按钮需要配套的滑出面板。在 Navbar.astro 中补充：

```astro
<!-- 移动端滑出导航面板 -->
<div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
<div class="mobile-nav-panel" id="mobile-nav-panel">
  <div class="mobile-nav-header">
    <button id="mobile-nav-close" aria-label="关闭导航">&times;</button>
  </div>
  <div class="mobile-nav-links">
    <!-- 渲染与桌面端相同的导航项 -->
  </div>
</div>

<script>
  const toggle = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const panel = document.getElementById('mobile-nav-panel');
  const close = document.getElementById('mobile-nav-close');

  function openNav() {
    overlay.classList.add('active');
    panel.classList.add('active');
  }
  function closeNav() {
    overlay.classList.remove('active');
    panel.classList.remove('active');
  }

  toggle?.addEventListener('click', openNav);
  overlay?.addEventListener('click', closeNav);
  close?.addEventListener('click', closeNav);
</script>
```

---

## Amendment 13: 目录页分组渲染

**影响文件：** `04-pages-routing.md` Task 6

目录页（blog.astro, notes.astro）从扁平列表改为按子分类分组：

```astro
---
// 按 categories 第二级分组
const groups = new Map();
for (const article of articles) {
  const subCat = article.data.categories[1] || '其他';
  if (!groups.has(subCat)) groups.set(subCat, []);
  groups.get(subCat).push(article);
}
// 按 sortOrder 排序组内文章
for (const [, items] of groups) {
  items.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}
---
```

---

## Amendment 14: 不再需要（astro-paper 改为 Reference 模式）

~~基于 astro-paper 后，以下其自带功能需要删除或替换~~

此条已被 Amendment 1 的二次修正覆盖。使用 minimal 模板初始化，不存在需要删除的 astro-paper 功能。

---

## Amendment 15: 用 astro-expressive-code 替换手写 code-copy.js

**影响文件：** `06-search-utils.md` Task 3, `03-layouts.md` BaseLayout

**调研结论：** `astro-expressive-code`（924 stars，活跃维护）内置 copy-to-clipboard 按钮，还提供终端 frame、代码标记、可折叠区块等功能。比手写 60 行 JS 好得多。

**修正：**
1. 删除 `src/scripts/code-copy.js` 及其在 BaseLayout 中的引用
2. 删除 06-search-utils.md 的 Task 3
3. 在 `astro.config.mjs` 中集成 expressive-code（见 Amendment 1 的 config 示例）
4. Shiki 配置也不需要了，expressive-code 底层已包含 Shiki

```bash
pnpm add astro-expressive-code
```

```javascript
// astro.config.mjs
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ['github-light'],  // 只要 light 模式
    }),
    // ... other integrations
  ],
});
```

> **Skill**: 无需特定 skill，配置级别操作

---

## Amendment 16: 图片优化 — 使用 astro:assets

**影响文件：** `03-layouts.md` PostLayout

**调研结论：** Astro 内置 `<Image />` 组件（`astro:assets`），自动优化为 webp 格式，生成正确的 width/height 属性避免 CLS，支持 lazy loading。

**修正：**
- 文章中的 `<img>` 标签在构建时自动被 Astro markdown 处理
- 对于组件中手动使用的图片（如 BloggerBar 的头像、HomeBanner 的背景图），使用 `<Image />` 组件：

```astro
---
import { Image } from 'astro:assets';
import avatar from '../assets/a.jpg';
---
<Image src={avatar} alt="夏天夏" width={80} height={80} />
```

- 将 `public/img/a.jpg` 和 `public/img/bg.jpg` 移到 `src/assets/` 以启用优化
- 其他静态资源（不需优化的图标等）保留在 `public/img/`

> **Skill**: 执行时加载 `vercel-react-best-practices` skill 指导图片优化

---

## Amendment 17: Astro 5.x API 修正

**影响文件：** `04-pages-routing.md` 所有 getStaticPaths

**调研结论（基于官方文档）：**
- Astro 5 Content Layer 中 `post.slug` 已废弃，改用 `post.id`
- `entry.render()` 改为 `render(entry)`（从 `astro:content` 导入 `render`）
- glob loader 的 `generateId` 可自定义 ID 生成逻辑

**修正 getStaticPaths 模式：**

```astro
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const articles = await getCollection('blog');
  return articles.map(article => ({
    params: { slug: article.data.slug },  // 用 frontmatter 中的 slug 字段
    props: { article },
  }));
}

const { article } = Astro.props;
const { Content, headings } = await render(article);  // render() 而非 article.render()
---
```

**Content Collections 配置文件位置修正：**
- Astro 5 中配置文件为 `src/content.config.ts`（不是 `src/content/config.ts`）

> **Skill**: 执行时自动调用 context7 查询 Astro 最新 API

---

## Amendment 18: 每个 Task 的 Skill 映射

| Sub-Plan | Task | 推荐 Skill | 说明 |
|---|---|---|---|
| 01-scaffold | 项目初始化 | `next-best-practices` | Astro 项目结构最佳实践 |
| 01-scaffold | Tailwind 配置 | context7 查 Tailwind 文档 | 确保 v4 语法正确 |
| 02-content | 迁移脚本 | 无（纯 Node.js 脚本） | — |
| 02-content | 验证脚本 | 无 | — |
| 03-layouts | 所有组件 | `frontend-design` | 生成高质量非 AI 味的 UI 代码 |
| 03-layouts | 组件架构 | `vercel-composition-patterns` | 解决 prop 泛滥、组件复用 |
| 03-layouts | PostLayout | `vercel-react-best-practices` | 性能优化模式 |
| 04-pages | 路由设计 | context7 查 Astro 路由文档 | getStaticPaths 最新 API |
| 04-pages | 分类/标签页 | `frontend-design` | UI 实现 |
| 05-interactive | 时间问候/爱心 | 无（纯 vanilla JS） | — |
| 05-interactive | HomeBanner | `frontend-design` | 复杂 UI 组件 |
| 06-search | Pagefind | context7 查 Pagefind 文档 | 中文分词配置 |
| 06-search | Image zoom | 无（medium-zoom 一行初始化） | — |
| 07-deploy | GitHub Actions | 无 | 标准 workflow |
| 07-deploy | CF Pages | 无 | 仪表板配置 |
| 新增 | DESIGN.md | `design-consultation` | 设计系统文档 |
| 新增 | CLAUDE.md | 无（手写项目指南） | — |
| 新增 | 交叉验证 | `web-design-guidelines` | UI 审查合规 |

---

## Amendment 19: 新增文档生成任务

### 19a: DESIGN.md — 设计系统文档

> **Skill**: `design-consultation`

迁移完成后，用 `design-consultation` skill 生成 `DESIGN.md`，记录：

- 设计 tokens（颜色、间距、字体、圆角）
- 组件 API（每个 .astro 组件的 Props 接口）
- 主题模式（仅 light）
- 响应式断点（375px / 768px / 1024px / 1440px）
- 图标系统（iconfont via Alicdn）
- 命名约定

### 19b: CLAUDE.md — 项目级 AI 协作指南

迁移完成后，在项目根目录创建 `CLAUDE.md`，记录：

```markdown
# 项目指南

## 技术栈
- Astro 5.x (SSG)
- Tailwind CSS 4.x
- astro-expressive-code (代码块)
- Pagefind (搜索)
- medium-zoom (图片放大)

## 开发命令
- `pnpm dev` — 启动开发服务器
- `pnpm build` — 构建（含 Pagefind 索引）
- `pnpm preview` — 预览构建结果

## 内容管理
- 文章放在 `src/content/{blog,notes,posts,works}/`
- Frontmatter 必须包含: title, slug, date, categories, tags
- slug 对应 URL `/pages/{slug}/`，不可修改已发布文章的 slug

## 组件约定
- 布局: `src/layouts/`
- UI 组件: `src/components/`
- 客户端脚本: `src/scripts/`（vanilla JS，无框架）
- 工具函数: `src/utils/`
- 设计 tokens 在 `src/styles/global.css` 的 CSS 变量中定义

## 部署
- GitHub Pages: push 到 master 自动部署
- Cloudflare Pages: 连接仓库自动部署
- 产物目录: `dist/`

## 注意事项
- 只有 light 模式，不要添加暗色模式
- URL 结构 `/pages/{hash}/` 是 SEO 关键，不可更改
- 代码块由 expressive-code 处理，不要手写复制按钮
- 图片优化用 `astro:assets` 的 `<Image />` 组件
```

### 19c: theme.css 文档化

设计 tokens 已在 `src/styles/global.css` 中定义（Amendment 1 的 01-scaffold Task 3）。不需要单独的 `theme.css` 文件。如有需要，可从 `global.css` 提取 CSS 变量部分到 `src/styles/theme.css` 并在 global.css 中 `@import`。

---

## 修正后的最终执行顺序

1. **01-scaffold**（修正版）：Minimal 模板初始化 → 安装 expressive-code/tailwind/sitemap/pagefind → 注入 vdoing design tokens
   - *Skill*: `next-best-practices`
2. **02-content**（修正版）：迁移脚本（slug 冲突检测 + sortOrder） → 验证脚本
3. **03-layouts**（修正版）：自建全部 20 个组件，UI 还原 vdoing 风格
   - *Skill*: `frontend-design`, `vercel-composition-patterns`
4. **结构化侧边栏**：sidebar.ts + 3 个侧边栏组件
   - *Skill*: `frontend-design`
5. **04-pages**（修正版）：permalink 路由 + 首页分页 + 目录页分组 + 归档/分类/标签
   - *Skill*: context7 查 Astro 路由 API
6. **05-interactive**（修正版）：时间问候 + 爱心特效 + 打字机 + 阅读进度条（**无 canvas 气泡/无暗色模式**）
7. **06-search**（修正版）：Pagefind + medium-zoom（**无手写 code-copy.js**）
8. **07-deploy**（修正版）：GitHub Pages（master 分支）+ CF Pages + URL 验证 + 交叉验证
   - *Skill*: `web-design-guidelines`（验证阶段）
9. **文档生成**：DESIGN.md + CLAUDE.md
   - *Skill*: `design-consultation`
