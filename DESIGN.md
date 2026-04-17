# Design System — 夏天夏博客

## Product Context

- **What this is:** 个人技术博客，记录前端开发学习笔记和技术分享
- **Who it's for:** 前端开发者、技术学习者
- **Space:** 中文技术博客
- **Project type:** 内容型博客网站（SSG）

## Aesthetic Direction

- **Direction:** 功能密集型技术博客，温暖而专业
- **Decoration level:** 有意识的（intentional）— 首页全屏 Banner 提供视觉冲击，内容区保持干净
- **Mood:** 友好、专业、有温度。不是冷冰冰的文档站，也不是花哨的营销站
- **Theme mode:** 仅 light 模式

## Design Tokens 来源

**单一数据源：`src/styles/theme.css`**

`DESIGN.md` 是文档，`theme.css` 是代码。两者必须同步。修改设计时先改 `theme.css`，再更新此文档。

---

## Color

| Token | 值 | 用途 | 备注 |
|-------|------|------|------|
| `--accent-color` | `#0969A5` | 品牌主色、链接、高亮、按钮 | WCAG AA 5.2:1 对比度 |
| `--active-color` | `#ff5722` | 激活/选中状态 | |
| `--badge-tip-color` | `#42b983` | 提示徽章（如 `::: tip` 容器） | |
| `--banner-text-color` | `#fff` | Banner 区域文字 | |
| `--reading-progress-color` | `#b160ea` | 阅读进度条（紫色） | |
| `--text-color` | `#004050` | 正文主文字色 | |
| `--text-lighten-color` | `#00708C` | 辅助文字（副标题、描述、元信息） | |
| `--code-color` | `#525252` | 代码文字色 | |
| `--body-bg` | `#f4f4f4` | 页面底层背景 | |
| `--main-bg` | `rgba(255,255,255,1)` | 卡片/内容区背景 | |
| `--sidebar-bg` | `rgba(255,255,255,0.8)` | 侧边栏背景 | |
| `--blur-bg` | `rgba(255,255,255,0.9)` | 导航栏毛玻璃背景 | backdrop-filter 配合 |
| `--code-bg` | `#f6f6f6` | 代码块背景 | |
| `--border-color` | `rgba(0,0,0,0.15)` | 通用边框色 | |

## Typography

