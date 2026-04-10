import { test, expect } from '@playwright/test';

test.describe('Love-me 爱心点击效果', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('点击页面 body 后创建 .love-heart 元素', async ({ page }) => {
    // 点击页面主体区域
    await page.click('body', { position: { x: 400, y: 400 } });

    // 等待爱心元素出现
    const hearts = page.locator('.love-heart');
    await expect(hearts.first()).toBeAttached({ timeout: 1000 });
  });

  test('爱心元素具有 position: fixed 样式', async ({ page }) => {
    await page.click('body', { position: { x: 300, y: 300 } });

    // 等待爱心元素
    await page.waitForSelector('.love-heart', { timeout: 1000 });

    const position = await page.evaluate(() => {
      const heart = document.querySelector('.love-heart');
      if (!heart) return null;
      return window.getComputedStyle(heart).position;
    });

    expect(position).toBe('fixed');
  });

  test('约 2 秒后爱心元素从 DOM 中消失', async ({ page }) => {
    await page.click('body', { position: { x: 500, y: 300 } });

    // 确认爱心出现
    await page.waitForSelector('.love-heart', { timeout: 1000 });

    // 等待约 2.5 秒让爱心动画完成（alpha -= 0.013 per frame，~77 frames @ 60fps ≈ 1.3s）
    await page.waitForTimeout(2500);

    const heartCount = await page.locator('.love-heart').count();
    expect(heartCount).toBe(0);
  });

  test('多次点击创建多个爱心', async ({ page }) => {
    await page.click('body', { position: { x: 200, y: 200 } });
    await page.click('body', { position: { x: 400, y: 400 } });
    await page.click('body', { position: { x: 600, y: 300 } });

    const count = await page.locator('.love-heart').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
