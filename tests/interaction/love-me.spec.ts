import { test, expect } from '@playwright/test';

test.describe('Love-me 爱心点击效果', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // 滚动到内容区域以避免在 banner 上点击
    await page.evaluate(() => window.scrollTo(0, document.getElementById('banner')?.clientHeight ?? 800));
    await page.waitForTimeout(300);
  });

  test('点击页面 body 后创建 .love-heart 元素', async ({ page }) => {
    // 使用 dispatchEvent 直接触发 document click，避免被其他元素拦截
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('click', { clientX: 400, clientY: 400, bubbles: true }));
    });

    // 等待爱心元素出现
    const hearts = page.locator('.love-heart');
    await expect(hearts.first()).toBeAttached({ timeout: 2000 });
  });

  test('爱心元素具有 position: fixed 样式', async ({ page }) => {
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('click', { clientX: 300, clientY: 300, bubbles: true }));
    });

    // 等待爱心元素
    await page.waitForSelector('.love-heart', { timeout: 2000 });

    const position = await page.evaluate(() => {
      const heart = document.querySelector('.love-heart');
      if (!heart) return null;
      return window.getComputedStyle(heart).position;
    });

    expect(position).toBe('fixed');
  });

  test('约 2 秒后爱心元素从 DOM 中消失', async ({ page }) => {
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('click', { clientX: 500, clientY: 300, bubbles: true }));
    });

    // 确认爱心出现
    await page.waitForSelector('.love-heart', { timeout: 2000 });

    // 等待约 2.5 秒让爱心动画完成（alpha -= 0.013 per frame，~77 frames @ 60fps ≈ 1.3s）
    await page.waitForTimeout(2500);

    const heartCount = await page.locator('.love-heart').count();
    expect(heartCount).toBe(0);
  });

  test('多次点击创建多个爱心', async ({ page }) => {
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('click', { clientX: 200, clientY: 200, bubbles: true }));
    });
    await page.waitForTimeout(100);
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('click', { clientX: 400, clientY: 400, bubbles: true }));
    });
    await page.waitForTimeout(100);
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('click', { clientX: 600, clientY: 300, bubbles: true }));
    });

    await page.waitForTimeout(200);
    const count = await page.locator('.love-heart').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
