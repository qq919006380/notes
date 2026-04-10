import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/test-config';

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('页脚有 3 个社交图标', async ({ page }) => {
    const icons = page.locator('.social-icons a');
    await expect(icons).toHaveCount(3);
  });

  test('邮件图标存在且链接正确', async ({ page }) => {
    const emailLink = page.locator('.social-icons a[href^="mailto:"]');
    await expect(emailLink).toBeAttached();
  });

  test('GitHub 图标存在', async ({ page }) => {
    // iconfont <i> 元素依赖外部字体，用 toBeAttached() 代替 toBeVisible()
    const githubIcon = page.locator('.social-icons a .icon-github');
    await expect(githubIcon).toBeAttached();
  });

  test('掘金图标存在', async ({ page }) => {
    // iconfont <i> 元素依赖外部字体，用 toBeAttached() 代替 toBeVisible()
    const juejinIcon = page.locator('.social-icons a .icon-juejin');
    await expect(juejinIcon).toBeAttached();
  });

  test('版权信息包含"夏天夏"', async ({ page }) => {
    const copyright = await page.locator('.copyright').textContent();
    expect(copyright).toContain('夏天夏');
  });

  test('版权信息包含"MIT License"', async ({ page }) => {
    const copyright = await page.locator('.copyright').innerHTML();
    expect(copyright).toContain('MIT License');
  });

  test('年份范围从 2019 年开始', async ({ page }) => {
    const copyright = await page.locator('.copyright').textContent();
    expect(copyright).toContain('2019');
  });

  test('页脚顶部有边框', async ({ page }) => {
    const borderTop = await page.locator('.footer').evaluate(
      (el) => window.getComputedStyle(el).borderTopWidth
    );
    expect(parseFloat(borderTop)).toBeGreaterThan(0);
  });
});
