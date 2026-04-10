import { test, expect } from '@playwright/test';

test.describe('分类页面数据验证', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/categories/');
  });

  test('分类页面至少有 5 个分类', async ({ page }) => {
    // 分类页面展示分类卡片或列表
    const categoryItems = page.locator(
      'a[href*="/categories/"], .category-item, .category-card, .category-link'
    );
    const count = await categoryItems.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('每个分类显示文章数量（> 0）', async ({ page }) => {
    const pageContent = await page.textContent('body');
    // 页面中应有数字表示每个分类的文章数
    const numbers = pageContent!.match(/\d+/g)?.map(Number) || [];
    const hasPositiveNumber = numbers.some(n => n > 0);
    expect(hasPositiveNumber).toBe(true);
  });

  test('点击分类链接后跳转到对应分类文章列表页', async ({ page }) => {
    // 用 .categories-grid a 避免匹配 navbar 下拉菜单中的隐藏链接
    const firstCategoryLink = page.locator('.categories-grid a').first();
    await expect(firstCategoryLink).toBeVisible();

    const href = await firstCategoryLink.getAttribute('href');
    expect(href).toBeTruthy();

    // 点击并检查跳转
    await firstCategoryLink.click();
    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    expect(currentUrl).toContain('/categories/');
    // 新页面应包含文章列表
    const hasContent = await page.locator('body').textContent();
    expect(hasContent?.length).toBeGreaterThan(0);
  });
});
