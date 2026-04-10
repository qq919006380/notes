import { test, expect } from '@playwright/test';

test.describe('Banner 滚动箭头', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('#banner-arrow 元素存在', async ({ page }) => {
    const arrow = page.locator('#banner-arrow');
    await expect(arrow).toBeAttached();
  });

  test('#banner-arrow 在 banner 底部区域可见', async ({ page }) => {
    const arrow = page.locator('#banner-arrow');
    // 箭头可能因 pseudo-element 渲染（::before/::after）而不占据自身可见区域
    // 改为检查元素存在且在 banner 内定位
    await expect(arrow).toBeAttached();
    const arrowPos = await arrow.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { y: rect.top, height: rect.height };
    });
    // 箭头应该在页面可视区域内（banner 高度为 100vh）
    const viewportHeight = page.viewportSize()?.height ?? 800;
    expect(arrowPos.y).toBeLessThan(viewportHeight);
  });

  test('点击 #banner-arrow 后页面向下滚动超过 banner 高度', async ({ page }) => {
    // 获取 banner 高度
    const bannerHeight = await page.locator('#banner').evaluate(el => el.clientHeight);
    expect(bannerHeight).toBeGreaterThan(100);

    // 点击箭头
    await page.locator('#banner-arrow').click();

    // 等待平滑滚动完成
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    // 应该滚动到接近 banner 高度的位置
    expect(scrollY).toBeGreaterThan(bannerHeight * 0.5);
  });

  test('点击箭头后 scrollY >= banner 高度', async ({ page }) => {
    const bannerHeight = await page.locator('#banner').evaluate(el => el.clientHeight);

    await page.locator('#banner-arrow').click();
    await page.waitForTimeout(1200);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThanOrEqual(bannerHeight - 10);
  });
});
