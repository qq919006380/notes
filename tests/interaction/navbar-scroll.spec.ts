import { test, expect } from '@playwright/test';

test.describe('Navbar 滚动透明效果', () => {
  test('首页顶部时 navbar 有 transparent 类（无背景）', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 确保在顶部
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const hasTransparent = await page.locator('#navbar').evaluate(el => {
      return el.classList.contains('transparent');
    });
    expect(hasTransparent).toBe(true);
  });

  test('滚动超过 banner 高度后 navbar 移除 transparent 类', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 获取 banner 高度
    const bannerHeight = await page.locator('#banner').evaluate(el => el.clientHeight);

    // 滚动到 banner 高度之后
    await page.evaluate((height) => {
      window.scrollTo(0, height + 100);
    }, bannerHeight);
    await page.waitForTimeout(300);

    const hasTransparent = await page.locator('#navbar').evaluate(el => {
      return el.classList.contains('transparent');
    });
    expect(hasTransparent).toBe(false);
  });

  test('滚动后 navbar 有非透明背景', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const bannerHeight = await page.locator('#banner').evaluate(el => el.clientHeight);
    await page.evaluate((height) => {
      window.scrollTo(0, height + 100);
    }, bannerHeight);
    await page.waitForTimeout(300);

    const bgColor = await page.locator('#navbar').evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });
    // 非透明背景（不是 transparent 或 rgba(0,0,0,0)）
    expect(bgColor).not.toBe('transparent');
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('非首页（/archives/）navbar 默认没有 transparent 类', async ({ page }) => {
    await page.goto('/archives/');
    await page.waitForLoadState('networkidle');

    const hasTransparent = await page.locator('#navbar').evaluate(el => {
      return el.classList.contains('transparent');
    });
    expect(hasTransparent).toBe(false);
  });
});
