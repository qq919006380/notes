import { test, expect } from '@playwright/test';
import { BASE_URL, BREAKPOINTS, SAMPLE_SLUGS } from '../helpers/test-config';

const BP = BREAKPOINTS.mobile; // 375×667

test.describe('Layout @ 375px (iPhone SE)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(BP);
  });

  test('汉堡菜单按钮可见', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.sidebar-button')).toBeVisible();
  });

  test('桌面导航链接隐藏', async ({ page }) => {
    await page.goto(BASE_URL);
    const display = await page.locator('#nav-links').evaluate(
      (el) => window.getComputedStyle(el).display
    );
    expect(display).toBe('none');
  });

  test('左侧树形侧边栏隐藏', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/${SAMPLE_SLUGS[0]}/`);
    const sidebar = page.locator('.structured-sidebar');
    if (await sidebar.count() > 0) {
      const display = await sidebar.evaluate(
        (el) => window.getComputedStyle(el).display
      );
      expect(display).toBe('none');
    }
  });

  test('右侧侧边栏隐藏', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog/`);
    const sidebar = page.locator('#sidebar');
    if (await sidebar.count() > 0) {
      const display = await sidebar.evaluate(
        (el) => window.getComputedStyle(el).display
      );
      expect(display).toBe('none');
    }
  });

  test('点击汉堡菜单打开移动端导航面板', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.sidebar-button').click();
    await expect(page.locator('#mobile-nav-panel')).toHaveClass(/active/);
  });

  test('移动端导航面板包含导航链接', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.sidebar-button').click();
    await expect(page.locator('.mobile-nav-link').first()).toBeVisible();
    const count = await page.locator('.mobile-nav-link').count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('点击遮罩关闭移动端导航面板', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.sidebar-button').click();
    await page.locator('#mobile-nav-overlay').click();
    await expect(page.locator('#mobile-nav-panel')).not.toHaveClass(/active/);
  });

  test('Banner 标题字体缩小（手机端）', async ({ page }) => {
    await page.goto(BASE_URL);
    const fontSize = await page.locator('.banner-title').evaluate(
      (el) => parseFloat(window.getComputedStyle(el).fontSize)
    );
    // 移动端 banner-title: 1.8rem = 28.8px，桌面 2.5rem = 40px
    expect(fontSize).toBeLessThan(36);
  });

  test('文章内容区域占满宽度（无左右侧栏）', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/${SAMPLE_SLUGS[0]}/`);
    const contentBox = await page.locator('.post-content').boundingBox();
    const viewportWidth = BP.width;
    if (contentBox) {
      // 内容区宽度应超过视口 60%（单列布局）
      expect(contentBox.width).toBeGreaterThan(viewportWidth * 0.6);
    }
  });
});
