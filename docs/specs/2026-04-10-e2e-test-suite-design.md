# E2E Test Suite Design — Astro Blog

## Goal

Comprehensive Playwright E2E test suite for the migrated Astro blog (weibaichao.com), covering SEO, UI design system, interactions, responsive layouts, content integrity, and accessibility. Serves dual purpose: one-time migration validation + ongoing CI regression.

## Architecture

```
tests/
├── seo/              7 files — meta/OG/sitemap/permalink/canonical/robots/heading
├── ui/              10 files — design tokens/navbar/footer/card/typography/post/sidebar/banner/code
├── interaction/     14 files — love-me/greeting/typing/progress/search/dropdown/scroll/collapse/etc
├── responsive/       5 files — overflow detection + 4 breakpoint layouts
├── content/         10 files — article count/render/categories/tags/archives/catalogue/meta/nav/excerpt
├── accessibility/    7 files — axe-core/contrast/alt-text/landmarks/focus-order
├── helpers/
│   ├── test-utils.ts      — shared utilities (overflow detection, contrast calc, bbox compare)
│   └── test-config.ts     — constants (URLs, breakpoints, expected design token values)
└── playwright.config.ts
```

**Total: 53 test files across 6 layers.**

## Run Modes

- **Full validation**: All 53 files — migration acceptance
- **Regression**: Core subset ~15 files (SEO + overflow + key interactions) — CI on every push

## Tech Stack

- Playwright Test (latest)
- @axe-core/playwright (accessibility)
- No screenshot comparison (unstable across environments)

---

## Layer 1: SEO Tests (`tests/seo/`)

### meta-tags.spec.ts
- Every page type (home, article, archive, category, tag, catalogue): verify `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<meta name="theme-color">`
- Article page title format: `{title} | 夏天夏`
- Home page description contains "前端"

### og-tags.spec.ts
- `og:title`, `og:description`, `og:url`, `og:type` on article pages
- `og:type` = "article" for posts, "website" for home

### sitemap.spec.ts
- `sitemap-index.xml` exists and is valid XML
- Contains domain `https://www.weibaichao.com`
- URL count >= 104

### permalinks.spec.ts
- Load all 104 slugs from `scripts/permalink-map.json`
- Each `/pages/{slug}/` returns 200 status
- No 301 redirects (URL structure preserved exactly)

### canonical.spec.ts
- Each page has `<link rel="canonical">` pointing to itself
- No duplicate canonical URLs

### robots.spec.ts
- `/robots.txt` exists
- Contains `Sitemap:` directive
- Does not disallow `/pages/`

### heading-hierarchy.spec.ts
- Each page has exactly 1 `<h1>`
- Heading levels don't skip (no h1→h3 without h2)
- Article pages: h1 = article title

---

## Layer 2: UI Design System Tests (`tests/ui/`)

### design-tokens.spec.ts
Verify CSS custom properties on `:root`:
```
--accent-color: rgb(17, 168, 205)
--reading-progress-color: rgb(177, 96, 234)
--navbar-height: 57.6px (3.6rem)
--sidebar-width: 288px (18rem)
--content-width: 860px
--home-page-width: 1200px
--right-menu-width: 230px
--body-bg: rgb(244, 244, 244)
--main-bg: rgb(255, 255, 255)
--text-color: rgb(0, 64, 80)
--border-color: rgba(0, 0, 0, 0.15)
```

### navbar.spec.ts
- Fixed position, height matches `--navbar-height`
- Logo image is circular (border-radius: 50%)
- Site name text = "夏天夏"
- All nav items from site-config rendered
- iconfont GitHub icon visible

### footer.spec.ts
- 3 social icons (email, GitHub, juejin) with correct links
- Copyright text includes "夏天夏" and "MIT License"
- Year range starts from 2019

### card-style.spec.ts
- All `.card-box` elements: `border-radius` = 8px, `box-shadow` exists, `padding` >= 1rem
- Background color matches `--main-bg`
- Consistent across: BloggerBar, SiteInfo, ContactCard, RecentArticles, RightMenu

### typography.spec.ts
- Body font-family contains system fonts (-apple-system, BlinkMacSystemFont)
- Article body (`<div class="prose">`) line-height >= 1.6
- h1 font-size >= 1.5rem, h2 >= 1.2rem
- Code font-family is monospace

### post-detail.spec.ts
- titleTag "原创" badge: background = accent-color, white text, border-radius
- Meta info row: date + word count + reading time + author
- Category links styled as pills
- Tag links styled as outlined pills
- Article content non-empty

### sidebar.spec.ts (right sidebar)
- BloggerBar: avatar (circular), name "夏天夏", slogan "我也不饶岁月"
- SiteInfo: shows article count (number > 0), runtime days (number > 0), word count (contains "k")
- ContactCard: contains "zwei919" and "请我喝杯咖啡"

