import { test, expect } from '@playwright/test';

// Pagefind only works on the build artifact (pnpm build && pnpm preview).
// These tests assume the Playwright baseURL points at a preview server.
//
// Rationale: we depend on Pagefind's internal class names
// (pagefind-ui__drawer, pagefind-ui__hidden, pagefind-ui__search-input,
// pagefind-ui__result). If Pagefind renames them, these tests fail
// loudly instead of the UI silently breaking in production.

test.describe('Pagefind 搜索 popover', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Wait until Pagefind has replaced the placeholder input
    await page.waitForSelector('.pagefind-ui__search-input', { timeout: 5000 });
  });

  test('Pagefind 注入后接管搜索框', async ({ page }) => {
    // Only one search input exists (placeholder should be removed)
    const placeholder = page.locator('#search-placeholder');
    await expect(placeholder).toHaveCount(0);

    const input = page.locator('.pagefind-ui__search-input');
    await expect(input).toHaveCount(1);
    await expect(input).toBeVisible();

    // ARIA wiring for combobox pattern
    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(input).toHaveAttribute('aria-controls', 'pagefind-drawer');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  test('focus → popover 打开 + aria-expanded=true + 空态提示', async ({ page }) => {
    const searchBox = page.locator('#search-box');
    const input = page.locator('.pagefind-ui__search-input');
    const drawer = page.locator('#pagefind-drawer');

    await input.focus();

    await expect(searchBox).toHaveClass(/search-active/);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer).toBeVisible();

    // Empty-state hint comes from .search-active .drawer.pagefind-ui__hidden::before
    const hintContent = await drawer.evaluate(
      (el) => getComputedStyle(el, '::before').content,
    );
    expect(hintContent).toContain('输入关键词开始搜索');
  });

  test('输入查询 → 出现模糊搜索结果', async ({ page }) => {
    const input = page.locator('.pagefind-ui__search-input');
    await input.focus();
    await input.fill('react');

    // Pagefind debounces; wait for at least one result
    await page.waitForSelector('.pagefind-ui__result', { timeout: 5000 });
    const results = page.locator('.pagefind-ui__result');
    expect(await results.count()).toBeGreaterThan(0);

    const firstLink = results.first().locator('a').first();
    const href = await firstLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('blur → popover 关闭 + input 清空 + aria-expanded=false', async ({ page }) => {
    const searchBox = page.locator('#search-box');
    const input = page.locator('.pagefind-ui__search-input');
    const drawer = page.locator('#pagefind-drawer');

    await input.focus();
    await input.fill('react');
    await page.waitForSelector('.pagefind-ui__result', { timeout: 5000 });

    // Move focus elsewhere
    await page.locator('.site-name').focus();

    // Wait for the 150ms debounce inside focusout handler
    await page.waitForTimeout(300);

    await expect(searchBox).not.toHaveClass(/search-active/);
    await expect(drawer).toBeHidden();
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await expect(input).toHaveValue('');
  });

  test('按 Esc 关闭 popover', async ({ page }) => {
    const searchBox = page.locator('#search-box');
    const input = page.locator('.pagefind-ui__search-input');

    await input.focus();
    await input.fill('react');
    await page.waitForSelector('.pagefind-ui__result', { timeout: 5000 });

    await input.press('Escape');
    await page.waitForTimeout(300);

    await expect(searchBox).not.toHaveClass(/search-active/);
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await expect(input).toHaveValue('');
  });

  test('Tab 从 input 进入结果链接，popover 保持打开', async ({ page }) => {
    const searchBox = page.locator('#search-box');
    const input = page.locator('.pagefind-ui__search-input');

    await input.focus();
    await input.fill('react');
    await page.waitForSelector('.pagefind-ui__result a', { timeout: 5000 });

    // Tab into the first result link (several internal buttons may exist)
    // Walk tab focus until activeElement is a result link or we give up
    let reached = false;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        const inResult = !!el?.closest('.pagefind-ui__result');
        return { inResult, tag: el?.tagName };
      });
      if (info.inResult) {
        reached = true;
        break;
      }
    }
    expect(reached).toBe(true);

    // Popover should still be open because focus is inside searchBox
    await expect(searchBox).toHaveClass(/search-active/);
  });
});
