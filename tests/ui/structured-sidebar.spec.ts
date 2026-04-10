import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/test-config';

// fa532d 是 blog collection 的文章，会渲染左侧树形侧边栏
const ARTICLE_URL = `${BASE_URL}/pages/fa532d/`;

test.describe('Structured Sidebar (Left Tree)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(ARTICLE_URL);
  });

  test('在桌面视口（>=1024px）左侧侧边栏可见', async ({ page }) => {
    const sidebar = page.locator('.structured-sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('侧边栏有至少 1 个 <details> 分组', async ({ page }) => {
    const groups = page.locator('.sidebar-group');
    const count = await groups.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('当前文章链接有 .active 类', async ({ page }) => {
    const activeLink = page.locator('.sidebar-link.active');
    await expect(activeLink).toBeVisible();
  });

  test('当前文章 .active 链接有 accent-color 左边框', async ({ page }) => {
    const borderColor = await page.locator('.sidebar-link.active').evaluate(
      (el) => window.getComputedStyle(el).borderLeftColor
    );
    expect(borderColor).toBe('rgb(17, 168, 205)');
  });

  test('分组标题显示文章数量', async ({ page }) => {
    const count = page.locator('.sidebar-count').first();
    await expect(count).toBeVisible();
    const text = await count.textContent();
    expect(parseInt(text || '0')).toBeGreaterThan(0);
  });

  test('点击已关闭的 summary 可展开 details', async ({ page }) => {
    // 找到关闭的 details
    const allGroups = page.locator('.sidebar-group');
    const count = await allGroups.count();
    let closedIndex = -1;
    for (let i = 0; i < count; i++) {
      const isOpen = await allGroups.nth(i).evaluate(
        (el) => (el as HTMLDetailsElement).open
      );
      if (!isOpen) {
        closedIndex = i;
        break;
      }
    }
    if (closedIndex >= 0) {
      await allGroups.nth(closedIndex).locator('summary').click();
      const isOpen = await allGroups.nth(closedIndex).evaluate(
        (el) => (el as HTMLDetailsElement).open
      );
      expect(isOpen).toBe(true);
    }
  });

  test('点击已展开的 summary 可收起 details', async ({ page }) => {
    // 找到已打开的 details
    const allGroups = page.locator('.sidebar-group');
    const count = await allGroups.count();
    let openIndex = -1;
    for (let i = 0; i < count; i++) {
      const isOpen = await allGroups.nth(i).evaluate(
        (el) => (el as HTMLDetailsElement).open
      );
      if (isOpen) {
        openIndex = i;
        break;
      }
    }
    if (openIndex >= 0) {
      await allGroups.nth(openIndex).locator('summary').click();
      const isOpen = await allGroups.nth(openIndex).evaluate(
        (el) => (el as HTMLDetailsElement).open
      );
      expect(isOpen).toBe(false);
    }
  });

  test('在平板视口（768px）左侧侧边栏隐藏', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const display = await page.locator('.structured-sidebar').evaluate(
      (el) => window.getComputedStyle(el).display
    );
    expect(display).toBe('none');
  });
});
