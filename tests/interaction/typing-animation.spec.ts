import { test, expect } from '@playwright/test';

test.describe('Typing Animation 打字机动画', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('页面加载后 #banner-description 存在', async ({ page }) => {
    const descEl = page.locator('#banner-description');
    await expect(descEl).toBeAttached();
  });

  test('初始状态 span:first-child 为空，打字动画开始后文字增加', async ({ page }) => {
    const textSpan = page.locator('#banner-description span:first-child');
    await expect(textSpan).toBeAttached();

    // 等待打字动画开始（fadeInTime=200ms，等待足够时间）
    await page.waitForFunction(() => {
      const span = document.querySelector('#banner-description span:first-child');
      return span && span.textContent && span.textContent.length > 0;
    }, { timeout: 5000 });

    const textLength = await textSpan.evaluate(el => el.textContent?.length ?? 0);
    expect(textLength).toBeGreaterThan(0);
  });

  test('.typed 光标元素存在', async ({ page }) => {
    const cursor = page.locator('#banner-description .typed');
    await expect(cursor).toBeAttached();
  });

  test('.typed 元素有 animation 属性', async ({ page }) => {
    // 打字动画完成后（~3s）JS 才会设置 typedBlink 动画
    const cursor = page.locator('#banner-description .typed');
    await expect(async () => {
      const animation = await cursor.evaluate(el => {
        return window.getComputedStyle(el).animation;
      });
      expect(animation).toContain('typedBlink');
    }).toPass({ timeout: 5000 });
  });

  test('完整文字 "Hello world!" 最终出现', async ({ page }) => {
    // 等待打字动画展示完整文字（每字符 200ms，"Hello world!" 有 12 个字符，约 2.4s）
    await page.waitForFunction(() => {
      const span = document.querySelector('#banner-description span:first-child');
      return span && span.textContent === 'Hello world!';
    }, { timeout: 5000 });

    const text = await page.locator('#banner-description span:first-child').textContent();
    expect(text).toBe('Hello world!');
  });
});
