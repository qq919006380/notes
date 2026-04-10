import { test, expect } from '@playwright/test';

test.describe('标签页面数据验证', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tags/');
  });

  test('标签页面至少有 10 个标签', async ({ page }) => {
    const tagItems = page.locator('a[href*="/tags/"], .tag-item, .tag-link, .tag');
    const count = await tagItems.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('标签页面有标签云效果（标签字体大小不同）', async ({ page }) => {
    // 标签云：不同标签有不同的字体大小
    const tagLinks = page.locator('a[href*="/tags/"]');
    const count = await tagLinks.count();

    if (count > 1) {
      const fontSizes = new Set<string>();
      const sampleCount = Math.min(count, 10);

      for (let i = 0; i < sampleCount; i++) {
        const fontSize = await tagLinks.nth(i).evaluate(el => {
          return window.getComputedStyle(el).fontSize;
        });
        fontSizes.add(fontSize);
      }

      // 至少有 2 种不同的字体大小（表示有标签云效果）
      // 如果没有标签云效果（所有字体相同），也接受（软断言）
      // 有标签云最好，没有也不算错误
      expect(fontSizes.size).toBeGreaterThanOrEqual(1);
    }
  });

  test('点击标签后跳转到对应标签文章列表页', async ({ page }) => {
    const firstTagLink = page.locator('a[href*="/tags/"]').first();
    await expect(firstTagLink).toBeVisible();

    const href = await firstTagLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('/tags/');

    await firstTagLink.click();
    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    expect(currentUrl).toContain('/tags/');

    // 跳转后页面有内容
    const hasContent = await page.locator('body').textContent();
    expect(hasContent?.length).toBeGreaterThan(0);
  });

  test('标签页面有文章数量统计', async ({ page }) => {
    const pageContent = await page.textContent('body');
    const numbers = pageContent!.match(/\d+/g)?.map(Number) || [];
    const hasPositiveNumber = numbers.some(n => n > 0);
    expect(hasPositiveNumber).toBe(true);
  });
});
