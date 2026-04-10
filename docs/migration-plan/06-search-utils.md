# Sub-Plan 6: Search & Utilities

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Pagefind for full-text search, add medium-zoom for image enlargement, add code copy button functionality, and set up sitemap generation.

**Architecture:** Pagefind runs at build time to index all HTML output. Medium-zoom is loaded as a client-side script. Code copy buttons are added via a post-render script.

**Tech Stack:** Pagefind, medium-zoom, Astro sitemap integration

---

### Task 1: Pagefind Full-Text Search

**Files:**
- Modify: `package.json` (add postbuild script)
- Modify: `src/components/Navbar.astro` (add search mount point)

- [ ] **Step 1: Add pagefind postbuild script**

Edit `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && npx pagefind --site dist",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

- [ ] **Step 2: Add Pagefind CSS and JS to BaseLayout**

Add to `<head>` section in `src/layouts/BaseLayout.astro`:

```html
<link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
<script src="/pagefind/pagefind-ui.js" is:inline></script>
```

- [ ] **Step 3: Initialize Pagefind in Navbar search box**

Add to the end of `src/components/Navbar.astro`:

```astro
<script>
  window.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    if (searchBox && window.PagefindUI) {
      new window.PagefindUI({
        element: '#search-box',
        showSubResults: true,
        translations: {
          placeholder: '搜索文档...',
          zero_results: '没有找到相关结果',
        },
      });
    }
  });
</script>
```

- [ ] **Step 4: Build and verify search works**

```bash
pnpm build
pnpm preview
```

Visit `http://localhost:4321`, type in the search box. Expected: search results appear from indexed content.

- [ ] **Step 5: Commit pagefind integration**

```bash
git add package.json src/layouts/BaseLayout.astro src/components/Navbar.astro
git commit -m "feat: integrate Pagefind for full-text search"
```

---

### Task 2: Image Zoom (medium-zoom)

**Files:**
- Create: `src/scripts/medium-zoom-init.js`

- [ ] **Step 1: Create medium-zoom initialization script**

Write to `src/scripts/medium-zoom-init.js`:

```javascript
/**
 * Initialize medium-zoom on all article images.
 * Excludes images with class .no-zoom.
 */
import mediumZoom from 'medium-zoom';

document.addEventListener('DOMContentLoaded', () => {
  mediumZoom('.prose img:not(.no-zoom)', {
    background: 'rgba(0,0,0,0.6)',
  });
});
```

- [ ] **Step 2: Add to PostLayout**

The import is already added in PostLayout.astro (Task 5 of Sub-Plan 3). Verify it exists:

```astro
<script>
  import mediumZoom from 'medium-zoom';
  mediumZoom('.prose img:not(.no-zoom)', {
    background: 'rgba(0,0,0,0.6)',
  });
</script>
```

- [ ] **Step 3: Commit image zoom**

```bash
git add src/scripts/medium-zoom-init.js
git commit -m "feat: add medium-zoom for image enlargement in articles"
```

---

### Task 3: Code Copy Button

**Files:**
- Create: `src/scripts/code-copy.js`

- [ ] **Step 1: Create code copy button script**

Write to `src/scripts/code-copy.js`:

```javascript
/**
 * Adds a copy button to all code blocks.
 * Replaces vuepress-plugin-one-click-copy.
 */
(function () {
  function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(function (block) {
      if (block.querySelector('.copy-btn')) return; // Already has button

      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.textContent = '复制';
      button.setAttribute('aria-label', '复制代码');

      button.addEventListener('click', function () {
        const code = block.querySelector('code');
        if (!code) return;

        navigator.clipboard.writeText(code.textContent || '').then(function () {
          button.textContent = '已复制';
          button.classList.add('copied');
          setTimeout(function () {
            button.textContent = '复制';
            button.classList.remove('copied');
          }, 1000);
        });
      });

      block.style.position = 'relative';
      block.appendChild(button);
    });
  }

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    .copy-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 12px;
      font-size: 12px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      background: rgba(0,0,0,0.3);
      color: #fff;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 10;
    }
    pre:hover .copy-btn { opacity: 1; }
    .copy-btn:hover { background: rgba(0,0,0,0.5); }
    .copy-btn.copied { background: #42b983; border-color: #42b983; }
  `;
  document.head.appendChild(style);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCopyButtons);
  } else {
    addCopyButtons();
  }
})();
```

- [ ] **Step 2: Add to BaseLayout**

Add before `</body>` in `src/layouts/BaseLayout.astro`:

```astro
<script src="../scripts/code-copy.js"></script>
```

- [ ] **Step 3: Commit code copy**

```bash
git add src/scripts/code-copy.js src/layouts/BaseLayout.astro
git commit -m "feat: add code block copy button"
```

---

### Task 4: Sitemap

**Files:**
- Verify: `astro.config.mjs` already includes `@astrojs/sitemap`

- [ ] **Step 1: Verify sitemap is configured**

Check `astro.config.mjs` has:

```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.weibaichao.com',
  integrations: [sitemap()],
});
```

- [ ] **Step 2: Build and verify sitemap output**

```bash
pnpm build
ls dist/sitemap*.xml
cat dist/sitemap-0.xml | head -20
```

Expected: `sitemap-index.xml` and `sitemap-0.xml` exist with correct URLs.

- [ ] **Step 3: Commit sitemap verification**

```bash
git add astro.config.mjs
git commit -m "feat: verify sitemap generation with @astrojs/sitemap"
```
