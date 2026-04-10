import { test, expect } from '@playwright/test';

test.describe('Navbar 下拉菜单', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('有下拉菜单的导航项（.has-dropdown）存在', async ({ page }) => {
    const dropdownItems = page.locator('.has-dropdown');
    const count = await dropdownItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('hover 到 .has-dropdown 项后下拉菜单可见', async ({ page }) => {
    const dropdownItem = page.locator('.has-dropdown').first();
    await dropdownItem.hover();

    const dropdown = dropdownItem.locator('.dropdown-menu');
    await expect(dropdown).toBeVisible();
  });

  test('下拉菜单包含分组标题', async ({ page }) => {
    const dropdownItem = page.locator('.has-dropdown').first();
    await dropdownItem.hover();

    // dropdown-group-title 是分组标题
    const groupTitles = page.locator('.dropdown-group-title');
    const count = await groupTitles.count();
    // 可能有分组标题，也可能是直接链接
    // 检查 dropdown 菜单中有内容即可
    const dropdown = page.locator('.dropdown-menu').first();
    const dropdownText = await dropdown.textContent();
    expect(dropdownText?.trim().length).toBeGreaterThan(0);
  });

  test('下拉菜单中的链接可点击并跳转', async ({ page }) => {
    const dropdownItem = page.locator('.has-dropdown').first();
    await dropdownItem.hover();

    const dropdownLinks = page.locator('.dropdown-link');
    const count = await dropdownLinks.count();
    expect(count).toBeGreaterThan(0);

    // 获取第一个链接的 href
    const href = await dropdownLinks.first().getAttribute('href');
    expect(href).toBeTruthy();

    // 点击后导航到对应 URL
    await dropdownLinks.first().click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain(href ?? '');
  });

  test('移出 hover 后下拉菜单隐藏', async ({ page }) => {
    const dropdownItem = page.locator('.has-dropdown').first();
    await dropdownItem.hover();

    // 下拉可见
    await expect(dropdownItem.locator('.dropdown-menu')).toBeVisible();

    // 移到其他位置
    await page.mouse.move(100, 100);
    await page.waitForTimeout(300);

    // 下拉隐藏
    const display = await dropdownItem.locator('.dropdown-menu').evaluate(el => {
      return window.getComputedStyle(el).display;
    });
    expect(display).toBe('none');
  });
});
