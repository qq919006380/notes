import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('Open Graph 标签验证', () => {
  test.describe('文章页面 OG 标签', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    });

    test('文章页面有 og:title', async ({ page }) => {
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
      expect(ogTitle!.length).toBeGreaterThan(0);
    });

    test('文章页面有 og:description', async ({ page }) => {
      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDesc).toBeTruthy();
      expect(ogDesc!.length).toBeGreaterThan(0);
    });

    test('文章页面有 og:url', async ({ page }) => {
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      expect(ogUrl).toBeTruthy();
      expect(ogUrl).toContain(SAMPLE_SLUGS[0]);
    });

    test('文章页面 og:type = "article"', async ({ page }) => {
      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
      expect(ogType).toBe('article');
    });
  });

  test.describe('多篇文章的 OG 标签', () => {
    for (const slug of SAMPLE_SLUGS.slice(0, 3)) {
      test(`文章 ${slug} 有完整的 OG 标签`, async ({ page }) => {
        await page.goto(`/pages/${slug}/`);

        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
        expect(ogTitle).toBeTruthy();

        const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
        expect(ogDesc).toBeTruthy();

        const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
        expect(ogUrl).toBeTruthy();

        const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
        expect(ogType).toBeTruthy();
      });
    }
  });

  test.describe('首页 OG 标签', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('首页 og:type = "website"', async ({ page }) => {
      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
      expect(ogType).toBe('website');
    });

    test('首页有 og:title', async ({ page }) => {
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
    });

    test('首页有 og:description', async ({ page }) => {
      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDesc).toBeTruthy();
    });
  });
});
