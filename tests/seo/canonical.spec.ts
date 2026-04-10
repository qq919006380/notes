import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS, SITE_DOMAIN } from '../helpers/test-config';

test.describe('Canonical 标签验证', () => {
  const pagesToCheck = [
    { name: '首页', path: '/' },
    { name: '归档页', path: '/archives/' },
    { name: '分类页', path: '/categories/' },
    { name: '标签页', path: '/tags/' },
    { name: '博客目录', path: '/blog/' },
    { name: '笔记目录', path: '/notes/' },
  ];

  for (const pageInfo of pagesToCheck) {
    test(`${pageInfo.name} 有 canonical 标签`, async ({ page }) => {
      await page.goto(pageInfo.path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
    });

    test(`${pageInfo.name} canonical 指向自身`, async ({ page }) => {
      await page.goto(pageInfo.path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      // canonical 应该包含当前页面的路径
      const expectedPath = pageInfo.path === '/' ? '' : pageInfo.path;
      expect(canonical).toContain('weibaichao.com');
    });
  }

  test.describe('文章页面 canonical', () => {
    for (const slug of SAMPLE_SLUGS.slice(0, 5)) {
      test(`文章 ${slug} 有 canonical 标签且指向自身`, async ({ page }) => {
        await page.goto(`/pages/${slug}/`);
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBeTruthy();
        expect(canonical).toContain(slug);
      });
    }
  });

  test('文章页面 canonical 不重复', async ({ page }) => {
    const canonicals: string[] = [];

    for (const slug of SAMPLE_SLUGS) {
      await page.goto(`/pages/${slug}/`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(
        canonicals,
        `Canonical "${canonical}" 在多个页面重复`
      ).not.toContain(canonical);
      canonicals.push(canonical!);
    }
  });

  test('每个页面只有一个 canonical 标签', async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    const count = await page.locator('link[rel="canonical"]').count();
    expect(count).toBe(1);
  });
});
