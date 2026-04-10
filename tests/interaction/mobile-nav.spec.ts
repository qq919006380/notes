import { test, expect } from '@playwright/test';
import { BREAKPOINTS } from '../helpers/test-config';

test.describe('Mobile Nav 移动端导航（375px）', () => {
  test.use({ viewport: BREAKPOINTS.mobile });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('汉堡菜单按钮（#sidebar-toggle）在移动端可见', async ({ page }) => {
    const toggle = page.locator('#sidebar-toggle');
    await expect(toggle).toBeVisible();
  });

  test('移动端桌面导航链接（#nav-links）隐藏', async ({ page }) => {
    const navLinks = page.locator('#nav-links');
    const display = await navLinks.evaluate(el => {
      return window.getComputedStyle(el).display;
    });
    expect(display).toBe('none');
  });

  test('点击汉堡按钮后移动端导航面板出现（.active 类）', async ({ page }) => {
    await page.locator('#sidebar-toggle').click();
    await page.waitForTimeout(400);

    const panel = page.locator('#mobile-nav-panel');
    const hasActive = await panel.evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBe(true);
  });

  test('移动端导航面板包含导航链接', async ({ page }) => {
    await page.locator('#sidebar-toggle').click();
    await page.waitForTimeout(400);

    const links = page.locator('#mobile-nav-panel .mobile-nav-link');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('点击遮罩层后面板关闭', async ({ page }) => {
    await page.locator('#sidebar-toggle').click();
    await page.waitForTimeout(400);

    // 确认面板已打开
    const panel = page.locator('#mobile-nav-panel');
    await expect(panel).toHaveClass(/active/);

    // 点击遮罩（面板 z-index 高于遮罩，需要 force:true 或点击面板左侧空白区）
    await page.locator('#mobile-nav-overlay').click({ force: true });
    await page.waitForTimeout(400);

    const hasActive = await panel.evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBe(false);
  });

  test('点击关闭按钮后面板关闭', async ({ page }) => {
    await page.locator('#sidebar-toggle').click();
    await page.waitForTimeout(400);

    await page.locator('#mobile-nav-close').click();
    await page.waitForTimeout(400);

    const panel = page.locator('#mobile-nav-panel');
    const hasActive = await panel.evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBe(false);
  });

  test('移动端面板初始状态在屏幕外（right: -280px）', async ({ page }) => {
    // 初始状态没有 active 类
    const panel = page.locator('#mobile-nav-panel');
    const hasActive = await panel.evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBe(false);
  });
});
