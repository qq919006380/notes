# Sub-Plan 3: Layouts & Components

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the core Astro layouts and reusable components that replicate vdoing's blog structure: navbar with dropdowns, structured sidebar, blogger card, footer, article metadata display, pagination, and right-side TOC.

**Architecture:** Astro `.astro` components for all static/server-rendered parts. No client-side framework (React/Vue) needed — interactive features use vanilla JS `<script>` tags or Astro Islands with `client:load` only where necessary.

**Tech Stack:** Astro components, Tailwind CSS, CSS variables

---

### Task 1: Base Layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create the base HTML layout**

Write to `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
import ReadingProgress from '../components/ReadingProgress.astro';
import { SITE_CONFIG } from '../utils/site-config';

interface Props {
  title?: string;
  description?: string;
  pageClass?: string;
}

const {
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  pageClass = '',
} = Astro.props;

const fullTitle = title === SITE_CONFIG.title ? title : `${title} | ${SITE_CONFIG.title}`;
---

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <meta name="keywords" content="前端博客,个人技术博客,前端,前端开发,前端框架,web前端,前端面试题,技术文档,学习,面试,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown" />
  <meta name="theme-color" content="#11a8cd" />
  <meta name="referrer" content="no-referrer-when-downgrade" />
  <link rel="icon" href="/img/a.jpg" />
  <link rel="stylesheet" href="https://at.alicdn.com/t/font_3077305_pt8umhrn4k9.css" />
  <title>{fullTitle}</title>
</head>
<body class={pageClass}>
  <ReadingProgress />
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
  <script src="../scripts/love-me.js"></script>
  <script src="../scripts/dark-mode.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify layout renders**

Create a temporary test in `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="首页">
  <h1>Hello Astro</h1>
</BaseLayout>
```

```bash
pnpm dev
```

Expected: Page renders with correct `<head>` tags, iconfont CSS loaded.

- [ ] **Step 3: Commit base layout**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with head meta, iconfont, reading progress"
```

---

### Task 2: Navbar Component

**Files:**
- Create: `src/components/Navbar.astro`

- [ ] **Step 1: Create navbar with dropdown support**

Write to `src/components/Navbar.astro`:

```astro
---
import { SITE_CONFIG } from '../utils/site-config';

const currentPath = Astro.url.pathname;
const nav = SITE_CONFIG.nav;
---

<nav class="navbar" id="navbar">
  <div class="navbar-inner">
    <!-- Logo + site name -->
    <a href="/" class="site-name">
      <img src={SITE_CONFIG.author.avatar} alt="logo" class="nav-logo" />
      <span>{SITE_CONFIG.title}</span>
    </a>

    <!-- Search box placeholder (Pagefind will mount here) -->
    <div class="search-box" id="search-box"></div>

    <!-- Nav links -->
    <div class="nav-links" id="nav-links">
      {nav.map(item => (
        <div class={`nav-item ${item.items ? 'has-dropdown' : ''}`}>
          <a
            href={item.link}
            class={`nav-link ${currentPath === item.link ? 'active' : ''}`}
          >
            {item.text}
          </a>
          {item.items && (
            <div class="dropdown-menu">
              {item.items.map(group => (
                <div class="dropdown-group">
                  {group.text && !group.items && (
                    <a href={group.link} class="dropdown-link">{group.text}</a>
                  )}
                  {group.items && (
                    <>
                      <p class="dropdown-group-title">{group.text}</p>
                      {group.items.map(child => (
                        <a href={child.link} class="dropdown-link">{child.text}</a>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <!-- GitHub link -->
      <a href="https://github.com/qq919006380/notes" target="_blank" rel="noopener" class="nav-link github-link">
        <i class="iconfont icon-github"></i>
      </a>
    </div>

    <!-- Mobile menu toggle -->
    <button class="sidebar-button" id="sidebar-toggle" aria-label="Toggle sidebar">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--navbar-height);
    background-color: var(--blur-bg);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    z-index: 100;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .navbar.transparent {
    background-color: transparent;
    border-bottom: none;
    box-shadow: none;
    backdrop-filter: none;
  }

  .navbar-inner {
    max-width: var(--home-page-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1.5rem;
  }

  .site-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--text-color);
    text-decoration: none;
    white-space: nowrap;
  }

  .navbar.transparent .site-name {
    color: #fff;
  }

  .nav-logo {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .search-box {
    flex: 1;
    margin: 0 1.5rem;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .navbar.transparent .nav-links .nav-link {
    color: #fff;
  }

  .nav-item {
    position: relative;
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
    color: var(--text-color);
    text-decoration: none;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .nav-link:hover, .nav-link.active {
    color: var(--accent-color);
  }

  .has-dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--main-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 0.5rem 0;
    min-width: 180px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 200;
  }

  .dropdown-group {
    padding: 0.25rem 0;
  }

  .dropdown-group + .dropdown-group {
    border-top: 1px solid var(--border-color);
  }

  .dropdown-group-title {
    padding: 0.25rem 1rem;
    font-size: 0.8rem;
    color: var(--text-lighten-color);
    font-weight: bold;
    margin: 0;
  }

  .dropdown-link {
    display: block;
    padding: 0.25rem 1rem;
    color: var(--text-color);
    font-size: 0.85rem;
    text-decoration: none;
  }

  .dropdown-link:hover {
    color: var(--accent-color);
    background-color: var(--body-bg);
  }

  .github-link {
    font-size: 1.2rem;
  }

  .sidebar-button {
    display: none;
    flex-direction: column;
    gap: 4px;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }

  .sidebar-button span {
    display: block;
    width: 20px;
    height: 2px;
    background-color: var(--text-color);
    transition: transform 0.3s;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .search-box { display: none; }
    .sidebar-button { display: flex; }
  }
</style>
```

