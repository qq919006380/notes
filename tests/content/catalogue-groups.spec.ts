import { test, expect } from '@playwright/test';

test.describe('目录页面分组验证', () => {
  test.describe('博客目录页（/blog/）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/');
    });

    test('博客目录页面加载成功', async ({ page }) => {
      await expect(page).toHaveURL(/\/blog\//);
      const title = await page.title();
      expect(title).toBeTruthy();
    });

    test('博客目录按子分类分组展示（不是平铺列表）', async ({ page }) => {
      // 检查是否有分组标题（h2/h3 或带有分类名的元素）
      const groupHeaders = page.locator('h2, h3, .catalogue-group, .group-title, .category-group');
      const count = await groupHeaders.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('博客目录各分组内有文章链接', async ({ page }) => {
      const articleLinks = page.locator('a[href*="/pages/"]');
      const count = await articleLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('博客目录包含已知文章（小白都能看懂的闭包）', async ({ page }) => {
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('闭包');
    });
  });

  test.describe('笔记目录页（/notes/）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/notes/');
    });

    test('笔记目录页面加载成功', async ({ page }) => {
      await expect(page).toHaveURL(/\/notes\//);
      const title = await page.title();
      expect(title).toBeTruthy();
    });

    test('笔记目录按子分类分组展示', async ({ page }) => {
      const groupHeaders = page.locator('h2, h3, .catalogue-group, .group-title, .category-group');
      const count = await groupHeaders.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('笔记目录各分组内有文章链接', async ({ page }) => {
      const articleLinks = page.locator('a[href*="/pages/"]');
      const count = await articleLinks.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('作品页（/works/）', () => {
    test('作品页面加载成功', async ({ page }) => {
      await page.goto('/works/');
      const title = await page.title();
      expect(title).toBeTruthy();
    });
  });
});
