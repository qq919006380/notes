import { test, expect } from '@playwright/test';

test.describe('Time Greeting 时间问候弹窗', () => {
  test('访问首页 1.5 秒后出现 .index-tip 元素', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // time-greeting.js 在 DOMContentLoaded 后延迟 1000ms 显示
    await page.waitForSelector('.index-tip', { timeout: 3000 });

    const tip = page.locator('.index-tip');
    await expect(tip).toBeAttached();
  });

  test('.index-tip 包含时间相关的问候文字', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.index-tip', { timeout: 3000 });

    const tipText = await page.locator('.index-tip').textContent();
    // 所有问候语都包含"现在是"
    expect(tipText).toContain('现在是');
  });

  test('访问 /archives/ 页面不出现 .index-tip', async ({ page }) => {
    await page.goto('/archives/');
    await page.waitForLoadState('networkidle');

    // 等待 2 秒确认没有 tip 出现
    await page.waitForTimeout(2000);

    const tipCount = await page.locator('.index-tip').count();
    expect(tipCount).toBe(0);
  });

  test('问候语内容与时间段匹配', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.index-tip', { timeout: 3000 });

    const hours = new Date().getHours();
    const tipText = await page.locator('.index-tip').textContent() ?? '';

    if (hours >= 6 && hours < 12) {
      expect(tipText).toContain('早上好');
    } else if (hours >= 12 && hours < 16) {
      expect(tipText).toContain('下午好');
    } else if (hours >= 16 && hours < 19) {
      expect(tipText).toContain('到黄昏了');
    } else if (hours >= 19 && hours < 24) {
      expect(tipText).toContain('晚上好');
    } else {
      expect(tipText).toContain('别再熬夜了');
    }
  });
});