- [ ] **Step 2: Commit navbar**

```bash
git add src/components/Navbar.astro
git commit -m "feat: add Navbar component with dropdown menus and responsive design"
```

---

### Task 3: Footer Component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create footer with social icons and copyright**

Write to `src/components/Footer.astro`:

```astro
---
import { SITE_CONFIG } from '../utils/site-config';

const { footer, social } = SITE_CONFIG;
const currentYear = new Date().getFullYear();
---

<footer class="footer">
  <div class="footer-inner">
    <!-- Social icons -->
    <div class="social-icons">
      {social.map(item => (
        <a href={item.link} target="_blank" rel="noopener" title={item.title}>
          <i class={`iconfont ${item.icon}`}></i>
        </a>
      ))}
    </div>

    <!-- Copyright -->
    <div class="copyright">
      <span>Copyright &copy; {footer.createYear}-{currentYear}</span>
      <span set:html={footer.copyrightInfo} />
    </div>

    <div class="powered-by">
      Powered by <a href="https://astro.build" target="_blank" rel="noopener">Astro</a>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding: 2rem 1.5rem;
    text-align: center;
    border-top: 1px solid var(--border-color);
    background-color: var(--main-bg);
    margin-top: 3rem;
  }

  .footer-inner {
    max-width: var(--home-page-width);
    margin: 0 auto;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .social-icons a {
    color: var(--text-color);
    font-size: 1.2rem;
    opacity: 0.7;
    transition: opacity 0.3s, color 0.3s;
  }

  .social-icons a:hover {
    color: var(--accent-color);
    opacity: 1;
    text-decoration: none;
  }

  .copyright {
    font-size: 0.85rem;
    color: var(--text-color);
    opacity: 0.7;
  }

  .powered-by {
    font-size: 0.75rem;
    color: var(--text-color);
    opacity: 0.5;
    margin-top: 0.5rem;
  }
</style>
```

- [ ] **Step 2: Commit footer**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component with social icons and copyright"
```

---

### Task 4: Sidebar Components

**Files:**
- Create: `src/components/Sidebar.astro`
- Create: `src/components/BloggerBar.astro`
- Create: `src/components/ContactCard.astro`

- [ ] **Step 1: Create BloggerBar (author info card)**

Write to `src/components/BloggerBar.astro`:

```astro
---
import { SITE_CONFIG } from '../utils/site-config';

const { author } = SITE_CONFIG;
---

<div class="blogger-bar card-box">
  <a href={author.link} target="_blank" rel="noopener">
    <img src={author.avatar} alt={author.name} class="blogger-avatar" />
  </a>
  <p class="blogger-name">{author.name}</p>
  <p class="blogger-slogan">{author.slogan}</p>
</div>

<style>
  .card-box {
    background-color: var(--main-bg);
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .blogger-bar {
    text-align: center;
  }

  .blogger-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }

  .blogger-name {
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--text-color);
    margin: 0.25rem 0;
  }

  .blogger-slogan {
    font-size: 0.85rem;
    color: var(--text-color);
    opacity: 0.7;
    margin: 0;
  }
