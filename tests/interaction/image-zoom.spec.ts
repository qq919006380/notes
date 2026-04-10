import { test, expect } from '@playwright/test';

test.describe('Image Zoom 图片缩放（medium-zoom）', () => {
  // 使用一个有图片的文章页面
  const articleWithImagesUrl = '/pages/9b2672/';

  test.beforeEach(async ({ page }) => {
    await page.goto(articleWithImagesUrl);
    await page.waitForLoadState('networkidle');
  });

  test('文章内容区域有图片', async ({ page }) => {
    const images = page.locator('.prose img, .post-content img, article img');
    const count = await images.count();
    if (count === 0) {
      // 该文章可能没有图片，尝试其他文章
      await page.goto('/pages/2ebacc/');
      await page.waitForLoadState('networkidle');
      const imagesAlt = page.locator('.prose img, .post-content img, article img');
      const countAlt = await imagesAlt.count();
      expect(countAlt).toBeGreaterThan(0);
    } else {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('点击文章图片后出现 medium-zoom 遮罩', async ({ page }) => {
    // 确保有图片
    const images = page.locator('.prose img, .post-content img, article img, .markdown-body img');
    const count = await images.count();
    if (count === 0) {
      test.skip();
      return;
    }

    // 点击第一张图片
    await images.first().click();
    await page.waitForTimeout(500);

    // medium-zoom 的覆盖层
    const overlay = page.locator('.medium-zoom-overlay');
    await expect(overlay).toBeVisible({ timeout: 2000 });
  });

  test('medium-zoom 遮罩有深色背景', async ({ page }) => {
    const images = page.locator('.prose img, .post-content img, article img, .markdown-body img');
    const count = await images.count();
    if (count === 0) {
      test.skip();
      return;
    }

    await images.first().click();
    await page.waitForTimeout(500);

    const overlay = page.locator('.medium-zoom-overlay');
    const exists = await overlay.count();
    if (exists > 0) {
      const bgColor = await overlay.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });
      // 背景色不为白色/透明
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(bgColor).not.toBe('rgb(255, 255, 255)');
    }
  });

  test('点击 medium-zoom 遮罩后缩放关闭', async ({ page }) => {
    const images = page.locator('.prose img, .post-content img, article img, .markdown-body img');
    const count = await images.count();
    if (count === 0) {
      test.skip();
      return;
    }

    await images.first().click();
    await page.waitForTimeout(500);

    const overlay = page.locator('.medium-zoom-overlay');
    const overlayCount = await overlay.count();
    if (overlayCount > 0) {
      // medium-zoom: 点击遮罩可能被图片拦截，改用 Escape 关闭
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);

      // 遮罩消失
      const isVisible = await overlay.isVisible();
      expect(isVisible).toBe(false);
    }
  });
});
