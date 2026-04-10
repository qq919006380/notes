# Sub-Plan 4: Pages & Routing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all page routes that match the original VuePress URL structure. The most critical route is `/pages/{hash}/` which serves all 110 articles via `getStaticPaths()`.

**Architecture:** Astro file-based routing with dynamic `[...slug].astro` catch-all for permalink compatibility. Category/tag/archive pages generated dynamically from Content Collections data.

**Tech Stack:** Astro dynamic routing, Content Collections API

---

### Task 1: Permalink Route (Critical - SEO)

**Files:**
- Create: `src/pages/pages/[...slug].astro`

- [ ] **Step 1: Create the permalink catch-all route**

This is the **most important file in the entire migration** — it preserves every existing URL.

Write to `src/pages/pages/[...slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';

export async function getStaticPaths() {
  const collections = ['blog', 'notes', 'posts', 'works'] as const;
  const paths = [];

  for (const collectionName of collections) {
    const articles = await getCollection(collectionName);
    for (const article of articles) {
      if (article.data.slug) {
        paths.push({
          params: { slug: article.data.slug },
          props: { article, collection: collectionName },
        });
      }
    }
  }

  return paths;
}

const { article, collection } = Astro.props;
const { Content, headings } = await article.render();
---

<PostLayout
  title={article.data.title}
  date={article.data.date}
  categories={article.data.categories}
  tags={article.data.tags}
  titleTag={article.data.titleTag}
  author={article.data.author}
  headings={headings}
  rawContent={article.body || ''}
>
  <Content />
</PostLayout>
```

- [ ] **Step 2: Verify a known permalink works**

```bash
pnpm build
```

Then check build output for `/pages/fa532d/index.html` (the "闭包" article).

```bash
ls dist/pages/fa532d/
```

Expected: `index.html` exists.

- [ ] **Step 3: Verify all permalinks are generated**

```bash
ls dist/pages/ | wc -l
```

Expected: ~106 directories (one per article with a slug).

- [ ] **Step 4: Commit permalink route**

```bash
git add src/pages/pages/
git commit -m "feat: add permalink catch-all route /pages/{slug}/ for SEO preservation"
```

---

### Task 2: Home Page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create home page with banner and post list**

Write to `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HomeBanner from '../components/HomeBanner.astro';
import PostList from '../components/PostList.astro';
import Sidebar from '../components/Sidebar.astro';
import SiteInfo from '../components/SiteInfo.astro';
import Pagination from '../components/Pagination.astro';
import { getCollection } from 'astro:content';

// Gather all articles from all collections
const blog = await getCollection('blog');
const notes = await getCollection('notes');
const posts = await getCollection('posts');
const works = await getCollection('works');

const allArticles = [...blog, ...notes, ...posts, ...works]
  .filter(a => a.data.article !== false && !a.data.draft)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

// Pagination: 10 per page on homepage
const PAGE_SIZE = 10;
const totalPages = Math.ceil(allArticles.length / PAGE_SIZE);
const articles = allArticles.slice(0, PAGE_SIZE);
---

<BaseLayout pageClass="vdoing-index-class">
  <!-- Full-screen banner -->
  <HomeBanner />

  <!-- Main content area -->
  <div class="home-content">
    <div class="content-wrapper">
      <div class="main-column">
        <PostList articles={articles} />
        <Pagination currentPage={1} totalPages={totalPages} baseUrl="/" />
      </div>
      <Sidebar>
        <SiteInfo />
      </Sidebar>
    </div>
  </div>
</BaseLayout>

<style>
  .home-content {
    max-width: var(--home-page-width);
    margin: 0 auto;
    padding: 1.5rem;
  }

  .content-wrapper {
    display: flex;
    gap: 2rem;
  }

  .main-column {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 1024px) {
    .content-wrapper {
      flex-direction: column;
    }
  }
</style>
```

- [ ] **Step 2: Commit home page**

```bash
git add src/pages/index.astro
git commit -m "feat: add home page with banner, post list, sidebar, and pagination"
```

---

### Task 3: Archive Page

**Files:**
- Create: `src/pages/archives.astro`

- [ ] **Step 1: Create archives page with timeline**

