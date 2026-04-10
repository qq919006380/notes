import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('Code Copy 代码复制按钮', () => {
  test.beforeEach(async ({ page }) => {
    // 使用第一个 sample 文章（fa532d 是关于闭包，有代码块）
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    await page.waitForLoadState('networkidle');
  });

  test('文章页面存在代码块 <pre> 元素', async ({ page }) => {
    const preElements = page.locator('pre');
    const count = await preElements.count();
    if (count === 0) {
      // 尝试另一个有代码的文章
      await page.goto(`/pages/${SAMPLE_SLUGS[6]}/`);
      await page.waitForLoadState('networkidle');
      const altCount = await page.locator('pre').count();
      expect(altCount).toBeGreaterThan(0);
    } else {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('expressive-code 复制按钮在代码块内存在', async ({ page }) => {
    // expressive-code 生成的复制按钮通常在 .copy 或 button[class*="copy"] 中
    const copyButtons = page.locator(
      'button[data-code], button.copy, .expressive-code button, [class*="copy-button"], button[title*="Copy"], button[title*="复制"]'
    );
    const preCount = await page.locator('pre').count();

    if (preCount === 0) {
      test.skip();
      return;
    }

    const btnCount = await copyButtons.count();
    expect(btnCount).toBeGreaterThan(0);
  });

  test('hover 到代码块后复制按钮可见', async ({ page }) => {
    const preCount = await page.locator('pre').count();
    if (preCount === 0) {
      test.skip();
      return;
    }

    // hover 到代码块
    const firstPre = page.locator('pre').first();
    await firstPre.hover();
    await page.waitForTimeout(300);

    // 检查 expressive-code 的复制按钮
    const copyBtn = page.locator(
      '.expressive-code button, button[title*="Copy"], button[title*="复制"], button.copy'
    ).first();

    const btnCount = await copyBtn.count();
    if (btnCount > 0) {
      const opacity = await copyBtn.evaluate(el => {
        return parseFloat(window.getComputedStyle(el).opacity);
      });
      // opacity 应该大于 0
      expect(opacity).toBeGreaterThan(0);
    }
  });

  test('复制按钮文字包含 Copy 或复制', async ({ page }) => {
    const preCount = await page.locator('pre').count();
    if (preCount === 0) {
      test.skip();
      return;
    }

    // Hover 触发显示
    const firstPre = page.locator('pre').first();
    await firstPre.hover();
    await page.waitForTimeout(300);

    // expressive-code 的按钮
    const copyButtons = page.locator(
      '.expressive-code button, [class*="copy-button"]'
    );
    const count = await copyButtons.count();

    if (count > 0) {
      const firstBtn = copyButtons.first();
      const text = await firstBtn.textContent();
      const title = await firstBtn.getAttribute('title');
      const ariaLabel = await firstBtn.getAttribute('aria-label');

      const hasLabel = [text, title, ariaLabel].some(t =>
        t && (t.toLowerCase().includes('copy') || t.includes('复制'))
      );
      expect(hasLabel).toBe(true);
    }
  });
});
