import { test, expect } from '@playwright/test';
import { SPECIAL_PAGES } from '../helpers/test-config';

test.describe('特殊页面可访问性验证', () => {
  for (const pagePath of SPECIAL_PAGES) {
    test(`${pagePath} 返回 200 状态码`, async ({ page }) => {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBe(200);
    });
  }

  test.describe('各页面基本内容验证', () => {
    test('首页（/）有文章列表内容', async ({ page }) => {
      await page.goto('/');
      const articleLinks = page.locator('a[href*="/pages/"]');
      const count = await articleLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('博客目录（/blog/）有文章内容', async ({ page }) => {
      await page.goto('/blog/');
      const content = await page.textContent('body');
      expect(content!.length).toBeGreaterThan(100);
    });

    test('笔记目录（/notes/）有文章内容', async ({ page }) => {
      await page.goto('/notes/');
      const content = await page.textContent('body');
      expect(content!.length).toBeGreaterThan(100);
    });

    test('作品页（/works/）有内容', async ({ page }) => {
      await page.goto('/works/');
      const content = await page.textContent('body');
      expect(content!.length).toBeGreaterThan(50);
    });

    test('归档页（/archives/）有文章列表', async ({ page }) => {
      await page.goto('/archives/');
      const articleLinks = page.locator('a[href*="/pages/"]');
      const count = await articleLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('分类页（/categories/）有分类内容', async ({ page }) => {
      await page.goto('/categories/');
      const content = await page.textContent('body');
      expect(content!.length).toBeGreaterThan(50);
    });

    test('标签页（/tags/）有标签内容', async ({ page }) => {
      await page.goto('/tags/');
      const content = await page.textContent('body');
      expect(content!.length).toBeGreaterThan(50);
    });
  });

  test.describe('页面基本结构', () => {
    for (const pagePath of SPECIAL_PAGES) {
      test(`${pagePath} 有 <title> 标签`, async ({ page }) => {
        await page.goto(pagePath);
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
      });

      test(`${pagePath} 有 <h1> 或 <nav> 元素（基本结构存在）`, async ({ page }) => {
        await page.goto(pagePath);
        const h1Count = await page.locator('h1').count();
        const navCount = await page.locator('nav').count();
        // 至少有一个结构性元素
        expect(h1Count + navCount).toBeGreaterThan(0);
      });
    }
  });
});
