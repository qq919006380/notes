import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/test-config';

test.describe('Typography', () => {
  test('body font-family 包含系统字体（-apple-system）', async ({ page }) => {
    await page.goto(BASE_URL);
    const fontFamily = await page.evaluate(
      () => window.getComputedStyle(document.body).fontFamily
    );
    expect(fontFamily.toLowerCase()).toMatch(/-apple-system|blinkmacsystemfont/i);
  });

  test('文章 .prose 区域行高 >= 1.6', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/fa532d/`);
    const lineHeight = await page.locator('.prose').evaluate((el) => {
      const style = window.getComputedStyle(el);
      const lh = parseFloat(style.lineHeight);
      const fs = parseFloat(style.fontSize);
      return lh / fs;
    });
    expect(lineHeight).toBeGreaterThanOrEqual(1.6);
  });

  test('文章 h1 font-size >= 24px (1.5rem)', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/fa532d/`);
    const fontSize = await page.locator('.post-title').evaluate(
      (el) => parseFloat(window.getComputedStyle(el).fontSize)
    );
    expect(fontSize).toBeGreaterThanOrEqual(24);
  });

  test('文章 h2 font-size >= 19.2px (1.2rem)', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/fa532d/`);
    const h2 = page.locator('.prose h2').first();
    const count = await page.locator('.prose h2').count();
    if (count > 0) {
      const fontSize = await h2.evaluate(
        (el) => parseFloat(window.getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeGreaterThanOrEqual(19);
    }
  });

  test('代码元素使用等宽字体', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/fa532d/`);
    const codeCount = await page.locator('.prose code').count();
    if (codeCount > 0) {
      const fontFamily = await page.locator('.prose code').first().evaluate(
        (el) => window.getComputedStyle(el).fontFamily
      );
      expect(fontFamily.toLowerCase()).toMatch(/mono|courier|consolas|menlo|source code/i);
    }
  });

  test('正文文字颜色匹配 --text-color', async ({ page }) => {
    await page.goto(BASE_URL);
    const color = await page.evaluate(
      () => window.getComputedStyle(document.body).color
    );
    expect(color).toBe('rgb(0, 64, 80)');
  });

  test('链接颜色匹配 --accent-color', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/fa532d/`);
    const linkCount = await page.locator('.prose a').count();
    if (linkCount > 0) {
      const color = await page.locator('.prose a').first().evaluate(
        (el) => window.getComputedStyle(el).color
      );
      expect(color).toBe('rgb(17, 168, 205)');
    }
  });
});
