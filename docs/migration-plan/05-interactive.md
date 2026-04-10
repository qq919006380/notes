# Sub-Plan 5: Interactive Features

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port all interactive visual features from VuePress to vanilla JS scripts: time greeting popup, love-me click hearts, canvas bubble animation, typing text animation, dark/reading mode switcher, and navbar transparency on banner scroll.

**Architecture:** All interactive features are implemented as standalone vanilla JS scripts loaded in `BaseLayout.astro`. No client-side framework needed. Each script is self-contained and initializes on DOMContentLoaded.

**Tech Stack:** Vanilla JavaScript, CSS animations, Canvas API

---

### Task 1: Love-Me Click Heart Effect

**Files:**
- Create: `src/scripts/love-me.js`

- [ ] **Step 1: Port the love-me effect from VuePress plugin**

Write to `src/scripts/love-me.js`:

```javascript
/**
 * Love-me click effect: shows floating hearts on mouse click.
 * Ported from docs/.vuepress/plugins/love-me/love-me.js
 */
(function (window, document) {
  const hearts = [];

  function createHeart(e) {
    const heart = document.createElement('div');
    heart.className = 'love-heart';
    hearts.push({
      el: heart,
      x: e.clientX - 5,
      y: e.clientY - 5,
      scale: 1,
      alpha: 1,
      color: randomColor(),
    });
    document.body.appendChild(heart);
  }

  function randomColor() {
    return (
      'rgb(' +
      ~~(255 * Math.random()) + ',' +
      ~~(255 * Math.random()) + ',' +
      ~~(255 * Math.random()) + ')'
    );
  }

  function render() {
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      if (h.alpha <= 0) {
        h.el.remove();
        hearts.splice(i, 1);
      } else {
        h.y--;
        h.scale += 0.004;
        h.alpha -= 0.013;
        h.el.style.cssText =
          'left:' + h.x + 'px;top:' + h.y + 'px;opacity:' + h.alpha +
          ';transform:scale(' + h.scale + ',' + h.scale + ') rotate(45deg);background:' + h.color +
          ';z-index:99999';
      }
    }
    requestAnimationFrame(render);
  }

  // Inject heart CSS
  const style = document.createElement('style');
  style.textContent = `
    .love-heart {
      width: 10px;
      height: 10px;
      position: fixed;
      background: #f00;
      transform: rotate(45deg);
      pointer-events: none;
    }
    .love-heart::after,
    .love-heart::before {
      content: '';
      width: inherit;
      height: inherit;
      background: inherit;
      border-radius: 50%;
      position: fixed;
    }
    .love-heart::after { top: -5px; }
    .love-heart::before { left: -5px; }
  `;
  document.head.appendChild(style);

  document.addEventListener('click', createHeart);
  render();
})(window, document);
```

- [ ] **Step 2: Commit love-me effect**

```bash
git add src/scripts/love-me.js
git commit -m "feat: port love-me click heart effect to vanilla JS"
```

---

### Task 2: Dark Mode & Reading Mode Switcher

**Files:**
- Create: `src/scripts/dark-mode.js`
- Create: `src/components/ThemeToggle.astro`

- [ ] **Step 1: Create theme switcher script**

Write to `src/scripts/dark-mode.js`:

```javascript
/**
 * Theme mode switcher: light / dark / reading.
 * Persists choice in localStorage.
 */
(function () {
  const STORAGE_KEY = 'theme-mode';
  const THEMES = ['light', 'dark', 'reading'];

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update toggle button icon if exists
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      const icons = { light: 'icon-taiyang', dark: 'icon-yueliang', reading: 'icon-book' };
      btn.querySelector('i').className = 'iconfont ' + (icons[theme] || 'icon-taiyang');
    }
  }

  function cycleTheme() {
    const current = getTheme();
    const idx = THEMES.indexOf(current);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
  }

  // Initialize on load
  setTheme(getTheme());

  // Expose for button click
  window.__cycleTheme = cycleTheme;
})();
```

