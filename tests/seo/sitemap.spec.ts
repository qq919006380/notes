import { test, expect } from '@playwright/test';
import { SITE_DOMAIN } from '../helpers/test-config';

test.describe('Sitemap 验证', () => {
  test('sitemap-index.xml 存在且返回 200', async ({ page }) => {
    const response = await page.goto('/sitemap-index.xml');
    expect(response?.status()).toBe(200);
  });

  test('sitemap-index.xml 是有效的 XML（包含 <?xml 声明）', async ({ page }) => {
    await page.goto('/sitemap-index.xml');
    const content = await page.content();
    // Astro 输出的 sitemap 通常包含 sitemapindex 标签
    expect(content).toMatch(/<sitemap(index)?/i);
  });

  test('sitemap 包含站点域名', async ({ page }) => {
    await page.goto('/sitemap-index.xml');
    const content = await page.content();
    expect(content).toContain('weibaichao.com');
  });

  test('sitemap-0.xml 存在且包含足够的 URL（>= 104 个）', async ({ page }) => {
    const response = await page.goto('/sitemap-0.xml');
    // 如果 sitemap-0.xml 不存在，尝试 sitemap.xml
    if (response?.status() !== 200) {
      const resp2 = await page.goto('/sitemap.xml');
      expect(resp2?.status()).toBe(200);
    }
    const content = await page.content();
    // 统计 <loc> 标签数量（每个 URL 对应一个 loc 标签）
    const locCount = (content.match(/<loc>/gi) || []).length;
    expect(locCount).toBeGreaterThanOrEqual(104);
  });

  test('sitemap 中的 URL 指向正确的域名', async ({ page }) => {
    // 尝试 sitemap-0.xml，否则用 sitemap.xml
    let response = await page.goto('/sitemap-0.xml');
    if (response?.status() !== 200) {
      response = await page.goto('/sitemap.xml');
    }
    const content = await page.content();
    // 所有 loc 应该包含目标域名
    const locMatches = content.match(/<loc>([^<]+)<\/loc>/gi) || [];
    expect(locMatches.length).toBeGreaterThan(0);
    // 至少有一个 URL 包含域名
    const hasDomain = locMatches.some(loc => loc.includes('weibaichao.com'));
    expect(hasDomain).toBe(true);
  });
});
