import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/test-config';

test.describe('Right Sidebar', () => {
  test.beforeEach(async ({ page }) => {
    // 目录页展示右侧栏（包含 BloggerBar、SiteInfo、ContactCard）
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`${BASE_URL}/blog/`);
  });

  test('BloggerBar 头像为圆形', async ({ page }) => {
    const avatar = page.locator('.blogger-avatar');
    await expect(avatar).toBeVisible();
    const borderRadius = await avatar.evaluate(
      (el) => window.getComputedStyle(el).borderRadius
    );
    expect(borderRadius).toBe('50%');
  });

  test('BloggerBar 显示站点名称 "夏天夏"', async ({ page }) => {
    const name = page.locator('.blogger-name');
    await expect(name).toBeVisible();
    await expect(name).toContainText('夏天夏');
  });

  test('BloggerBar 显示 slogan "我也不饶岁月"', async ({ page }) => {
    const slogan = page.locator('.blogger-slogan');
    await expect(slogan).toBeVisible();
    await expect(slogan).toContainText('我也不饶岁月');
  });

  test('SiteInfo 显示文章数量（数字 > 0）', async ({ page }) => {
    const siteInfo = page.locator('.site-info');
    await expect(siteInfo).toBeVisible();
    const text = await siteInfo.textContent();
    const match = text?.match(/(\d+)\s*篇/);
    expect(match).not.toBeNull();
    expect(parseInt(match![1])).toBeGreaterThan(0);
  });

  test('SiteInfo 显示运行天数（数字 > 0）', async ({ page }) => {
    const siteInfo = page.locator('.site-info');
    const text = await siteInfo.textContent();
    const match = text?.match(/(\d+)\s*天/);
    expect(match).not.toBeNull();
    expect(parseInt(match![1])).toBeGreaterThan(0);
  });

  test('SiteInfo 显示总字数（包含 k 或 w 单位）', async ({ page }) => {
    const siteInfo = page.locator('.site-info');
    const text = await siteInfo.textContent();
    // 字数格式：xxk字 或 x.xw字 或 纯数字
    expect(text).toMatch(/\d+(\.\d+)?[kw]?\s*字/);
  });

  test('ContactCard 包含微信 "zwei919"', async ({ page }) => {
    const contact = page.locator('.contact-card');
    await expect(contact).toBeVisible();
    const text = await contact.textContent();
    expect(text).toContain('zwei919');
  });

  test('ContactCard 包含"请我喝杯咖啡"链接', async ({ page }) => {
    const link = page.locator('.contact-card a').filter({ hasText: '请我喝杯咖啡' });
    await expect(link).toBeVisible();
  });
});
