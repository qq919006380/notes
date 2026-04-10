import { test, expect } from '@playwright/test';

test.describe('robots.txt 验证', () => {
  test('robots.txt 存在且返回 200', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
  });

  test('robots.txt 包含 Sitemap 指令', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.content();
    expect(content).toMatch(/Sitemap:/i);
  });

  test('robots.txt 中 Sitemap 指向 sitemap-index.xml 或 sitemap.xml', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.content();
    expect(content).toMatch(/Sitemap:.*sitemap/i);
  });

  test('robots.txt 不禁止 /pages/ 路径', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.content();

    // 解析 Disallow 规则，确保没有明确禁止 /pages/
    const lines = content.split('\n').map(l => l.trim());
    const disallowLines = lines.filter(l => l.toLowerCase().startsWith('disallow:'));

    for (const line of disallowLines) {
      const path = line.replace(/disallow:\s*/i, '').trim();
      expect(
        path,
        `robots.txt 不应禁止 /pages/ 路径，但发现: ${line}`
      ).not.toBe('/pages/');
    }
  });

  test('robots.txt 包含 User-agent 声明', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.content();
    expect(content).toMatch(/User-agent:/i);
  });

  test('robots.txt 不完全禁止爬虫（Disallow: / 不应对所有 User-agent 生效）', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.content();

    // 如果有 "Disallow: /"，应该只针对特定 User-agent 而非 "*"
    if (content.includes('Disallow: /')) {
      const lines = content.split('\n').map(l => l.trim());
      let currentAgent = '';
      let hasWildcardDisallowAll = false;

      for (const line of lines) {
        if (line.toLowerCase().startsWith('user-agent:')) {
          currentAgent = line.replace(/user-agent:\s*/i, '').trim();
        }
        if (line === 'Disallow: /' && currentAgent === '*') {
          hasWildcardDisallowAll = true;
        }
      }

      expect(hasWildcardDisallowAll).toBe(false);
    }
  });
});
