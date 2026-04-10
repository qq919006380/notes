import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('Reading Progress 阅读进度条', () => {
  const articleUrl = `/pages/${SAMPLE_SLUGS[0]}/`;

  test.beforeEach(async ({ page }) => {
    await page.goto(articleUrl);
    await page.waitForLoadState('networkidle');
  });

  test('#reading-progress 元素存在于文章页', async ({ page }) => {
    const bar = page.locator('#reading-progress');
    await expect(bar).toBeAttached();
  });

  test('页面顶部时进度条宽度为 0%', async ({ page }) => {
    // 确保在顶部
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const width = await page.locator('#reading-progress').evaluate(el => {
      return (el as HTMLElement).style.width;
    });
    // JS 未触发 scroll 时 style.width 为空字符串（CSS 设置了 width:0）
    expect(width).toMatch(/^(0%|0|)$/);
  });

  test('滚动到 50% 时进度条宽度约为 50%（误差 ±15%）', async ({ page }) => {
    // 滚动到中间
    await page.evaluate(() => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      window.scrollTo(0, scrollHeight * 0.5);
    });
    await page.waitForTimeout(300);

    const widthStr = await page.locator('#reading-progress').evaluate(el => {
      return (el as HTMLElement).style.width;
    });
    const width = parseFloat(widthStr);
    expect(width).toBeGreaterThan(35);
    expect(width).toBeLessThan(65);
  });

  test('滚动到底部时进度条宽度接近 100%', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForTimeout(300);

    const widthStr = await page.locator('#reading-progress').evaluate(el => {
      return (el as HTMLElement).style.width;
    });
    const width = parseFloat(widthStr);
    expect(width).toBeGreaterThan(90);
  });

  test('进度条有固定定位样式', async ({ page }) => {
    const position = await page.locator('#reading-progress').evaluate(el => {
      return window.getComputedStyle(el).position;
    });
    expect(position).toBe('fixed');
  });
});
