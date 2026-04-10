import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/test-config';

test.describe('Home Banner', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Banner 高度为 100vh', async ({ page }) => {
    const [bannerHeight, viewportHeight] = await page.evaluate(() => {
      const banner = document.querySelector('#banner') as HTMLElement;
      return [banner?.clientHeight ?? 0, window.innerHeight];
    });
    expect(Math.abs(bannerHeight - viewportHeight)).toBeLessThan(5);
  });

  test('Banner 有 background-image 属性', async ({ page }) => {
    const bgImage = await page.locator('#banner').evaluate(
      (el) => window.getComputedStyle(el).backgroundImage
    );
    expect(bgImage).not.toBe('none');
    expect(bgImage).toContain('url(');
  });

  test('Banner 包含 #banner-arrow 滚动箭头元素', async ({ page }) => {
    await expect(page.locator('#banner-arrow')).toBeVisible();
  });

  test('Banner 包含 #banner-description 描述区域', async ({ page }) => {
    await expect(page.locator('#banner-description')).toBeVisible();
  });

  test('#banner-description 包含 span 子元素', async ({ page }) => {
    const spans = page.locator('#banner-description span');
    const count = await spans.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('Banner 包含 #banner-color 颜色遮罩层', async ({ page }) => {
    const bannerColor = page.locator('#banner-color');
    await expect(bannerColor).toBeAttached();
  });

  test('.typed 元素有 animation 动画属性', async ({ page }) => {
    const animName = await page.locator('.typed').evaluate(
      (el) => window.getComputedStyle(el).animationName
    );
    expect(animName).not.toBe('none');
  });

  test('Banner 展示站点标题 "夏天夏"', async ({ page }) => {
    const title = await page.locator('.banner-title').textContent();
    expect(title?.trim()).toContain('夏天夏');
  });
});
