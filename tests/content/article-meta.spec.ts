import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('文章元信息验证', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
  });

  test('文章显示格式化日期', async ({ page }) => {
    // 日期格式：YYYY-MM-DD 或 YYYY/MM/DD 或类似格式
    const datePattern = /\d{4}[-/年]\d{1,2}[-/月]\d{1,2}/;
    const pageContent = await page.textContent('body');
    expect(pageContent).toMatch(datePattern);
  });

  test('文章显示字数统计（含"字"字）', async ({ page }) => {
    const pageContent = await page.textContent('body');
    // 应包含"字"作为字数单位
    expect(pageContent).toMatch(/\d+\s*字/);
  });

  test('文章显示阅读时间', async ({ page }) => {
    const pageContent = await page.textContent('body');
    // 应包含阅读时间（"分钟" 或 "min"）
    const hasReadTime =
      pageContent!.includes('分钟') ||
      pageContent!.includes('min') ||
      pageContent!.match(/\d+\s*分/) !== null;
    expect(hasReadTime).toBe(true);
  });

  test('文章显示作者名称"夏天夏"', async ({ page }) => {
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('夏天夏');
  });

  test('作者名链接到 GitHub 主页', async ({ page }) => {
    // 查找包含作者信息的链接
    const authorLink = page.locator('a[href*="github.com"]').first();
    await expect(authorLink).toBeVisible();

    const href = await authorLink.getAttribute('href');
    expect(href).toContain('github.com');
  });

  test.describe('多篇文章的元信息', () => {
    for (const slug of SAMPLE_SLUGS.slice(0, 5)) {
      test(`文章 ${slug} 有完整的元信息`, async ({ page }) => {
        await page.goto(`/pages/${slug}/`);
        const pageContent = await page.textContent('body');

        // 有日期
        expect(pageContent).toMatch(/\d{4}/);
        // 有作者
        expect(pageContent).toContain('夏天夏');
        // 有正文内容
        const prose = page.locator('.prose, article, .post-content, main');
        const count = await prose.count();
        expect(count).toBeGreaterThan(0);
      });
    }
  });
});
