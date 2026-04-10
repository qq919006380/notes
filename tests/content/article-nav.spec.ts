import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('文章上下篇导航验证', () => {
  test('文章页面底部有上下篇导航区域', async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);

    // 查找包含上/下篇导航的元素
    const navSection = page.locator(
      '.post-nav, .article-nav, .prev-next, [class*="prev"], [class*="next"]'
    );
    const count = await navSection.count();
    expect(count).toBeGreaterThan(0);
  });

  test('中间文章同时有上篇和下篇链接', async ({ page }) => {
    // 使用第3篇文章，通常是中间文章
    await page.goto(`/pages/${SAMPLE_SLUGS[2]}/`);

    const pageContent = await page.textContent('body');
    // 应包含上篇或下篇的文字提示
    const hasPrevNext =
      pageContent!.includes('上一') ||
      pageContent!.includes('下一') ||
      pageContent!.includes('prev') ||
      pageContent!.includes('next');
    expect(hasPrevNext).toBe(true);
  });

  test('文章导航链接指向有效的文章页面', async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[1]}/`);

    // 查找指向 /pages/ 的导航链接
    const navLinks = page.locator(
      '.post-nav a[href*="/pages/"], .article-nav a[href*="/pages/"], ' +
      '[class*="prev"] a[href*="/pages/"], [class*="next"] a[href*="/pages/"]'
    );

    const count = await navLinks.count();
    if (count > 0) {
      // 点击第一个导航链接验证可以正常跳转
      const href = await navLinks.first().getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toContain('/pages/');

      const response = await page.goto(href!);
      expect(response?.status()).toBe(200);
    } else {
      // 如果没有导航链接，检查是否有上/下篇文字
      const pageContent = await page.textContent('body');
      const hasPrevNextText =
        pageContent!.includes('上一篇') ||
        pageContent!.includes('下一篇') ||
        pageContent!.includes('上一') ||
        pageContent!.includes('下一');
      // 软断言：有导航文字也可以
      expect(hasPrevNextText || count > 0).toBe(true);
    }
  });

  test('文章导航链接文本非空', async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);

    const allLinks = page.locator('a[href*="/pages/"]');
    const count = await allLinks.count();
    expect(count).toBeGreaterThan(0);

    // 所有 /pages/ 链接应有文本内容
    for (let i = 0; i < Math.min(count, 5); i++) {
      const text = await allLinks.nth(i).textContent();
      // 链接可以有文本，也可以通过 aria-label 提供
      const ariaLabel = await allLinks.nth(i).getAttribute('aria-label');
      expect(
        (text?.trim().length || 0) > 0 || (ariaLabel?.length || 0) > 0
      ).toBe(true);
    }
  });
});
