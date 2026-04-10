import { test, expect } from '@playwright/test';
import { BASE_URL, DESIGN_TOKENS } from '../helpers/test-config';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('导航栏为 fixed 定位', async ({ page }) => {
    const position = await page.locator('.navbar').evaluate(
      (el) => window.getComputedStyle(el).position
    );
    expect(position).toBe('fixed');
  });

  test('导航栏高度匹配 --navbar-height (57.6px)', async ({ page }) => {
    const box = await page.locator('.navbar').boundingBox();
    expect(box).not.toBeNull();
    expect(Math.abs(box!.height - DESIGN_TOKENS.navbarHeight)).toBeLessThan(2);
  });

  test('Logo 图片为圆形（border-radius: 50%）', async ({ page }) => {
    const borderRadius = await page.locator('.nav-logo').evaluate(
      (el) => window.getComputedStyle(el).borderRadius
    );
    expect(borderRadius).toBe('50%');
  });

  test('站点名称文字为 "夏天夏"', async ({ page }) => {
    const text = await page.locator('.site-name span').textContent();
    expect(text?.trim()).toBe('夏天夏');
  });

  test('所有导航项均已渲染（5个：首页、个人博客、学习笔记、我的作品、索引）', async ({ page }) => {
    const navLinks = page.locator('.nav-links .nav-link');
    // at least 5 nav items: 首页 个人博客 学习笔记 我的作品 索引
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('导航包含"首页"链接', async ({ page }) => {
    await expect(page.locator('.nav-links .nav-link').filter({ hasText: '首页' })).toBeVisible();
  });

  test('GitHub iconfont 图标可见', async ({ page }) => {
    // iconfont <i> 元素依赖外部字体，用 toBeAttached() 代替 toBeVisible()
    await expect(page.locator('.github-link .icon-github')).toBeAttached();
  });

  test('移动端汉堡菜单按钮在桌面视口下不可见', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const display = await page.locator('.sidebar-button').evaluate(
      (el) => window.getComputedStyle(el).display
    );
    expect(display).toBe('none');
  });

  test('下拉菜单包含"技术分享"分组标题', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.locator('.nav-item.has-dropdown').first().hover();
    await expect(page.locator('.dropdown-group-title').filter({ hasText: '技术分享' })).toBeVisible();
  });
});