</style>
```

- [ ] **Step 2: Create ContactCard**

Write to `src/components/ContactCard.astro`:

```astro
<div class="contact-card card-box">
  <p class="contact-title">联系我</p>
  <div class="contact-content">
    欢迎一起交流学习，加我微信：zwei919
    <br />
    如果觉得我的文章对你有帮助，可以
    <a href="https://github.com/qq919006380/buy-me-a-coffee" target="_blank">请我喝杯咖啡</a>
  </div>
</div>

<style>
  .card-box {
    background-color: var(--main-bg);
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .contact-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--text-color);
    margin: 0 0 0.5rem 0;
  }

  .contact-content {
    font-size: 0.875rem;
    color: var(--text-color);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 3: Create Sidebar container**

Write to `src/components/Sidebar.astro`:

```astro
---
import BloggerBar from './BloggerBar.astro';
import ContactCard from './ContactCard.astro';

interface Props {
  showBlogger?: boolean;
  showContact?: boolean;
}

const { showBlogger = true, showContact = true } = Astro.props;
---

<aside class="sidebar" id="sidebar">
  {showBlogger && <BloggerBar />}
  <slot />
  {showContact && <ContactCard />}
</aside>

<style>
  .sidebar {
    width: var(--right-menu-width);
    position: sticky;
    top: calc(var(--navbar-height) + 1rem);
    max-height: calc(100vh - var(--navbar-height) - 2rem);
    overflow-y: auto;
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    .sidebar {
      display: none;
    }
  }
</style>
```

- [ ] **Step 4: Commit sidebar components**

```bash
git add src/components/Sidebar.astro src/components/BloggerBar.astro src/components/ContactCard.astro
git commit -m "feat: add Sidebar, BloggerBar, and ContactCard components"
```

---

### Task 5: Post Layout & Article Components

**Files:**
- Create: `src/layouts/PostLayout.astro`
- Create: `src/components/RightMenu.astro`
- Create: `src/components/Pagination.astro`
- Create: `src/components/PostList.astro`

- [ ] **Step 1: Create RightMenu (TOC sidebar)**

Write to `src/components/RightMenu.astro`:

```astro
---
interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const { headings } = Astro.props;
const tocHeadings = headings.filter(h => h.depth >= 2 && h.depth <= 4);
---

{tocHeadings.length > 0 && (
  <div class="right-menu card-box">
    <p class="right-menu-title">目录</p>
    <ul class="toc-list">
      {tocHeadings.map(h => (
        <li class={`toc-item depth-${h.depth}`}>
          <a href={`#${h.slug}`} class="toc-link">{h.text}</a>
        </li>
      ))}
    </ul>
  </div>
)}