| Token | 值 | 用途 |
|-------|------|------|
| `--font-family-base` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif` | 正文/UI 字体 |
| `--font-family-mono` | `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace` | 代码字体 |
| `--font-size-base` | `1rem` (16px) | 正文 |
| `--font-size-sm` | `0.875rem` (14px) | 辅助文字、元信息 |
| `--font-size-xs` | `0.8rem` (12.8px) | 小标签、时间戳 |
| `--font-size-lg` | `1.1rem` (17.6px) | 稍大的正文 |
| `--line-height-base` | `1.6` | 正文行高 |
| `--line-height-tight` | `1.3` | 标题行高 |

文章正文使用 `@tailwindcss/typography` 的 `.prose` class，通过 CSS 变量覆盖默认颜色：
- `--tw-prose-body` → `var(--text-color)`
- `--tw-prose-headings` → `var(--text-color)`
- `--tw-prose-links` → `var(--accent-color)`
- `--tw-prose-code` → `var(--code-color)`

## Layout

| Token | 值 | 用途 |
|-------|------|------|
| `--navbar-height` | `3.6rem` (57.6px) | 导航栏高度 |
| `--sidebar-width` | `18rem` (288px) | 左侧结构化侧边栏 |
| `--content-width` | `860px` | 文章正文最大宽度 |
| `--home-page-width` | `1200px` | 首页/列表页最大宽度 |
| `--right-menu-width` | `230px` | 右侧 TOC/信息栏 |

### 三栏布局（桌面端 >= 1440px）

```
┌─────────────────────────────────────────────────────────┐
│                    Navbar (fixed, 3.6rem)                │
├──────────┬──────────────────────────────┬───────────────┤
│ Sidebar  │        Content (860px)       │  Right (230px)│
│ (288px)  │                              │  TOC / Info   │
│ 树形导航  │   文章标题                    │  BloggerBar   │
│          │   元信息                      │  SiteInfo     │
│          │   正文（prose）               │  ContactCard  │
│          │   标签                        │  RecentArticles│
│          │   上下篇导航                  │               │
└──────────┴──────────────────────────────┴───────────────┘
```

## Spacing

| Token | 值 | 像素 | 用途 |
|-------|------|------|------|
| `--spacing-xs` | `0.25rem` | 4px | 极小间距（图标与文字） |
| `--spacing-sm` | `0.5rem` | 8px | 小间距（卡片内元素间） |
| `--spacing-md` | `1rem` | 16px | 标准间距（段落间、组件内边距） |
| `--spacing-lg` | `1.5rem` | 24px | 大间距（区块间） |
| `--spacing-xl` | `2rem` | 32px | 超大间距（页面区域间） |

## Border Radius

| Token | 值 | 用途 |
|-------|------|------|
| `--radius-sm` | `4px` | 标签、徽章、分类/标签 pill |
| `--radius-md` | `8px` | 卡片、代码块、下拉菜单 |
| `--radius-lg` | `1rem` | 搜索框 |
| `--radius-full` | `50%` | 头像（圆形） |

## Shadows

| Token | 值 | 用途 |
|-------|------|------|
| `--shadow-card` | `0 1px 6px rgba(0,0,0,0.05)` | 卡片默认阴影 |
| `--shadow-dropdown` | `0 4px 12px rgba(0,0,0,0.1)` | 下拉菜单、搜索结果 |
| `--shadow-btn` | `0 2px 8px rgba(0,0,0,0.1)` | 浮动按钮（返回顶部） |

## Transitions

| Token | 值 | 用途 |
|-------|------|------|
| `--transition-fast` | `0.2s ease` | hover 效果、按钮状态 |
| `--transition-base` | `0.3s ease` | 导航栏透明切换、面板滑入 |

## Z-Index Scale

| Token | 值 | 用途 |
|-------|------|------|
| `--z-navbar` | `100` | 导航栏 |
| `--z-back-to-top` | `100` | 返回顶部按钮 |
| `--z-mobile-overlay` | `150` | 移动端导航遮罩 |
| `--z-dropdown` | `200` | 下拉菜单 |
| `--z-mobile-panel` | `200` | 移动端导航面板 |
| `--z-reading-progress` | `9999` | 阅读进度条 |
| `--z-tip-popup` | `99999` | 时间问候弹窗 |
| `--z-love-heart` | `99999` | 点击爱心特效 |

## Responsive Breakpoints

| 断点 | 宽度 | 变化 |
|------|------|------|
| mobile | `375px` | 最小支持宽度。汉堡菜单，搜索隐藏，侧边栏隐藏，单列 |
| tablet | `768px` | 汉堡菜单，侧边栏隐藏，单列 |
| laptop | `1024px` | 完整导航栏，左侧侧边栏显示，双栏 |
| desktop | `1440px` | 完整三栏（左侧栏 + 内容 + 右侧栏） |

## Component Inventory

### Layouts (3)

| Component | Props | Description |
|-----------|-------|-------------|
| `BaseLayout` | `title?`, `description?`, `pageClass?` | HTML shell, `<head>` meta, iconfont, global scripts |
| `PostLayout` | `title`, `date`, `categories?`, `tags?`, `titleTag?`, `author?`, `headings`, `rawContent`, `prevArticle?`, `nextArticle?`, `collection?`, `currentSlug?` | Article detail page |
| `CatalogueLayout` | `title`, `description?`, `imgUrl?` | Directory listing page |

### UI Components (18)

| Component | Props | Description |
|-----------|-------|-------------|
| `Navbar` | — | Fixed navbar: multi-level dropdown, search (Pagefind), mobile slide-out panel |
| `Footer` | — | Social icons (email, GitHub, juejin) + copyright |
| `HomeBanner` | — | Full-viewport hero: bg image, typing animation, scroll arrow, time greeting |
| `PostList` | `articles` | Article cards: title + titleTag badge + date + categories + excerpt |
| `Pagination` | `currentPage`, `totalPages`, `baseUrl` | Page navigation |
| `Sidebar` | `showBlogger?`, `showContact?` | Right widget container |
| `StructuredSidebar` | `collection`, `currentSlug?` | Left tree navigation (auto-generated from content) |
| `SidebarGroup` | `text`, `items`, `collapsed` | Collapsible group (native `<details>`/`<summary>`) |
| `SidebarLink` | `text`, `link`, `active?` | Single nav link with active highlight |
| `BloggerBar` | — | Author card: circular avatar + name "夏天夏" + slogan "我也不饶岁月" |
| `SiteInfo` | — | Stats: article count + runtime days + total word count (build-time) |
| `ContactCard` | — | WeChat: zwei919 + "请我喝杯咖啡" link |
| `RecentArticles` | — | Latest 5 articles list |
| `RightMenu` | `headings` | TOC from h2-h4, depth-based indentation |
| `ArticleNav` | `prevArticle?`, `nextArticle?` | Prev/next article links |
| `ReadingProgress` | — | Top purple progress bar tracking scroll position |
| `BackToTop` | — | Fixed button, appears after 300px scroll |
| `WorkCard` | `work`, `index?` | Product card for Works page: left accent stripe + initial mark + tagline + star count + demo/repo links |

## Icon System

Iconfont via Alicdn CDN. Usage: `<i class="iconfont icon-xxx"></i>`

| Icon | Class | Usage |
|------|-------|-------|
| Date | `icon-riqi` | Article metadata |
| Word count | `icon-shu` | Article metadata |
| Time | `icon-shijian` | Reading time |
| Author | `icon-zuozhe` | Article metadata |
| Recent | `icon-zuixin` | Recent articles card |
| Award | `icon-award` | Site info title |
| GitHub | `icon-github` | Footer + Navbar |
| Email | `icon-youjian` | Footer |
| Juejin | `icon-juejin` | Footer |
| Back to top | `icon-huidaodingbu` | BackToTop button |
| Info | `icon-info` | Time greeting popup |

## Card Style Convention

All card components share `.card-box` class:

```css
.card-box {
  background-color: var(--main-bg);
  border-radius: var(--radius-md);     /* 8px */
  box-shadow: var(--shadow-card);      /* 0 1px 6px rgba(0,0,0,0.05) */
  padding: 1.25rem;
}
```

Used by: BloggerBar, SiteInfo, ContactCard, RecentArticles, RightMenu, StructuredSidebar

## Works Page

**页面：** `/works/` — 个人产品集合页，展示业余时间写的 6 个可访问产品。

**数据来源：** `src/utils/works-data.ts`（hardcoded 配置，不走 Content Collection）。产品列表更新频率低、不需要全文检索，写死在 TS 里比每个产品一份 markdown 更直接。保留 `src/content/works/` 的 legacy markdown（保 SEO 旧链接 `/pages/个人作品/`），但不再在 `/works/` 页面展示。

**设计取舍：**

| 决策 | SAFE / RISK | 说明 |
|------|-------------|------|
| 沿用 `--main-bg` / `--radius-md` / `--shadow-card` | SAFE | 卡片与全站其他 `.card-box` 视觉同源 |
| 响应式网格 `auto-fill minmax(280px, 1fr)` | SAFE | 移动单列、平板双列、桌面 3 列自然流动 |
| 不放产品截图 | RISK | 截图维护成本高且易过期；改用首字母 mark 作为视觉锚点 |
| 每张卡片独立 accent（左 4px 色条 + 首字母 tint + 主按钮描边） | RISK | 打破千篇一律的全站品牌蓝；每个产品有独立个性 |
| 卡片进入 stagger fade-up 动画（每张 +60ms） | INTENTIONAL | 首屏视觉节奏感；`prefers-reduced-motion` 下关闭 |

**Accent 色盘（每张卡片独立）：**

| 产品 | Accent | 选色理由 |
|------|--------|----------|
| pencil-vue | `#f59e0b`（amber） | 手绘风 → 暖黄 |
| MindMap | `#10b981`（green） | 思维生长 → 绿色 |
| Frontend Resource Hub | `#0969A5`（brand） | 开发者工具 → 沿用主色 |
| AI Character Generator | `#a855f7`（purple） | AI 创作 → 紫色 |
| AutoCommit | `#ef4444`（red） | Git 分支 → 红色 |
| ABI Vision | `#6366f1`（indigo） | 区块链 → 靛蓝 |

