import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/test-config';

// fa532d (闭包) 文章包含代码块
const ARTICLE_URL = `${BASE_URL}/pages/fa532d/`;

test.describe('Code Block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ARTICLE_URL);
  });

  test('文章页面存在 <pre> 代码块元素', async ({ page }) => {
    const preCount = await page.locator('.prose pre').count();
    expect(preCount).toBeGreaterThan(0);
  });

  test('<pre> 内部有语法高亮的 <code> 子元素', async ({ page }) => {
    const codeInPre = page.locator('.prose pre code');
    await expect(codeInPre.first()).toBeVisible();
  });

  test('Expressive-code 复制按钮存在于代码块中', async ({ page }) => {
    // expressive-code 渲染后会有 .copy 或 button[title*="Copy"] 之类的元素
    // 或者 astro-expressive-code 渲染的 div 结构
    const copyBtn = page.locator(
      'pre + div button, .expressive-code button, figure button, [data-code] button'
    ).first();
    // 如果没找到，检查整个页面中的 copy 相关按钮
    const fallbackBtn = page.locator('button[title*="opy"], button[aria-label*="opy"]').first();

    const hasCopy = (await copyBtn.count()) > 0 || (await fallbackBtn.count()) > 0;
    expect(hasCopy).toBe(true);
  });

  test('代码块有圆角（border-radius）', async ({ page }) => {
    const pre = page.locator('.prose pre, .expressive-code pre').first();
    // expressive-code 可能将 border-radius 放在父容器上
    const br = await pre.evaluate((el) => {
      // 检查自身及父元素
      let current: Element | null = el;
      while (current) {
        const style = window.getComputedStyle(current);
        const r = parseFloat(style.borderRadius);
        if (r > 0) return r;
        current = current.parentElement;
        if (current === document.body) break;
      }
      return 0;
    });
    expect(br).toBeGreaterThan(0);
  });

  test('代码块使用等宽字体', async ({ page }) => {
    const fontFamily = await page.locator('.prose pre code, .prose code').first().evaluate(
      (el) => window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily.toLowerCase()).toMatch(/mono|courier|consolas|menlo|source code|fira/i);
  });
});