- [ ] **Step 2: Create ThemeToggle component**

Write to `src/components/ThemeToggle.astro`:

```astro
<button
  id="theme-toggle"
  class="theme-toggle"
  aria-label="切换主题"
  onclick="window.__cycleTheme && window.__cycleTheme()"
>
  <i class="iconfont icon-taiyang"></i>
</button>

<style>
  .theme-toggle {
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
    transition: all 0.3s;
  }

  .theme-toggle:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }
</style>
```

- [ ] **Step 3: Add ThemeToggle to BaseLayout**

Modify `src/layouts/BaseLayout.astro` — add import and component:

```astro
import ThemeToggle from '../components/ThemeToggle.astro';
```

Add before `</body>`:
```astro
<ThemeToggle />
```

- [ ] **Step 4: Commit dark mode**

```bash
git add src/scripts/dark-mode.js src/components/ThemeToggle.astro src/layouts/BaseLayout.astro
git commit -m "feat: add dark/reading mode switcher with localStorage persistence"
```

---

### Task 3: Time Greeting Popup

**Files:**
- Create: `src/scripts/time-greeting.js`

- [ ] **Step 1: Port time greeting from IndexBigImg.vue**

Write to `src/scripts/time-greeting.js`:

```javascript
/**
 * Time-based greeting popup.
 * Shows a friendly message based on the current hour.
 * Ported from IndexBigImg.vue:bgTimeColor → addTip()
 */
(function () {
  function addTip(content, type, startHeight, dieTime) {
    startHeight = startHeight || 50;
    dieTime = dieTime || 3000;

    const tips = document.querySelectorAll('.index-tip');
    const lastTop = tips.length === 0
      ? 0
      : parseInt(tips[tips.length - 1].getAttribute('data-top') || '0');
    const newTop = lastTop + (tips.length !== 0
      ? tips[tips.length - 1].offsetHeight + 17
      : startHeight);

    const div = document.createElement('div');
    const id = Date.now();
    div.className = 'index-tip tip-' + type + ' tip-' + id;
    div.style.top = lastTop + 'px';
    div.setAttribute('data-top', newTop);

    const icons = {
      info: 'icon-info',
      success: 'icon-dagouyouquan',
      danger: 'icon-cuowu',
      warning: 'icon-gantanhao'
    };

    div.innerHTML =
      '<i class="iconfont ' + (icons[type] || icons.info) + ' tip-icon"></i>' +
      '<p class="tip-' + type + '-content">' + content + '</p>';

    document.body.appendChild(div);

    setTimeout(function () {
      div.style.top = newTop + 'px';
      div.style.opacity = '1';
    }, 10);

    setTimeout(function () {
      div.style.top = '0px';
      div.style.opacity = '0';
      setTimeout(function () { div.remove(); }, 500);
    }, dieTime);
  }

  function showGreeting() {
    // Only show on home page
    if (window.location.pathname !== '/') return;

    const hours = new Date().getHours();
    const minutes = String(new Date().getMinutes()).padStart(2, '0');
    const seconds = String(new Date().getSeconds()).padStart(2, '0');
    const time = hours + ':' + minutes + ':' + seconds;

    let msg;
    if (hours >= 6 && hours < 12) {
      msg = '早上好呀~~，现在是 ' + time + '，吃早餐了吗？';
    } else if (hours >= 12 && hours < 16) {
      msg = '下午好呀~~，现在是 ' + time + '，繁忙的下午也要适当休息哦~~';
    } else if (hours >= 16 && hours < 19) {
      msg = '到黄昏了~~，现在是 ' + time + '，该准备吃饭啦~~';
    } else if (hours >= 19 && hours < 24) {
      msg = '晚上好呀~~，现在是 ' + time + '，该准备洗漱睡觉啦~~';
    } else {
      msg = '别再熬夜了~~，现在是 ' + time + '，早点睡吧~~';
    }

    addTip(msg, 'info', 50, 4000);
  }

  // Inject tip styles
  const style = document.createElement('style');
  style.textContent = `
    .index-tip {
      position: fixed;
      display: flex;
      align-items: center;
      top: -10px;
      left: 50%;
      opacity: 0;
      min-width: 320px;
      transform: translateX(-50%);
      transition: opacity 0.3s linear, top 0.4s;
      z-index: 99999;
      padding: 15px 15px 15px 20px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      line-height: 17px;
      pointer-events: none;
    }
    .index-tip p { line-height: 17px; margin: 0; font-size: 14px; }
    .tip-icon { margin-right: 10px; line-height: 17px; }
    .tip-info { background-color: #edf2fc; border-color: #ebeef5; }
    .tip-info .tip-info-content { color: #909399; }
    .tip-success { color: #67c23a; background-color: #f0f9eb; border-color: #e1f3d8; }
    .tip-danger { color: #f56c6c; background-color: #fef0f0; border-color: #fde2e2; }
    .tip-warning { color: #e6a23c; background-color: #fdf6ec; border-color: #faecd8; }
    @media (max-width: 640px) {
      .index-tip { min-width: auto; width: 90vw; }
    }
  `;
  document.head.appendChild(style);

  // Show after a brief delay for better UX
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(showGreeting, 1000);
    });
  } else {
    setTimeout(showGreeting, 1000);
  }
})();
```

- [ ] **Step 2: Commit time greeting**

```bash
git add src/scripts/time-greeting.js
git commit -m "feat: port time greeting popup with time-based messages"
```

---

### Task 4: Home Banner with Typing Animation & Background Effects

**Files:**
- Create: `src/components/HomeBanner.astro`
- Create: `src/scripts/typing-animation.js`
- Create: `src/scripts/canvas-bubble.js`

- [ ] **Step 1: Create HomeBanner component**

Write to `src/components/HomeBanner.astro`:

```astro
---
import { SITE_CONFIG } from '../utils/site-config';
const { indexImg, bodyBgImg } = SITE_CONFIG;
---

<div class="banner" id="banner" style={`background-image: url('${bodyBgImg}')`}>
  <!-- Time-based color overlay -->
  <div class="banner-color" id="banner-color"></div>

  <!-- Banner content -->
  <div class="banner-content">
    <h1 class="banner-title">{SITE_CONFIG.title}的博客</h1>
    <p class="description" id="banner-description">
      <span></span><span class="typed">|</span>
    </p>
  </div>

  <!-- Scroll arrow -->
  <a class="banner-arrow" id="banner-arrow"></a>

  <!-- Canvas for bubbles (if enabled) -->
  {indexImg.bubble && <canvas id="canvas"></canvas>}
</div>

<style>
  .banner {
    position: relative;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .banner-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .banner-content {
    position: relative;
    z-index: 2;
    text-align: center;
    margin-top: -10vh;
  }

  .banner-title {
    color: var(--banner-text-color);
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .description {
    color: var(--banner-text-color);
    font-size: 1.4rem;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  .typed {
    animation: typedBlink 1s infinite;
  }

  @keyframes typedBlink {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  .banner-arrow {
    display: block;
    position: absolute;
    left: 50%;
    bottom: 15%;
    margin-left: -10px;
    cursor: pointer;
    z-index: 10;
    animation: bounce-in 5s 3s infinite;
  }

  .banner-arrow::before,
  .banner-arrow::after {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    border-right: 3px solid #fff;
    border-top: 3px solid #fff;
    transform: rotate(135deg);
  }

  .banner-arrow::before {
    position: absolute;
    bottom: 10px;
  }

  @keyframes bounce-in {
    0%, 20%, 80%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>

<script>
  // Scroll arrow click
  document.getElementById('banner-arrow')?.addEventListener('click', () => {
    const banner = document.getElementById('banner');
    if (banner) {
      window.scrollTo({ top: banner.clientHeight, behavior: 'smooth' });
    }
  });

  // Navbar transparency management
  const navbar = document.getElementById('navbar');
  const banner = document.getElementById('banner');

  function updateNavbar() {
    if (!navbar || !banner) return;
    const scrollTop = document.documentElement.scrollTop;
    const bannerHeight = banner.clientHeight;

    if (scrollTop < bannerHeight) {
      navbar.classList.add('transparent');
    } else {
      navbar.classList.remove('transparent');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar);

  // Time-based background color overlay
  const bannerColor = document.getElementById('banner-color');
  if (bannerColor) {
    const hours = new Date().getHours();
    const colors = ['transparent', 'rgba(255, 148, 48, .2)', 'rgba(0, 0, 0, .3)', 'rgba(0, 0, 0, .5)'];
    let bg = colors[0];
    if (hours >= 16 && hours < 19) bg = colors[1];
    else if (hours >= 19 && hours < 24) bg = colors[2];
    else if (hours >= 0 && hours < 6) bg = colors[3];
    bannerColor.style.backgroundColor = bg;
  }
</script>

<script src="../scripts/time-greeting.js"></script>
```

- [ ] **Step 2: Create typing animation script**

Write to `src/scripts/typing-animation.js`:

```javascript
/**
 * Typing animation for banner description.
 * Ported from IndexBigImg.vue:textFadeInAndOut()
 */
(function () {
  const desc = ['Hello world!'];
  const fadeInTime = 200;
  const fadeOutTime = 100;
  const nextTime = 800;

  function init() {
    const descEl = document.getElementById('banner-description');
    if (!descEl) return;

    const textSpan = descEl.querySelector('span:first-child');
    const cursor = descEl.querySelector('.typed');
    if (!textSpan || !cursor) return;

    let descIndex = 0;
    let charIndex = 0;
    let currentText = desc[descIndex];

    function fadeIn() {
      cursor.style.animation = 'none';
      textSpan.textContent = currentText.substring(0, charIndex++);
      if (charIndex > currentText.length) {
        cursor.style.animation = 'typedBlink 1s infinite';
        setTimeout(function () {
          charIndex = currentText.length;
          fadeOutInterval = setInterval(fadeOut, fadeOutTime);
        }, nextTime);
        clearInterval(fadeInInterval);
      }
    }

    function fadeOut() {
      if (charIndex >= 0) {
        cursor.style.animation = 'none';
        textSpan.textContent = currentText.substring(0, charIndex--);
      } else {
        cursor.style.animation = 'typedBlink 1s infinite';
        clearInterval(fadeOutInterval);
        setTimeout(function () {
          descIndex = (descIndex + 1) % desc.length;
          currentText = desc[descIndex];
          charIndex = 0;
          fadeInInterval = setInterval(fadeIn, fadeInTime);
        }, nextTime);
      }
    }

    let fadeInInterval = setInterval(fadeIn, fadeInTime);
    let fadeOutInterval;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

- [ ] **Step 3: Create canvas bubble script**

Write to `src/scripts/canvas-bubble.js`:

```javascript
/**
 * Canvas bubble animation for home banner.
 * Ported from IndexBigImg.vue:canvasBubble()
 * Only runs when canvas#canvas element exists.
 */
(function () {
  function init() {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const bubbleNum = 200;

    function Dot() {
      this.alive = true;
      this.x = Math.round(Math.random() * canvas.width);
      this.y = Math.round(Math.random() * canvas.height);
      this.diameter = Math.random() * 10.8;
      this.r = Math.round(Math.random() * 255);
      this.g = Math.round(Math.random() * 255);
      this.b = Math.round(Math.random() * 255);
      this.alpha = 0.5;
      this.color = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.alpha + ')';
      this.vx = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7;
      this.vy = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7;
    }

    Dot.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
      ctx.fill();
    };

    Dot.prototype.update = function () {
      if (this.alpha < 0.8) {
        this.alpha += 0.01;
        this.color = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.alpha + ')';
      }
      this.x += this.vx;
      this.y += this.vy;
      if (this.x > canvas.width + 5 || this.x < -5 || this.y > canvas.height + 5 || this.y < -5) {
        this.alive = false;
      }
    };

    let dots = [];

    function loop() {
      while (dots.length < bubbleNum) {
        dots.push(new Dot());
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(function (dot) {
        dot.update();
        dot.draw();
      });
      dots = dots.filter(function (dot) { return dot.alive; });
      requestAnimationFrame(loop);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dots = [];
    }

    resize();
    window.addEventListener('resize', resize);
    loop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

- [ ] **Step 4: Add typing and bubble scripts to HomeBanner**

Add at the end of `src/components/HomeBanner.astro` (before the closing tag):

```astro
<script src="../scripts/typing-animation.js"></script>
<script src="../scripts/canvas-bubble.js"></script>
```

- [ ] **Step 5: Verify all interactive features work**

```bash
pnpm dev
```

Visit `http://localhost:4321` and verify:
- Banner fills viewport with background image
- Typing animation works ("Hello world!" types in and out)
- Scroll arrow bounces and scrolls down on click
- Navbar is transparent over banner, solid after scrolling
- Time greeting popup appears after ~1 second
- Click anywhere to see heart effects
- Theme toggle cycles light → dark → reading

- [ ] **Step 6: Commit all interactive features**

```bash
git add src/components/HomeBanner.astro src/scripts/typing-animation.js src/scripts/canvas-bubble.js
git commit -m "feat: add HomeBanner with typing animation, canvas bubbles, scroll arrow, time greeting"
```

---

### Task 5: SiteInfo Component

**Files:**
- Create: `src/components/SiteInfo.astro`

- [ ] **Step 1: Create site info component (replaces WebInfo.vue)**

Write to `src/components/SiteInfo.astro`:

```astro
---
import { getCollection } from 'astro:content';
import { daysSince } from '../utils/date';
import { countWords } from '../utils/content';
import { SITE_CONFIG } from '../utils/site-config';

// Calculate stats at build time
const blog = await getCollection('blog');
const notes = await getCollection('notes');
const posts = await getCollection('posts');

const allArticles = [...blog, ...notes, ...posts]
  .filter(a => a.data.article !== false && !a.data.draft);

const articleCount = allArticles.length;
const runtimeDays = daysSince(SITE_CONFIG.blogCreate);

// Total word count
let totalWords = 0;
for (const article of allArticles) {
  if (article.body) {
    const [cn, en] = countWords(article.body);
    totalWords += cn + en;
  }
}
const totalWordsStr = totalWords >= 1000
  ? Math.round(totalWords / 100) / 10 + 'k'
  : String(totalWords);
---

<div class="site-info card-box">
  <div class="site-info-title">
    <i class="iconfont icon-award" style="font-size: 0.875rem; font-weight: 900; width: 1.25em"></i>
    <span>站点信息</span>
  </div>
  <div class="info-item">
    <span>文章数目：</span>
    <span>{articleCount} 篇</span>
  </div>
  <div class="info-item">
    <span>已运行时间：</span>
    <span>{runtimeDays > 0 ? runtimeDays + ' 天' : '不到一天'}</span>
  </div>
  <div class="info-item">
    <span>本站总字数：</span>
    <span>{totalWordsStr} 字</span>
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

  .site-info-title {
    text-align: center;
    color: var(--text-color);
    opacity: 0.7;
    font-weight: bold;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    font-size: 0.875rem;
    color: var(--text-color);
  }
</style>
```

- [ ] **Step 2: Commit SiteInfo**

```bash
git add src/components/SiteInfo.astro
git commit -m "feat: add SiteInfo component with article count, runtime, word count"
```