<style>
  .card-box {
    background-color: var(--main-bg);
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .right-menu-title {
    font-weight: bold;
    font-size: 0.9rem;
    color: var(--text-color);
    margin: 0 0 0.5rem 0;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc-item {
    line-height: 1.8;
  }

  .toc-item.depth-3 { padding-left: 1rem; }
  .toc-item.depth-4 { padding-left: 2rem; }

  .toc-link {
    font-size: 0.8rem;
    color: var(--text-color);
    opacity: 0.8;
    text-decoration: none;
  }

  .toc-link:hover {
    color: var(--accent-color);
    opacity: 1;
  }
</style>
```

- [ ] **Step 2: Create PostLayout**

Write to `src/layouts/PostLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import Sidebar from '../components/Sidebar.astro';
import RightMenu from '../components/RightMenu.astro';
import { formatDateTime } from '../utils/date';
import { formatWordCount, readingTime } from '../utils/content';

interface Props {
  title: string;
  date: Date;
  categories?: string[];
  tags?: string[];
  titleTag?: string;
  author?: { name: string; link?: string };
  headings: { depth: number; slug: string; text: string }[];
  rawContent: string;
}

const { title, date, categories = [], tags = [], titleTag, author, headings, rawContent } = Astro.props;
const wordCount = formatWordCount(rawContent);
const readTime = readingTime(rawContent);
---

<BaseLayout title={title}>
  <div class="post-page">
    <!-- Left structured sidebar (for mobile/tablet slide-in) -->
    <div class="content-wrapper">
      <article class="post-content">
        <!-- Article header -->
        <header class="post-header">
          <h1 class="post-title">
            {titleTag && <span class="title-tag">{titleTag}</span>}
            {title}
          </h1>
          <div class="post-meta">
            <span class="meta-item">
              <i class="iconfont icon-riqi"></i>
              {formatDateTime(date)}
            </span>
            <span class="meta-item">
              <i class="iconfont icon-shu"></i>
              {wordCount} 字
            </span>
            <span class="meta-item">
              <i class="iconfont icon-shijian"></i>
              {readTime}
            </span>
            {author && (
              <span class="meta-item">
                <i class="iconfont icon-zuozhe"></i>
                <a href={author.link} target="_blank" rel="noopener">{author.name}</a>
              </span>
            )}
          </div>
          {categories.length > 0 && (
            <div class="post-categories">
              {categories.map(cat => (
                <a href={`/categories/${cat}/`} class="category-link">{cat}</a>
              ))}
            </div>
          )}
        </header>

        <!-- Article body -->
        <div class="prose">
          <slot />
        </div>

        <!-- Tags -->
        {tags.length > 0 && (
          <div class="post-tags">
            {tags.map(tag => (
              <a href={`/tags/${tag}/`} class="tag-link">{tag}</a>
            ))}
          </div>
        )}

        <!-- Edit link -->
        <div class="post-footer">
          <span class="last-updated">上次更新: {formatDateTime(date)}</span>
        </div>
      </article>

      <!-- Right sidebar with TOC -->
      <Sidebar showBlogger={false} showContact={false}>
        <RightMenu headings={headings} />
      </Sidebar>
    </div>
  </div>
</BaseLayout>

<style>
  .post-page {
    padding-top: calc(var(--navbar-height) + 1rem);
    max-width: var(--home-page-width);
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .content-wrapper {
    display: flex;
    gap: 2rem;
  }

  .post-content {
    flex: 1;
    min-width: 0;
    background-color: var(--main-bg);
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }

  .post-title {
    font-size: 1.8rem;
    margin: 0 0 1rem 0;
    color: var(--text-color);
  }

  .title-tag {
    display: inline-block;
    padding: 2px 8px;
    font-size: 0.75rem;
    background-color: var(--accent-color);
    color: #fff;
    border-radius: 4px;
    margin-right: 0.5rem;
    vertical-align: middle;
    font-weight: normal;
  }

  .post-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--text-color);
    opacity: 0.7;
    margin-bottom: 1rem;
  }

  .meta-item i {
    margin-right: 0.25rem;
  }

  .post-categories {
    margin-bottom: 1.5rem;
  }

  .category-link {
    display: inline-block;
    padding: 2px 10px;
    font-size: 0.8rem;
    background-color: var(--body-bg);
    color: var(--accent-color);
    border-radius: 4px;
    margin-right: 0.5rem;
    text-decoration: none;
  }

  .category-link:hover {
    background-color: var(--accent-color);
    color: #fff;
  }

  .post-tags {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .tag-link {
    display: inline-block;
    padding: 2px 10px;
    font-size: 0.8rem;
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
    border-radius: 4px;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    text-decoration: none;
  }

  .tag-link:hover {
    background-color: var(--accent-color);
    color: #fff;
  }

  .post-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
    font-size: 0.8rem;
    color: var(--text-color);
    opacity: 0.5;
  }

  @media (max-width: 1024px) {
    .content-wrapper {
      flex-direction: column;
    }
  }
</style>

<script>
  // Image zoom initialization
  import mediumZoom from 'medium-zoom';
  mediumZoom('.prose img:not(.no-zoom)', {
    background: 'rgba(0,0,0,0.6)',
  });
</script>
```

- [ ] **Step 3: Create Pagination component**

Write to `src/components/Pagination.astro`:

```astro
---
interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

const { currentPage, totalPages, baseUrl } = Astro.props;

function pageUrl(page: number) {
  return page === 1 ? baseUrl : `${baseUrl}${page}/`;
}

const pages: number[] = [];
for (let i = 1; i <= totalPages; i++) {
  pages.push(i);
}
---

{totalPages > 1 && (
  <nav class="pagination">
    {currentPage > 1 && (
      <a href={pageUrl(currentPage - 1)} class="page-link prev">上一页</a>
    )}
    {pages.map(p => (
      <a
        href={pageUrl(p)}
        class={`page-link ${p === currentPage ? 'active' : ''}`}
      >
        {p}
      </a>
    ))}
    {currentPage < totalPages && (
      <a href={pageUrl(currentPage + 1)} class="page-link next">下一页</a>
    )}
  </nav>
)}

<style>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 2rem 0;
  }

  .page-link {
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
    font-size: 0.85rem;
    text-decoration: none;
    transition: all 0.2s;
  }

  .page-link:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  .page-link.active {
    background-color: var(--accent-color);
    border-color: var(--accent-color);
    color: #fff;
  }
</style>
```

- [ ] **Step 4: Create PostList component**

Write to `src/components/PostList.astro`:

```astro
---
import { formatDate } from '../utils/date';
import { extractExcerpt } from '../utils/content';

