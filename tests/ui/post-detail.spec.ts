import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/test-config';

// fa532d: 小白都能看懂的闭包 - 有 titleTag: 原创, categories, tags, author
const ARTICLE_URL = `${BASE_URL}/pages/fa532d/`;

test.describe('Post Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ARTICLE_URL);
  });

  test('titleTag "原创" 徽章存在且背景色为 accent-color', async ({ page }) => {
    const tag = page.locator('.title-tag');
    await expect(tag).toBeVisible();
    await expect(tag).toContainText('原创');

    const bg = await tag.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    expect(bg).toBe('rgb(17, 168, 205)');
  });

  test('titleTag 文字颜色为白色', async ({ page }) => {
    const color = await page.locator('.title-tag').evaluate(
      (el) => window.getComputedStyle(el).color
    );
    expect(color).toBe('rgb(255, 255, 255)');
  });

  test('titleTag 有 border-radius（圆角）', async ({ page }) => {
    const br = await page.locator('.title-tag').evaluate(
      (el) => parseFloat(window.getComputedStyle(el).borderRadius)
    );
    expect(br).toBeGreaterThan(0);
  });

  test('文章元数据行包含日期', async ({ page }) => {
    const meta = page.locator('.post-meta');
    await expect(meta).toBeVisible();
    const metaText = await meta.textContent();
    // 日期格式如 2022-05-15
    expect(metaText).toMatch(/\d{4}[-./]\d{1,2}[-./]\d{1,2}/);
  });

  test('文章元数据行包含字数', async ({ page }) => {
    const metaText = await page.locator('.post-meta').textContent();
    expect(metaText).toMatch(/\d+\s*字/);
  });

  test('文章元数据行包含阅读时间', async ({ page }) => {
    const metaText = await page.locator('.post-meta').textContent();
    expect(metaText).toMatch(/\d+(\.\d+)?\s*(分钟|m|min|h)/);
  });

  test('分类链接以 pill 样式展示', async ({ page }) => {
    const catLink = page.locator('.category-link').first();
    await expect(catLink).toBeVisible();
    const br = await catLink.evaluate(
      (el) => parseFloat(window.getComputedStyle(el).borderRadius)
    );
    expect(br).toBeGreaterThan(0);
  });

  test('标签链接有边框（outlined pill）', async ({ page }) => {
    const tagLink = page.locator('.tag-link').first();
    await expect(tagLink).toBeVisible();
    const border = await tagLink.evaluate(
      (el) => window.getComputedStyle(el).borderWidth
    );
    expect(parseFloat(border)).toBeGreaterThan(0);
  });

  test('文章正文内容不为空', async ({ page }) => {
    const prose = page.locator('.prose');
    await expect(prose).toBeVisible();
    const text = await prose.textContent();
    expect(text?.trim().length).toBeGreaterThan(100);
  });

  test('文章标题 h1 存在且不为空', async ({ page }) => {
    const h1 = page.locator('.post-title');
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });
});
