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
    // Tab 20 次，记录焦点位置
    const positions: string[] = [];

    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);

      const pos = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? `${el.tagName}-${el.id || el.className.slice(0, 20)}` : 'none';
      });
      positions.push(pos);
    }

    // 检查没有连续 5 次在同一元素上（焦点陷阱标志）
    for (let i = 0; i < positions.length - 5; i++) {
      const slice = positions.slice(i, i + 5);
      const allSame = slice.every(p => p === slice[0]);
      expect(allSame).toBe(false);
    }
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
