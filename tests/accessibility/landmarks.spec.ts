import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('语义标签（Landmark Elements）', () => {
  const pages = [
    { name: '首页', path: '/' },
    { name: '文章页', path: `/pages/${SAMPLE_SLUGS[0]}/` },
    { name: '归档页', path: '/archives/' },
    { name: '分类页', path: '/categories/' },
  ];

  for (const { name, path } of pages) {
    test(`${name}有 <nav> 元素`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const navCount = await page.locator('nav').count();
      expect(navCount).toBeGreaterThan(0);
    });

    test(`${name}有 <main> 元素`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const mainCount = await page.locator('main').count();
      expect(mainCount).toBe(1); // 有且仅有 1 个 main
    });

    test(`${name}有 <footer> 元素`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const footerCount = await page.locator('footer').count();
      expect(footerCount).toBeGreaterThan(0);
    });

    test(`${name}没有重复的 <main> 元素`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const mainCount = await page.locator('main').count();
      expect(mainCount).toBeLessThanOrEqual(1);
    });
  }

  test('导航 <nav> 有 aria-label 或包含有意义的链接', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navElements = page.locator('nav');
    const count = await navElements.count();
    expect(count).toBeGreaterThan(0);

    // 检查导航包含链接
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('页面有适当的 header/banner landmark', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // header 元素或 role="banner"
    const headerCount = await page.locator('header, [role="banner"]').count();
    expect(headerCount).toBeGreaterThan(0);
  });
});
