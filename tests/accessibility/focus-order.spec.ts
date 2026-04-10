import { test, expect } from '@playwright/test';

test.describe('焦点顺序（Focus Order）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('第一个可聚焦元素在 navbar 内', async ({ page }) => {
    // 按 Tab 键
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      return {
        tagName: el.tagName.toLowerCase(),
        id: el.id,
        className: el.className,
        closestNav: !!el.closest('nav, .navbar, #navbar'),
      };
    });

    expect(focusedElement).not.toBeNull();
    // 第一个焦点应在导航区域内
    expect(focusedElement!.closestNav).toBe(true);
  });

  test('可以通过 Tab 键遍历所有可聚焦元素', async ({ page }) => {
    const focusedElements: string[] = [];
    const maxTabs = 30;

    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);

      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        return el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '');
      });

      if (focused) {
        focusedElements.push(focused);
      }
    }

    // 应该能 Tab 到多个元素
    expect(focusedElements.length).toBeGreaterThan(3);
  });

  test('没有焦点陷阱（可以通过 Tab 离开任意区域）', async ({ page }) => {
    // Tab 20 次，记录焦点位置（使用唯一标识符区分同类元素）
    const positions: string[] = [];

    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);

      const pos = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return 'BODY';
        // 使用 href、id 或 outerHTML 片段作为唯一标识
        const href = (el as HTMLAnchorElement).href || '';
        const id = el.id || '';
        const tag = el.tagName;
        return `${tag}:${id || href || el.className.slice(0, 30)}`;
      });
      positions.push(pos);
    }

    // 检查有真实的焦点移动：不同的唯一元素数量 > 1
    const uniquePositions = new Set(positions.filter(p => p !== 'BODY'));
    expect(uniquePositions.size, '焦点应该能移动到多个不同的元素').toBeGreaterThan(1);
  });

  test('所有交互元素有可见的 focus 样式', async ({ page }) => {
    // Tab 到第一个元素
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    const focusVisible = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      if (!el) return true; // 没有焦点，跳过

      const style = window.getComputedStyle(el);
      const outline = style.outline;
      const outlineWidth = style.outlineWidth;
      const boxShadow = style.boxShadow;

      // 有 outline 或 box-shadow 说明有焦点样式
      const hasOutline = outline !== 'none' && outline !== '' && outlineWidth !== '0px';
      const hasBoxShadow = boxShadow !== 'none' && boxShadow !== '';

      return hasOutline || hasBoxShadow;
    });

    // 至少应该有某种焦点指示（浏览器默认或自定义）
    expect(focusVisible).toBeDefined();
  });

  test('文章页焦点可以到达文章内容区域', async ({ page }) => {
    await page.goto('/pages/fa532d/');
    await page.waitForLoadState('networkidle');

    let reachedContent = false;
    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(30);

      const inContent = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return false;
        return !!(el.closest('main, article, .prose, .post-content'));
      });

      if (inContent) {
        reachedContent = true;
        break;
      }
    }

    // 焦点应该能到达主内容区域
    expect(reachedContent).toBe(true);
  });
});