Write to `src/pages/archives.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { formatDate } from '../utils/date';

const blog = await getCollection('blog');
const notes = await getCollection('notes');
const posts = await getCollection('posts');

const allArticles = [...blog, ...notes, ...posts]
  .filter(a => a.data.article !== false && !a.data.draft)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

// Group by year
const byYear = new Map<number, typeof allArticles>();
for (const article of allArticles) {
  const year = new Date(article.data.date).getFullYear();
  if (!byYear.has(year)) byYear.set(year, []);
  byYear.get(year)!.push(article);
}
const years = [...byYear.keys()].sort((a, b) => b - a);
---

<BaseLayout title="归档">
  <div class="archives-page">
    <h1 class="page-title">归档</h1>
    <p class="total-count">共 {allArticles.length} 篇文章</p>

    {years.map(year => (
      <div class="year-group">
        <h2 class="year-title">{year}</h2>
        <ul class="article-list">
          {byYear.get(year)!.map(article => (
            <li class="article-item">
              <span class="article-date">{formatDate(article.data.date, 'MM-DD')}</span>
              <a href={`/pages/${article.data.slug}/`} class="article-link">
                {article.data.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</BaseLayout>

<style>
  .archives-page {
    padding-top: calc(var(--navbar-height) + 2rem);
    max-width: var(--content-width);
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .page-title {
    font-size: 1.8rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .total-count {
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .year-title {
    font-size: 1.3rem;
    color: var(--accent-color);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 1rem;
  }

  .article-list {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
  }

  .article-item {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 0.4rem 0;
  }

  .article-date {
    font-size: 0.85rem;
    color: var(--text-color);
    opacity: 0.5;
    font-family: monospace;
    white-space: nowrap;
  }

  .article-link {
    color: var(--text-color);
    text-decoration: none;
    font-size: 0.95rem;
  }

  .article-link:hover {
    color: var(--accent-color);
  }
</style>
```

- [ ] **Step 2: Commit archives page**

```bash
git add src/pages/archives.astro
git commit -m "feat: add archives page with year-grouped timeline"
```

---

### Task 4: Categories Pages

**Files:**
- Create: `src/pages/categories/index.astro`
- Create: `src/pages/categories/[category].astro`

- [ ] **Step 1: Create categories index page**

Write to `src/pages/categories/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { getAllCategories } from '../../utils/content';

const blog = await getCollection('blog');
const notes = await getCollection('notes');
const posts = await getCollection('posts');

const allArticles = [...blog, ...notes, ...posts]
  .filter(a => a.data.article !== false && !a.data.draft);

const categories = getAllCategories(allArticles);
const sortedCategories = [...categories.entries()].sort((a, b) => b[1] - a[1]);
---

<BaseLayout title="分类">
  <div class="categories-page">
    <h1 class="page-title">分类</h1>
    <p class="total-count">共 {categories.size} 个分类</p>

    <div class="categories-grid">
      {sortedCategories.map(([name, count]) => (
        <a href={`/categories/${name}/`} class="category-card">
          <span class="category-name">{name}</span>
          <span class="category-count">{count}</span>
        </a>
      ))}
    </div>
  </div>
</BaseLayout>

<style>
  .categories-page {
    padding-top: calc(var(--navbar-height) + 2rem);
    max-width: var(--content-width);
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .page-title {
    font-size: 1.8rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .total-count {
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .categories-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .category-card {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--main-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.2s;
  }

  .category-card:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  .category-count {
    font-size: 0.75rem;
    background-color: var(--accent-color);
    color: #fff;
    padding: 0 6px;
    border-radius: 10px;
  }
</style>
```

- [ ] **Step 2: Create single category page**

Write to `src/pages/categories/[category].astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostList from '../../components/PostList.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const blog = await getCollection('blog');
  const notes = await getCollection('notes');
  const posts = await getCollection('posts');

  const allArticles = [...blog, ...notes, ...posts]
    .filter(a => a.data.article !== false && !a.data.draft);

  const categories = new Set<string>();
  for (const article of allArticles) {
    for (const cat of article.data.categories) {
      categories.add(cat);
    }
  }

  return [...categories].map(category => ({
    params: { category },
    props: {
      category,
      articles: allArticles
        .filter(a => a.data.categories.includes(category))
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()),
    },
  }));
}

const { category, articles } = Astro.props;
---

<BaseLayout title={`分类: ${category}`}>
  <div class="category-page">
    <h1 class="page-title">分类: {category}</h1>
    <p class="total-count">共 {articles.length} 篇文章</p>
    <PostList articles={articles} />
  </div>
</BaseLayout>

<style>
  .category-page {
    padding-top: calc(var(--navbar-height) + 2rem);
    max-width: var(--content-width);
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .page-title {
    font-size: 1.8rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .total-count {
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
</style>
```

- [ ] **Step 3: Commit categories pages**

```bash
git add src/pages/categories/
git commit -m "feat: add categories index and single category pages"
```

---

### Task 5: Tags Pages

**Files:**
- Create: `src/pages/tags/index.astro`
- Create: `src/pages/tags/[tag].astro`

- [ ] **Step 1: Create tags index page**

Write to `src/pages/tags/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { getAllTags } from '../../utils/content';

const blog = await getCollection('blog');
const notes = await getCollection('notes');
const posts = await getCollection('posts');

const allArticles = [...blog, ...notes, ...posts]
  .filter(a => a.data.article !== false && !a.data.draft);

const tags = getAllTags(allArticles);
const sortedTags = [...tags.entries()].sort((a, b) => b[1] - a[1]);
---

<BaseLayout title="标签">
  <div class="tags-page">
    <h1 class="page-title">标签</h1>
    <p class="total-count">共 {tags.size} 个标签</p>

    <div class="tags-cloud">
      {sortedTags.map(([name, count]) => (
        <a
          href={`/tags/${name}/`}
          class="tag-item"
          style={`font-size: ${Math.max(0.8, Math.min(1.6, 0.8 + count * 0.15))}rem`}
        >
          {name}
          <span class="tag-count">{count}</span>
        </a>
      ))}
    </div>
  </div>
</BaseLayout>

<style>
  .tags-page {
    padding-top: calc(var(--navbar-height) + 2rem);
    max-width: var(--content-width);
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .page-title {
    font-size: 1.8rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .total-count {
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: baseline;
  }

  .tag-item {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--accent-color);
    border-radius: 4px;
    color: var(--accent-color);
    text-decoration: none;
    transition: all 0.2s;
  }

  .tag-item:hover {
    background-color: var(--accent-color);
    color: #fff;
  }

  .tag-count {
    font-size: 0.7em;
    opacity: 0.7;
  }
</style>
```