**视觉语言：**

- **卡片主体**：`.card-box` 基础（`--main-bg` + `--radius-md` + `--shadow-card`），padding 加大到 `1.5rem 1.5rem 1.25rem 1.75rem`（左边多出 0.5rem 避让 accent stripe）。
- **左侧 accent stripe**：`::before` 绝对定位 `width: 4px`，`background: var(--card-accent)`。
- **Initial mark**：2.5rem 方块，`color-mix(in srgb, var(--card-accent) 14%, transparent)` 底色 + accent 前景，`font-family: var(--font-family-mono)` 让数字/字母节奏更紧。
- **Tagline**：`var(--text-lighten-color)` + `0.9rem`，占 `flex: 1` 把 footer 推到底部。
- **Footer**：1px `var(--border-color)` 分割，左 star 数，右 demo/源码按钮。
- **Primary 按钮（"打开 ↗"）**：用 `color-mix` 动态生成 accent 的 8% 底 + 40% 描边，hover 提升到 18% / 60%。不同产品自动呈现不同色调。

**Hover 反馈：**

- 卡片：`translateY(-2px)` + 阴影升级到 `--shadow-dropdown`。
- 主按钮：底色从 8% → 18%，描边从 40% → 60%，colorshift 而不是 scale。

**可访问性：**

