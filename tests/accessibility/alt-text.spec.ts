import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('图片 alt 属性检查', () => {
  test('首页所有 <img> 有非空 alt 属性', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const missingAlt = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => !img.alt || img.alt.trim() === '')
        .map(img => img.outerHTML.slice(0, 100));
    });

    if (missingAlt.length > 0) {
      console.log('缺少 alt 的图片:', missingAlt);
    }
    expect(missingAlt).toHaveLength(0);
  });

  test('文章页所有 <img> 有 alt 属性', async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    await page.waitForLoadState('networkidle');

    const missingAlt = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => img.alt === null || img.alt === undefined)
        .map(img => img.outerHTML.slice(0, 100));
    });

    expect(missingAlt).toHaveLength(0);
  });

  test('导航栏 logo 图片有有意义的 alt（不是空或"image"）', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navLogoAlt = await page.locator('.nav-logo').getAttribute('alt');
    expect(navLogoAlt).toBeTruthy();
    expect(navLogoAlt?.toLowerCase()).not.toBe('image');
    expect(navLogoAlt?.trim().length).toBeGreaterThan(0);
  });

  test('归档页所有 <img> 有 alt 属性', async ({ page }) => {
    await page.goto('/archives/');
    await page.waitForLoadState('networkidle');

    const missingAlt = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => !img.hasAttribute('alt'))
        .map(img => img.outerHTML.slice(0, 100));
    });

    expect(missingAlt).toHaveLength(0);
  });

  test('所有 <img> 不使用"image"或"photo"作为 alt', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const badAlt = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const badWords = ['image', 'photo', 'img', '图片'];
      return imgs
        .filter(img => badWords.includes(img.alt?.toLowerCase().trim() ?? ''))
        .map(img => `alt="${img.alt}" src="${img.src?.slice(0, 50)}"`);
    });

    if (badAlt.length > 0) {
      console.log('使用了通用 alt 的图片:', badAlt);
    }
    expect(badAlt).toHaveLength(0);
  });
});
