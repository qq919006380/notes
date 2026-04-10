import { test, expect } from '@playwright/test';
import { BASE_URL, BREAKPOINTS, SAMPLE_SLUGS } from '../helpers/test-config';

const BP = BREAKPOINTS.desktop; // 1440×900

test.describe('Layout @ 1440px (Desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(BP);
  });

  test('桌面导航链接可见', async ({ page }) => {
    await page.goto(BASE_URL);
    const display = await page.locator('#nav-links').evaluate(
      (el) => window.getComputedStyle(el).display
    );
    expect(display).not.toBe('none');
  });

  test('汉堡菜单按钮隐藏', async ({ page }) => {
    await page.goto(BASE_URL);
    const display = await page.locator('.sidebar-button').evaluate(
      (el) => window.getComputedStyle(el).display
    );
    expect(display).toBe('none');
  });

  test('文章页面左侧树形侧边栏可见', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/${SAMPLE_SLUGS[0]}/`);
    await expect(page.locator('.structured-sidebar')).toBeVisible();
  });

  test('右侧侧边栏在目录页可见', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog/`);
    await expect(page.locator('#sidebar')).toBeVisible();
  });

  test('文章页面三栏布局：左侧栏 + 内容 + 右侧栏', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/${SAMPLE_SLUGS[0]}/`);
    const leftSidebar = page.locator('.structured-sidebar');
    const content = page.locator('.post-content');
    const rightSidebar = page.locator('#sidebar');

    const [leftBox, contentBox, rightBox] = await Promise.all([
      leftSidebar.boundingBox(),
      content.boundingBox(),
      rightSidebar.boundingBox(),
    ]);

    if (leftBox && contentBox && rightBox) {
      // 三栏布局：left < content < right（水平位置关系）
      expect(leftBox.x).toBeLessThan(contentBox.x);
      expect(contentBox.x).toBeLessThan(rightBox.x);
    }
  });

  test('最大宽度约束生效（--home-page-width: 1100px）', async ({ page }) => {
    await page.goto(BASE_URL);
    const innerWidth = await page.locator('.navbar-inner').evaluate(
      (el) => el.clientWidth
    );
    // navbar-inner 的 max-width 为 1100px
    expect(innerWidth).toBeLessThanOrEqual(1110);
  });

  test('BloggerBar 头像存在且为圆形', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog/`);
    const avatar = page.locator('.blogger-avatar');
    await expect(avatar).toBeVisible();
    const br = await avatar.evaluate(
      (el) => window.getComputedStyle(el).borderRadius
    );
    expect(br).toBe('50%');
  });

  test('页面无水平滚动条', async ({ page }) => {
    await page.goto(BASE_URL);
    const hasHScroll = await page.evaluate(
      () => document.body.scrollWidth > window.innerWidth + 2
    );
    expect(hasHScroll).toBe(false);
  });

  test('文章 TOC 右侧菜单存在（如有多个标题）', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/${SAMPLE_SLUGS[0]}/`);
    // RightMenu 仅在有 h2-h4 标题时渲染
    const rightMenu = page.locator('.right-menu');
    if (await rightMenu.count() > 0) {
      await expect(rightMenu).toBeVisible();
    }
  });
});