- star 计数用 `aria-label="{n} stars on GitHub"` 让屏幕阅读器念出完整上下文。
- 外链全部 `target="_blank" rel="noopener"`。
- `prefers-reduced-motion: reduce` 下动画和 hover 位移全部禁用。

## Interactive Effects

| Effect | File | Scope |
|--------|------|-------|
| Time greeting | `src/scripts/time-greeting.js` | Homepage only (`/`) |
| Typing animation | `src/scripts/typing-animation.js` | HomeBanner description |
| Reading progress | `src/scripts/reading-progress.js` | All pages with `#reading-progress` |

## Code Blocks

Powered by `astro-expressive-code` (replaces hand-written code-copy.js):
- Theme: `github-light`
- Built-in copy button
- Syntax highlighting via Shiki
- `border-radius: var(--radius-md)` (8px)

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-10 | Initial migration from VuePress to Astro | VuePress 1.x + vdoing 已停止维护 |
| 2026-04-10 | accent-color `#11A8CD` → `#0969A5` | 原色对比度仅 2.8:1，新色 5.2:1 达到 WCAG AA |
| 2026-04-10 | 仅 light 模式 | 原站 dark/reading 模式 CSS 全部注释状态，未启用 |
| 2026-04-10 | 删除 Canvas 气泡 | 原站 config 中 `bubble: false`，未使用 |
| 2026-04-10 | astro-expressive-code 替代手写 code-copy.js | 内置 copy 按钮 + 语法高亮，功能更完整 |
| 2026-04-10 | Pagefind 替代 VuePress 搜索 | 构建时索引，零运行时 JS，支持 CJK 中文分词 |
| 2026-04-11 | 抽离 theme.css 为设计 tokens 单一数据源 | global.css 过于混杂，分离关注点 |
| 2026-04-11 | .prose 链接添加 underline | WCAG: 链接不能仅靠颜色区分 |
| 2026-04-11 | CSS opacity → color-mix 实色方案 | 避免 opacity 继承导致子元素对比度不达标 |
| 2026-04-17 | Works 页面从 PostList 迁移到独立 WorkCard 卡片网格 | 作品不是文章，复用文章列表 UI 无法表达产品个性；hardcoded `works-data.ts` 替代 Content Collection，因为列表静态、无需全文检索 |
| 2026-04-17 | 每个作品独立 accent 色（而非全站统一品牌色） | 打破 AI 通用样式的千卡一面；首字母 mark + 色条让视觉节奏区分产品 |
