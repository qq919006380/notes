import { test, expect } from '@playwright/test';
import { BASE_URL, DESIGN_TOKENS } from '../helpers/test-config';

test.describe('CSS Design Tokens', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  async function resolveCSSVarColor(page: any, varName: string): Promise<string> {
    return page.evaluate((name: string) => {
      const tmp = document.createElement('div');
      tmp.style.color = `var(${name})`;
      document.body.appendChild(tmp);
      const resolved = window.getComputedStyle(tmp).color;
      document.body.removeChild(tmp);
      return resolved;
    }, varName);
  }

  async function resolveCSSVarBg(page: any, varName: string): Promise<string> {
    return page.evaluate((name: string) => {
      const tmp = document.createElement('div');
      tmp.style.backgroundColor = `var(${name})`;
      document.body.appendChild(tmp);
      const resolved = window.getComputedStyle(tmp).backgroundColor;
      document.body.removeChild(tmp);
      return resolved;
    }, varName);
  }

  test('--accent-color 为品牌蓝色 rgb(17,168,205)', async ({ page }) => {
    const color = await resolveCSSVarColor(page, '--accent-color');
    expect(color).toBe(DESIGN_TOKENS.accentColor);
  });

  test('--reading-progress-color 为紫色 rgb(177,96,234)', async ({ page }) => {
    const color = await resolveCSSVarColor(page, '--reading-progress-color');
    expect(color).toBe(DESIGN_TOKENS.progressColor);
  });

  test('--body-bg 为浅灰色 rgb(244,244,244)', async ({ page }) => {
    const color = await resolveCSSVarBg(page, '--body-bg');
    expect(color).toBe(DESIGN_TOKENS.bodyBg);
  });

  test('--main-bg 为白色 rgb(255,255,255)', async ({ page }) => {
    const color = await resolveCSSVarBg(page, '--main-bg');
    expect(color).toBe(DESIGN_TOKENS.mainBg);
  });

  test('--text-color 为深青色 rgb(0,64,80)', async ({ page }) => {
    const color = await resolveCSSVarColor(page, '--text-color');
    expect(color).toBe(DESIGN_TOKENS.textColor);
  });

  test('navbar 实际高度应为 57.6px（--navbar-height）', async ({ page }) => {
    const box = await page.locator('#navbar').boundingBox();
    expect(box).not.toBeNull();
    expect(Math.abs(box!.height - DESIGN_TOKENS.navbarHeight)).toBeLessThan(2);
  });

  test('body 背景色应用 --body-bg', async ({ page }) => {
    const bg = await page.evaluate(() =>
      window.getComputedStyle(document.body).backgroundColor
    );
    expect(bg).toBe(DESIGN_TOKENS.bodyBg);
  });

  test('--content-width 变量值包含 860px', async ({ page }) => {
    const raw = await page.evaluate(() =>
      window.getComputedStyle(document.documentElement)
        .getPropertyValue('--content-width')
        .trim()
    );
    expect(raw).toContain('860');
  });

  test('--home-page-width 变量值包含 1100px', async ({ page }) => {
    const raw = await page.evaluate(() =>
      window.getComputedStyle(document.documentElement)
        .getPropertyValue('--home-page-width')
        .trim()
    );
    expect(raw).toContain('1100');
  });

  test('--right-menu-width 变量值包含 230px', async ({ page }) => {
    const raw = await page.evaluate(() =>
      window.getComputedStyle(document.documentElement)
        .getPropertyValue('--right-menu-width')
        .trim()
    );
    expect(raw).toContain('230');
  });
});