### structured-sidebar.spec.ts (left sidebar)
- On article page: sidebar visible (>= 1024px viewport)
- Has at least 1 `<details>` group
- Current article has `.active` class with accent-color left border
- Groups show article count
- Click summary toggles open/close

### home-banner.spec.ts
- Banner height = 100vh
- Has background-image CSS property
- Contains #banner-arrow element
- Contains #banner-description with span elements
- Contains #banner-color overlay div

### code-block.spec.ts
- `<pre>` elements have syntax-highlighted `<code>` children
- Expressive-code copy button exists within code blocks
- Code block has border-radius (rounded corners)

---

## Layer 3: Interaction Tests (`tests/interaction/`)

### love-me.spec.ts
- Click on page body → `.love-heart` element created in DOM
- Heart element has `position: fixed`
- After ~2 seconds, heart element removed from DOM

### time-greeting.spec.ts
- Navigate to `/` → wait 1.5s → `.index-tip` element appears
- Tip contains time-appropriate greeting text
- Navigate to `/archives/` → wait 2s → no `.index-tip` element

### typing-animation.spec.ts
- On home page, `#banner-description span:first-child` starts empty
- After 2s, text content length > 0 (typing in progress)
- `.typed` element has animation CSS property

### reading-progress.spec.ts
- At page top: `#reading-progress` width = 0%
- Scroll to 50%: width ≈ 50% (tolerance ±10%)
- Scroll to bottom: width ≈ 100%

### search.spec.ts
- Click search box → PagefindUI modal/input appears
- Type "闭包" → search results appear (> 0 results)
- Result contains link to article page

### navbar-dropdown.spec.ts
- Hover on "个人博客" → dropdown menu visible
- Dropdown contains "技术分享" group title
- Click dropdown link → navigates to correct URL

### navbar-scroll.spec.ts
- At top (over banner): navbar has transparent/no background
- Scroll past banner height: navbar has solid background with backdrop-filter

### sidebar-collapse.spec.ts
- Click closed `<summary>` → `<details>` opens (has `open` attribute)
- Click open `<summary>` → `<details>` closes
- Group containing current article defaults to open

### back-to-top.spec.ts
- At page top: back-to-top button hidden (display:none or opacity:0)
- Scroll > 300px: button visible
- Click button → page scrolls to top (scrollY ≈ 0)

### scroll-arrow.spec.ts
- Click `#banner-arrow` → page scrolls down past banner
- After scroll, `window.scrollY` >= banner height

### image-zoom.spec.ts
- On article page with images: click `.prose img` → medium-zoom overlay appears
- Overlay has dark background
- Click overlay → zoom closes

### code-copy.spec.ts
- Hover over `<pre>` code block → copy button becomes visible (opacity > 0)
- Button has text "Copy" or copy icon

### mobile-nav.spec.ts (viewport: 375px)
- Hamburger button visible
- Click hamburger → mobile nav panel slides in (has `.active` class)
- Panel contains nav links
- Click overlay → panel closes

### pagination.spec.ts
- Home page has pagination component
- Click "下一页" or page 2 → URL changes to `/page/2/`
- New page has different articles than page 1
- Page 2 has "上一页" link back to `/`

---

## Layer 4: Responsive Tests (`tests/responsive/`)

### Breakpoints
- 375×667 (iPhone SE)
- 768×1024 (iPad)
- 1024×768 (small laptop)
- 1440×900 (desktop)

### overflow-detection.spec.ts
For each breakpoint, on each page type (home, article, archive, categories, tags, blog catalogue):

```typescript
// Scan all container elements
const selectors = [
  '.post-content', '.post-item', '.card-box',
  '.navbar', '.footer', '.sidebar-link', '.nav-link',
  '.category-link', '.tag-link',
  'h1', 'h2', 'h3', 'p', 'li', 'a',
  '.post-title', '.post-meta', '.banner-content',
];

// For each element: scrollWidth > clientWidth && overflow not controlled → FAIL
```

### layout-375.spec.ts
- Navbar: hamburger menu visible, nav-links hidden
- Left sidebar: hidden
- Right sidebar: hidden
- Content: full width (minus padding)
- Post items: single column
- Banner text: font-size reduced, no overflow

### layout-768.spec.ts
- Navbar: hamburger menu visible
- Sidebars: hidden
- Content: single column, wider than 375

### layout-1024.spec.ts
- Navbar: full navigation visible
- Left sidebar: visible (on article pages)
- Right sidebar: hidden or visible depending on space
- Content: main column + left sidebar

### layout-1440.spec.ts
- Navbar: full navigation
- Left sidebar: visible
- Right sidebar: visible (TOC on article pages)
- Content: three-column layout
- Max-width constraint applied (--home-page-width)

