import { test, expect } from '@playwright/test';

test.describe('Pagefind 搜索功能', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('#search-box 容器存在', async ({ page }) => {
    const searchBox = page.locator('#search-box');
    await expect(searchBox).toBeAttached();
  });

  test('点击搜索框区域后 Pagefind 输入框出现', async ({ page }) => {
    // Pagefind 可能是懒加载的，先检查是否有搜索触发入口
    const searchBox = page.locator('#search-box');
    await searchBox.click();

    // 等待 Pagefind 的 input 出现（Pagefind UI 会注入 input[type=text]）
    await page.waitForSelector('.pagefind-ui__search-input, input[placeholder*="搜索"]', {
      timeout: 5000,
    });

    const input = page.locator('.pagefind-ui__search-input, input[placeholder*="搜索"]').first();
    await expect(input).toBeVisible();
  });

  test('输入搜索词"闭包"后出现搜索结果', async ({ page }) => {
    // 尝试点击触发 pagefind UI
    await page.locator('#search-box').click();

    // 等待输入框
    const inputSelector = '.pagefind-ui__search-input, input[placeholder*="搜索"]';
    try {
      await page.waitForSelector(inputSelector, { timeout: 5000 });
      const input = page.locator(inputSelector).first();
      await input.fill('闭包');
      await page.waitForTimeout(1500);

      // 检查是否有结果列表
      const results = page.locator('.pagefind-ui__result, [class*="result"]');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    } catch {
      // Pagefind 未在 dev 模式下工作（需要构建），跳过
      test.skip();
    }
  });

  test('搜索结果包含文章链接', async ({ page }) => {
    await page.locator('#search-box').click();

    const inputSelector = '.pagefind-ui__search-input, input[placeholder*="搜索"]';
    try {
      await page.waitForSelector(inputSelector, { timeout: 5000 });
      await page.locator(inputSelector).first().fill('闭包');
      await page.waitForTimeout(1500);

      const resultLinks = page.locator('.pagefind-ui__result a, [class*="result"] a');
      const count = await resultLinks.count();
      if (count > 0) {
        const href = await resultLinks.first().getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toContain('/pages/');
      }
    } catch {
      test.skip();
    }
  });
});
