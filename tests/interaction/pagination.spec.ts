import { test, expect } from '@playwright/test';

test.describe('Pagination 分页', () => {
  test('首页有分页组件或下一页链接', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 查找分页相关元素
    const pagination = page.locator(
      '[class*="pagination"], [class*="pager"], nav[aria-label*="page"], .page-nav'
    );
    const nextLink = page.locator('a[href*="/page/"], a:has-text("下一页"), a:has-text("Next")');

    const paginationCount = await pagination.count();
    const nextLinkCount = await nextLink.count();

    // 有分页组件或下一页链接之一
    expect(paginationCount + nextLinkCount).toBeGreaterThan(0);
  });

  test('点击"下一页"或第 2 页链接后 URL 变为 /page/2/', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 查找到第 2 页的链接
    const page2Link = page.locator('a[href="/page/2/"], a[href*="/page/2"]').first();
    const nextLink = page.locator('a:has-text("下一页"), a[rel="next"]').first();

    const page2Count = await page2Link.count();
    const nextCount = await nextLink.count();

    if (page2Count > 0) {
      await page2Link.click();
    } else if (nextCount > 0) {
      await nextLink.click();
    } else {
      test.skip();
      return;
    }

    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/page/2');
  });

  test('第 2 页文章与第 1 页不同', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 获取第 1 页的文章链接 URL（不同页面的文章 slug 不同）
    const page1Hrefs = await page.locator('.post-item-title a').evaluateAll(
      (els) => els.map(el => el.getAttribute('href'))
    );

    // 访问第 2 页
    const page2Url = '/page/2/';
    await page.goto(page2Url);
    await page.waitForLoadState('networkidle');

    // 检查是否为 404 或有内容
    const is404 = await page.locator('text=404, text=Not Found').count();
    if (is404 > 0) {
      test.skip();
      return;
    }

    const page2Hrefs = await page.locator('.post-item-title a').evaluateAll(
      (els) => els.map(el => el.getAttribute('href'))
    );

    if (page1Hrefs.length > 0 && page2Hrefs.length > 0) {
      // 两页的文章 URL 应该完全不同
      const hasOverlap = page1Hrefs.some(h => page2Hrefs.includes(h));
      expect(hasOverlap).toBe(false);
    }
  });

  test('第 2 页有"上一页"链接指向首页', async ({ page }) => {
    await page.goto('/page/2/');
    await page.waitForLoadState('networkidle');

    // 检查是否是 404
    const url = page.url();
    if (url.includes('404') || url === 'http://localhost:4323/') {
      test.skip();
      return;
    }

    const prevLink = page.locator('a:has-text("上一页"), a[rel="prev"], a[href="/"]').first();
    const count = await prevLink.count();
    expect(count).toBeGreaterThan(0);
  });
});
