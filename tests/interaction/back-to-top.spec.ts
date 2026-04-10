import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('Back To Top 返回顶部按钮', () => {
  test.beforeEach(async ({ page }) => {
    // 使用有内容的文章页面
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    await page.waitForLoadState('networkidle');
  });

  test('#back-to-top 按钮存在', async ({ page }) => {
    const btn = page.locator('#back-to-top');
    await expect(btn).toBeAttached();
  });

  test('页面顶部时按钮隐藏（display: none）', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const display = await page.locator('#back-to-top').evaluate(el => {
      return (el as HTMLElement).style.display;
    });
    expect(display).toBe('none');
  });

  test('滚动超过 300px 后按钮出现（display: flex）', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(300);

    const display = await page.locator('#back-to-top').evaluate(el => {
      return (el as HTMLElement).style.display;
    });
    expect(display).toBe('flex');
  });

  test('点击返回顶部按钮后页面滚动到顶部', async ({ page }) => {
    // 先滚动到中间
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    // 点击按钮
    await page.locator('#back-to-top').click();

    // 等待平滑滚动完成
    await page.waitForTimeout(800);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(50);
  });

  test('按钮有固定定位', async ({ page }) => {
    const position = await page.locator('#back-to-top').evaluate(el => {
      return window.getComputedStyle(el).position;
    });
    expect(position).toBe('fixed');
  });
});
