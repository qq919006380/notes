import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/test-config';

test.describe('Card Style (.card-box)', () => {
  test.beforeEach(async ({ page }) => {
    // 目录页有 BloggerBar、SiteInfo、ContactCard 等 card-box
    await page.goto(`${BASE_URL}/blog/`);
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test('所有 .card-box 元素的 border-radius 为 8px', async ({ page }) => {
    const cards = page.locator('.card-box');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const borderRadius = await cards.nth(i).evaluate(
        (el) => parseFloat(window.getComputedStyle(el).borderRadius)
      );
      expect(borderRadius).toBeCloseTo(8, 0);
    }
  });

  test('所有 .card-box 元素有 box-shadow', async ({ page }) => {
    const cards = page.locator('.card-box');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const boxShadow = await cards.nth(i).evaluate(
        (el) => window.getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('none');
    }
  });

  test('所有 .card-box 元素的内边距 >= 1rem (16px)', async ({ page }) => {
    const cards = page.locator('.card-box');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const paddingTop = await cards.nth(i).evaluate(
        (el) => parseFloat(window.getComputedStyle(el).paddingTop)
      );
      expect(paddingTop).toBeGreaterThanOrEqual(16);
    }
  });

  test('BloggerBar 使用 card-box 样式', async ({ page }) => {
    const bloggerBar = page.locator('.blogger-bar.card-box');
    await expect(bloggerBar).toBeVisible();
  });

  test('.card-box 背景色为白色（--main-bg）', async ({ page }) => {
    const bg = await page.locator('.card-box').first().evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    expect(bg).toBe('rgb(255, 255, 255)');
  });

  test('SiteInfo 使用 card-box 样式', async ({ page }) => {
    // SiteInfo 仅在首页渲染
    await page.goto(`${BASE_URL}/`);
    await page.setViewportSize({ width: 1280, height: 800 });
    const siteInfo = page.locator('.site-info.card-box');
    await expect(siteInfo).toBeVisible();
  });

  test('ContactCard 使用 card-box 样式', async ({ page }) => {
    const contactCard = page.locator('.contact-card.card-box');
    await expect(contactCard).toBeVisible();
  });
});
