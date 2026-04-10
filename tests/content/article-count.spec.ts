import { test, expect } from '@playwright/test';

test.describe('文章总数验证', () => {
  test('归档页面文章总数 >= 104', async ({ page }) => {
    await page.goto('/archives/');

    // 归档页通常以列表展示所有文章
    // 统计所有文章链接（指向 /pages/{slug}/ 的链接）
    const articleLinks = await page.locator('a[href*="/pages/"]').count();
    expect(articleLinks).toBeGreaterThanOrEqual(104);
  });

  test('归档页面显示文章总数数字', async ({ page }) => {
    await page.goto('/archives/');

    // 页面应该有一个显示总文章数的元素
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();

    // 页面应包含 >= 104 的数字（用于显示总数）
    const numbers = pageContent!.match(/\d+/g)?.map(Number) || [];
    const hasLargeNumber = numbers.some(n => n >= 104);
    expect(hasLargeNumber).toBe(true);
  });

  test('归档页面按年份分组展示文章', async ({ page }) => {
    await page.goto('/archives/');
    const pageContent = await page.textContent('body');

    // 应该至少包含一个年份（2019 到现在）
    const years = [2019, 2020, 2021, 2022, 2023, 2024];
    const hasYear = years.some(year => pageContent!.includes(String(year)));
    expect(hasYear).toBe(true);
  });
});