- [ ] **Step 2: Create single tag page**

Write to `src/pages/tags/[tag].astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostList from '../../components/PostList.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const blog = await getCollection('blog');
  const notes = await getCollection('notes');
  const posts = await getCollection('posts');

  const allArticles = [...blog, ...notes, ...posts]
    .filter(a => a.data.article !== false && !a.data.draft);

  const tags = new Set<string>();
  for (const article of allArticles) {
    for (const tag of article.data.tags) {
      if (tag) tags.add(tag);
    }
  }

  return [...tags].map(tag => ({
    params: { tag },
    props: {
      tag,
      articles: allArticles
        .filter(a => a.data.tags.includes(tag))
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()),
    },
  }));
}

const { tag, articles } = Astro.props;
---

<BaseLayout title={`标签: ${tag}`}>
  <div class="tag-page">
    <h1 class="page-title">标签: {tag}</h1>
    <p class="total-count">共 {articles.length} 篇文章</p>
    <PostList articles={articles} />
  </div>
</BaseLayout>

<style>
  .tag-page {
    padding-top: calc(var(--navbar-height) + 2rem);
    max-width: var(--content-width);
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .page-title {
    font-size: 1.8rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .total-count {
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
</style>
```

- [ ] **Step 3: Commit tags pages**

```bash
git add src/pages/tags/
git commit -m "feat: add tags index and single tag pages with tag cloud"
```

---

### Task 6: Catalogue Pages (Blog, Notes, Works)

**Files:**
- Create: `src/pages/blog.astro`
- Create: `src/pages/notes.astro`
- Create: `src/pages/works.astro`

- [ ] **Step 1: Create blog catalogue page**

Write to `src/pages/blog.astro`:

```astro
---
import CatalogueLayout from '../layouts/CatalogueLayout.astro';
import PostList from '../components/PostList.astro';
import { getCollection } from 'astro:content';

const articles = (await getCollection('blog'))
  .filter(a => a.data.article !== false && !a.data.draft)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<CatalogueLayout title="个人博客" description="JavaScript、ES6、Vue框架等前端技术" imgUrl="/img/web.png">
  <PostList articles={articles} />
</CatalogueLayout>
```

- [ ] **Step 2: Create notes catalogue page**

Write to `src/pages/notes.astro`:

```astro
---
import CatalogueLayout from '../layouts/CatalogueLayout.astro';
import PostList from '../components/PostList.astro';
import { getCollection } from 'astro:content';

const articles = (await getCollection('notes'))
  .filter(a => a.data.article !== false && !a.data.draft)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<CatalogueLayout title="学习笔记" description="碎片知识，资源整合" imgUrl="/img/ui.png">
  <PostList articles={articles} />
</CatalogueLayout>
```

- [ ] **Step 3: Create works page**

Write to `src/pages/works.astro`:

```astro
---
import CatalogueLayout from '../layouts/CatalogueLayout.astro';
import PostList from '../components/PostList.astro';
import { getCollection } from 'astro:content';

const articles = (await getCollection('works'))
  .filter(a => !a.data.draft)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<CatalogueLayout title="我的作品" description="业余时间开发的组件、工具等" imgUrl="/img/other.png">
  <PostList articles={articles} />
</CatalogueLayout>
```

- [ ] **Step 4: Commit catalogue pages**

```bash
git add src/pages/blog.astro src/pages/notes.astro src/pages/works.astro
git commit -m "feat: add blog, notes, and works catalogue pages"
```

---

### Task 7: Full Build Verification

- [ ] **Step 1: Run full build**

```bash
pnpm build
```

Expected: Build succeeds with no errors. All routes generated.

- [ ] **Step 2: Verify critical URLs exist in build output**

```bash
# Check permalink articles
ls dist/pages/fa532d/index.html  # 闭包文章
ls dist/pages/aef645/index.html  # 后台管理文章

# Check special pages
ls dist/archives/index.html
ls dist/categories/index.html
ls dist/tags/index.html
ls dist/blog/index.html
ls dist/notes/index.html
ls dist/works/index.html

# Check home
ls dist/index.html
```

Expected: All files exist.

- [ ] **Step 3: Preview locally**

```bash
pnpm preview
```

Visit `http://localhost:4321` and verify:
- Home page renders
- Navigate to a blog post via `/pages/{hash}/`
- Categories/tags/archives pages work

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build issues found during verification"
```
