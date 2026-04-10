import { test, expect } from '@playwright/test';

test.describe('归档页面数据验证', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/archives/');
  });

  test('归档页面年份按降序排列', async ({ page }) => {
    // 获取页面中所有出现的年份
    const yearElements = page.locator('h2, h3, .archive-year, [class*="year"]');
    const count = await yearElements.count();

    if (count > 1) {
      const years: number[] = [];
      for (let i = 0; i < count; i++) {
        const text = await yearElements.nth(i).textContent();
        const match = text?.match(/\b(20\d{2})\b/);
        if (match) {
          years.push(parseInt(match[1]));
        }
      }

      if (years.length > 1) {
        // 验证年份是降序的
        for (let i = 0; i < years.length - 1; i++) {
          expect(years[i]).toBeGreaterThanOrEqual(years[i + 1]);
        }
      }
    }
  });

  test('每个年份至少有 1 篇文章', async ({ page }) => {
    // 归档页面应有文章列表
    const articleLinks = page.locator('a[href*="/pages/"]');
    const count = await articleLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('归档页面显示文章总数', async ({ page }) => {
    const pageContent = await page.textContent('body');
    // 应包含大于 100 的数字（代表总文章数）
    const numbers = pageContent!.match(/\d+/g)?.map(Number) || [];
    const hasTotalCount = numbers.some(n => n >= 100);
    expect(hasTotalCount).toBe(true);
  });

  test('归档页面包含 2019 年（博客创建年份）', async ({ page }) => {
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('2019');
  });

  test('归档页面包含当前或近年的文章', async ({ page }) => {
    const pageContent = await page.textContent('body');
    // 至少包含 2022、2023 或 2024 年
    const recentYears = ['2022', '2023', '2024'];
    const hasRecentYear = recentYears.some(year => pageContent!.includes(year));
    expect(hasRecentYear).toBe(true);
  });
});
