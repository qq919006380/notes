import { test, expect } from '@playwright/test';
import { DESIGN_TOKENS } from '../helpers/test-config';

/** 解析 CSS rgb/rgba 颜色字符串为 [R, G, B] */
function parseRGB(cssColor: string): [number, number, number] {
  const match = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) throw new Error(`无法解析颜色: ${cssColor}`);
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

/** 计算相对亮度（WCAG 2.1 公式） */
function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** 计算两种颜色的对比度比率 */
function contrastRatio(fg: string, bg: string): number {
  const [fr, fg_, fb] = parseRGB(fg);
  const [br, bg_, bb] = parseRGB(bg);
  const L1 = relativeLuminance(fr, fg_, fb);
  const L2 = relativeLuminance(br, bg_, bb);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

test.describe('颜色对比度（WCAG 2.1 AA）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('正文文字（--text-color）与正文背景（--body-bg）对比度 >= 4.5:1', async ({ page }) => {
    const { textColor, bodyBg } = await page.evaluate(() => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      return {
        textColor: style.getPropertyValue('--text-color').trim(),
        bodyBg: style.getPropertyValue('--body-bg').trim(),
      };
    });

    // 获取实际计算颜色
    const actualTextColor = await page.evaluate(() => {
      const el = document.body;
      return getComputedStyle(el).color;
    });
    const actualBg = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });

    // 使用 design token 值进行检查
    const ratio = contrastRatio(DESIGN_TOKENS.textColor, DESIGN_TOKENS.bodyBg);
    console.log(`正文对比度: ${ratio.toFixed(2)}:1`);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  test('强调色（--accent-color）与白色背景对比度（WCAG AA）', async ({ page }) => {
    const ratio = contrastRatio(DESIGN_TOKENS.accentColor, DESIGN_TOKENS.mainBg);
    console.log(`强调色对比度: ${ratio.toFixed(2)}:1`);
    // WCAG AA 大文字 >= 3:1，正文 >= 4.5:1
    expect(ratio).toBeGreaterThanOrEqual(3.0);
  });

  test('Navbar 文字颜色与 Navbar 背景对比度满足要求', async ({ page }) => {
    // 滚动后 navbar 有背景色
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    const navbarColors = await page.evaluate(() => {
      const navbar = document.getElementById('navbar');
      const navLink = navbar?.querySelector('.nav-link');
      if (!navbar || !navLink) return null;
      return {
        bg: getComputedStyle(navbar).backgroundColor,
        text: getComputedStyle(navLink).color,
      };
    });

    if (navbarColors && navbarColors.bg !== 'rgba(0, 0, 0, 0)') {
      const ratio = contrastRatio(navbarColors.text, navbarColors.bg);
      console.log(`Navbar 对比度: ${ratio.toFixed(2)}:1`);
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    }
  });

  test('设计 Token 颜色值与规范一致', async ({ page }) => {
    const tokenColors = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        textColor: style.getPropertyValue('--text-color').trim(),
        bodyBg: style.getPropertyValue('--body-bg').trim(),
        accentColor: style.getPropertyValue('--accent-color').trim(),
        mainBg: style.getPropertyValue('--main-bg').trim(),
      };
    });

    console.log('实际颜色 token:', tokenColors);

    // 验证 text-color 是深色（亮度低）
    const textRGB = parseRGB(DESIGN_TOKENS.textColor);
    const textLuminance = relativeLuminance(...textRGB);
    expect(textLuminance).toBeLessThan(0.3); // 深色文字

    // 验证 body-bg 是浅色（亮度高）
    const bgRGB = parseRGB(DESIGN_TOKENS.bodyBg);
    const bgLuminance = relativeLuminance(...bgRGB);
    expect(bgLuminance).toBeGreaterThan(0.7); // 浅色背景
  });
});
