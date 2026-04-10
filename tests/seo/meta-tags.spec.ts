import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS, SITE_NAME } from '../helpers/test-config';

test.describe('Meta 标签验证', () => {
  test.describe('首页', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('首页有 <title> 标签', async ({ page }) => {
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });

    test('首页 description 包含"前端"', async ({ page }) => {
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description).toContain('前端');
    });

    test('首页有 theme-color meta 标签', async ({ page }) => {
      const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
      expect(themeColor).toBeTruthy();
    });
  });

  test.describe('文章页面', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    });

    test('文章页面标题格式为"{文章标题} | 夏天夏"', async ({ page }) => {
      const title = await page.title();
      expect(title).toContain(`| ${SITE_NAME}`);
      // 格式应为 "文章标题 | 夏天夏"
      expect(title).toMatch(/.+\s*\|\s*夏天夏/);
    });

    test('文章页面有 meta description', async ({ page }) => {
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(0);
    });

    test('文章页面有 theme-color meta 标签', async ({ page }) => {
      const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
      expect(themeColor).toBeTruthy();
    });
  });

  test.describe('归档页面', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/archives/');
    });

    test('归档页面有 <title> 标签', async ({ page }) => {
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });

    test('归档页面有 meta description', async ({ page }) => {
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });
  });

  test.describe('分类页面', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/categories/');
    });

    test('分类页面有 <title> 标签', async ({ page }) => {
      const title = await page.title();
      expect(title).toBeTruthy();
    });

    test('分类页面有 meta description', async ({ page }) => {
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });
  });

  test.describe('标签页面', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/tags/');
    });

    test('标签页面有 <title> 标签', async ({ page }) => {
      const title = await page.title();
      expect(title).toBeTruthy();
    });

    test('标签页面有 meta description', async ({ page }) => {
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });
  });

  test.describe('博客目录页面', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/');
    });

    test('博客目录页面有 <title> 标签', async ({ page }) => {
      const title = await page.title();
      expect(title).toBeTruthy();
    });

    test('博客目录页面有 meta description', async ({ page }) => {
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });
  });
});