interface Article {
  data: {
    title: string;
    slug: string;
    date: Date;
    categories: string[];
    tags: string[];
    titleTag?: string;
    author: { name: string; link?: string };
  };
  body?: string;
}

interface Props {
  articles: Article[];
}

const { articles } = Astro.props;
---

<div class="post-list">
  {articles.map(article => (
    <div class="post-item">
      <h3 class="post-item-title">
        {article.data.titleTag && (
          <span class="title-tag">{article.data.titleTag}</span>
        )}
        <a href={`/pages/${article.data.slug}/`}>{article.data.title}</a>
      </h3>
      <div class="post-item-meta">
        <span>{formatDate(article.data.date)}</span>
        {article.data.categories.length > 0 && (
          <span class="post-item-categories">
            {article.data.categories.map(cat => (
              <a href={`/categories/${cat}/`}>{cat}</a>
            ))}
          </span>
        )}
      </div>
      {article.body && (
        <p class="post-item-excerpt">{extractExcerpt(article.body)}</p>
      )}
    </div>
  ))}
</div>

<style>
  .post-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .post-item {
    background-color: var(--main-bg);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    transition: box-shadow 0.2s;
  }

  .post-item:hover {
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }

  .post-item-title {
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
  }

  .post-item-title a {
    color: var(--text-color);
    text-decoration: none;
  }

  .post-item-title a:hover {
    color: var(--accent-color);
  }

  .title-tag {
    display: inline-block;
    padding: 1px 6px;
    font-size: 0.7rem;
    background-color: var(--accent-color);
    color: #fff;
    border-radius: 3px;
    margin-right: 0.5rem;
    vertical-align: middle;
    font-weight: normal;
  }

  .post-item-meta {
    font-size: 0.8rem;
    color: var(--text-color);
    opacity: 0.6;
    display: flex;
    gap: 0.75rem;
  }

  .post-item-categories a {
    color: var(--accent-color);
    font-size: 0.8rem;
    text-decoration: none;
  }

  .post-item-excerpt {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.8;
    margin: 0.5rem 0 0;
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 5: Create ReadingProgress component**

Write to `src/components/ReadingProgress.astro`:

```astro
<div class="reading-progress" id="reading-progress"></div>

<style>
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--reading-progress-color, #b160ea);
    z-index: 9999;
    transition: width 0.1s linear;
  }
</style>

<script>
  const bar = document.getElementById('reading-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    });
  }
</script>
```

- [ ] **Step 6: Commit all layout and article components**

```bash
git add src/layouts/PostLayout.astro src/components/RightMenu.astro src/components/Pagination.astro src/components/PostList.astro src/components/ReadingProgress.astro
git commit -m "feat: add PostLayout, PostList, RightMenu, Pagination, ReadingProgress components"
```

---

### Task 6: Catalogue Layout

**Files:**
- Create: `src/layouts/CatalogueLayout.astro`

- [ ] **Step 1: Create catalogue layout for directory pages**

Write to `src/layouts/CatalogueLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import Sidebar from '../components/Sidebar.astro';

interface Props {
  title: string;
  description?: string;
  imgUrl?: string;
}

const { title, description, imgUrl } = Astro.props;
---

<BaseLayout title={title}>
  <div class="catalogue-page">
    <div class="content-wrapper">
      <div class="catalogue-content">
        <!-- Header -->
        <header class="catalogue-header">
          {imgUrl && <img src={imgUrl} alt={title} class="catalogue-img" />}
          <div class="catalogue-info">
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </div>
        </header>

        <!-- Content (article list) -->
        <slot />
      </div>

      <Sidebar />
    </div>
  </div>
</BaseLayout>

<style>
  .catalogue-page {
    padding-top: calc(var(--navbar-height) + 1rem);
    max-width: var(--home-page-width);
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .content-wrapper {
    display: flex;
    gap: 2rem;
  }

  .catalogue-content {
    flex: 1;
    min-width: 0;
  }

  .catalogue-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background-color: var(--main-bg);
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    margin-bottom: 1.5rem;
  }

  .catalogue-img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
  }

  .catalogue-info h1 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    color: var(--text-color);
  }

  .catalogue-info p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.7;
  }

  @media (max-width: 1024px) {
    .content-wrapper {
      flex-direction: column;
    }
  }
</style>
```

- [ ] **Step 2: Commit catalogue layout**

```bash
git add src/layouts/CatalogueLayout.astro
git commit -m "feat: add CatalogueLayout for directory/listing pages"
```
