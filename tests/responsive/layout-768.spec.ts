import { test, expect } from '@playwright/test';
import { BASE_URL, BREAKPOINTS, SAMPLE_SLUGS } from '../helpers/test-config';

const BP = BREAKPOINTS.tablet; // 768×1024

test.describe('Layout @ 768px (iPad)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(BP);
  });

  test('汉堡菜单按钮可见（平板 768px 也使用汉堡菜单）', async ({ page }) => {
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

  test('内容区域比 375px 时更宽', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/${SAMPLE_SLUGS[0]}/`);
    const contentBox = await page.locator('.post-content').boundingBox();
    if (contentBox) {
      // 平板 768px，内容宽度应 > 375px 时的 60%
      expect(contentBox.width).toBeGreaterThan(400);
    }
  });

  test('页面无水平滚动条', async ({ page }) => {
    await page.goto(BASE_URL);
    const hasHScroll = await page.evaluate(
      () => document.body.scrollWidth > window.innerWidth + 2
    );
    expect(hasHScroll).toBe(false);
  });

  test('文章列表为单列展示', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog/`);
    const items = page.locator('.post-item, .card-box').first();
    if (await items.count() > 0) {
      const box = await items.boundingBox();
      if (box) {
        // 单列：宽度应超过视口 50%
        expect(box.width).toBeGreaterThan(BP.width * 0.5);
      }
    }
  });

  test('移动端导航面板正常工作', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.sidebar-button').click();
    await expect(page.locator('#mobile-nav-panel')).toHaveClass(/active/);
    await page.locator('#mobile-nav-close').click();
    await expect(page.locator('#mobile-nav-panel')).not.toHaveClass(/active/);
  });
});