---

## Layer 5: Content Tests (`tests/content/`)

### article-count.spec.ts
- Navigate to `/archives/` → count total articles listed >= 104

### article-render.spec.ts
- Sample 10 articles (known slugs): title in h1, prose content non-empty, at least 1 paragraph
- Code blocks have syntax highlighting (colored spans inside `<code>`)
- No raw markdown visible (no `##`, `**`, `` ` `` in visible text)

### categories-data.spec.ts
- `/categories/` page: at least 5 category cards
- Each card shows count badge (number > 0)
- Click a category → page loads with matching articles

### tags-data.spec.ts
- `/tags/` page: at least 10 tag items
- Tags have varying font sizes (tag cloud effect)
- Click a tag → page loads with matching articles

### archives-data.spec.ts
- `/archives/` page: years in descending order
- Each year has at least 1 article
- Articles within year sorted by date (newest first)
- Total article count displayed

### catalogue-groups.spec.ts
- `/blog/` page: articles grouped by sub-category (not flat list)
- `/notes/` page: articles grouped by sub-category
- Groups are sorted, articles within groups are sorted by sortOrder

### article-meta.spec.ts
- Article page shows: formatted date, word count (number + "字"), reading time, author name "夏天夏"
- Author name links to GitHub profile

### article-nav.spec.ts
- Article page has prev/next navigation at bottom
- First article in sorted order: only "下一篇"
- Last article: only "上一篇"
- Middle article: both directions, links work

### excerpt.spec.ts
- Home page post list: each item has excerpt text (length > 10 chars)
- Excerpt doesn't contain markdown syntax

### special-pages.spec.ts
- All 7 special pages return 200: /, /blog/, /notes/, /works/, /archives/, /categories/, /tags/

---

## Layer 6: Accessibility Tests (`tests/accessibility/`)

### axe-home.spec.ts
- Run axe-core on home page
- 0 critical violations
- 0 serious violations

### axe-article.spec.ts
- Run axe-core on a sample article page
- 0 critical/serious violations

### axe-archives.spec.ts
- Run axe-core on archives page
- 0 critical/serious violations

### contrast.spec.ts
Calculate foreground/background contrast ratio for:
- Body text on body background (--text-color on --body-bg): >= 4.5:1
- Link text on content background (--accent-color on --main-bg): >= 4.5:1
- Navbar text on navbar background
- Footer text

### alt-text.spec.ts
- All `<img>` elements have non-empty `alt` attribute
- BloggerBar avatar has meaningful alt (not "image" or "")

### landmarks.spec.ts
- Page has `<nav>` element
- Page has `<main>` element
- Page has `<footer>` element
- No duplicate `<main>` elements

### focus-order.spec.ts
- Tab from start: first focusable is in navbar
- Tab sequence: navbar → main content → sidebar → footer
- No focus traps

---

## Shared Helpers

### test-config.ts
```typescript
export const BASE_URL = 'http://localhost:4323';
export const BREAKPOINTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1024, height: 768 },
  desktop: { width: 1440, height: 900 },
};
export const DESIGN_TOKENS = {
  accentColor: 'rgb(17, 168, 205)',
  progressColor: 'rgb(177, 96, 234)',
  navbarHeight: 57.6, // 3.6rem * 16
  bodyBg: 'rgb(244, 244, 244)',
  mainBg: 'rgb(255, 255, 255)',
  textColor: 'rgb(0, 64, 80)',
  // ...
};
export const SAMPLE_SLUGS = ['fa532d', 'aef645', 'fb0623', '796ac5', '67470e'];
```

### test-utils.ts
```typescript
export async function checkOverflow(page, selector): Promise<OverflowResult[]>
export function contrastRatio(fg: RGB, bg: RGB): number
export function parseRGB(cssColor: string): RGB
export async function getBoundingBoxRelation(el1, el2): Promise<'above'|'below'|'left'|'right'|'overlapping'>
```

---

## Execution Strategy (Agent Teams)

### Team 1: Test Writers (3 parallel agents)
- `writer-seo-content`: SEO (7) + Content (10) = 17 files
- `writer-ui-responsive`: UI (10) + Responsive (5) + Helpers (2) + config = 18 files
- `writer-interaction-a11y`: Interaction (14) + Accessibility (7) = 21 files

### Team 2: Test Runners (1 agent)
- `runner`: Run full suite, collect failures, categorize by severity

### Team 3: Fixers (2 parallel agents based on failures)
- `fixer-code`: Fix source code issues found by tests
- `fixer-tests`: Fix false positives / test issues

### Team 4: Final Validation (1 agent)
- `final-validator`: Re-run full suite, confirm 0 failures, report to user
