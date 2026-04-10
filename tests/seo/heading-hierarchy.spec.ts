import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('标题层级结构验证', () => {
  const pagesToCheck = [
    { name: '首页', path: '/' },
    { name: '归档页', path: '/archives/' },
    { name: '分类页', path: '/categories/' },
    { name: '标签页', path: '/tags/' },
    { name: '博客目录', path: '/blog/' },
  ];

  /**
   * 检查标题层级是否有跳级（如 h1 直接到 h3，跳过 h2）
   */
  async function getHeadingHierarchyViolations(page: any): Promise<string[]> {
    return page.evaluate(() => {
      const headings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      ) as HTMLElement[];
      const violations: string[] = [];
      let prevLevel = 0;

      for (const heading of headings) {
        const level = parseInt(heading.tagName.charAt(1));
        // 跳级：前一级为 1，当前为 3（跳过了 2）
        if (prevLevel > 0 && level > prevLevel + 1) {
          violations.push(
            `标题跳级：h${prevLevel} -> h${level} (内容: "${heading.textContent?.trim().slice(0, 30)}")`
          );
        }
        prevLevel = level;
      }
      return violations;
    });
  }

  for (const pageInfo of pagesToCheck) {
    test(`${pageInfo.name} 有且仅有 1 个 h1 标签`, async ({ page }) => {
      await page.goto(pageInfo.path);
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test(`${pageInfo.name} 标题层级不跳级`, async ({ page }) => {
      await page.goto(pageInfo.path);
      const violations = await getHeadingHierarchyViolations(page);
      expect(violations, `标题层级跳级:\n${violations.join('\n')}`).toHaveLength(0);
    });
  }

  test.describe('文章页面标题层级', () => {
    for (const slug of SAMPLE_SLUGS.slice(0, 5)) {
      test(`文章 ${slug} 有且仅有 1 个 h1`, async ({ page }) => {
        await page.goto(`/pages/${slug}/`);
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);
      });

      test(`文章 ${slug} 标题层级不跳级`, async ({ page }) => {
        await page.goto(`/pages/${slug}/`);
        const violations = await getHeadingHierarchyViolations(page);
        expect(violations, `标题层级跳级:\n${violations.join('\n')}`).toHaveLength(0);
      });
    }
  });

  test('文章页面 h1 为文章标题内容', async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    const h1Text = await page.locator('h1').first().textContent();
    expect(h1Text?.trim()).toBeTruthy();
    expect(h1Text?.trim().length).toBeGreaterThan(0);

    // h1 内容应与 <title> 中的文章标题部分匹配
    const title = await page.title();
    // title 格式为 "文章标题 | 夏天夏"，提取文章标题部分
    const articleTitle = title.split('|')[0].trim();
    expect(h1Text?.trim()).toContain(articleTitle.slice(0, 5)); // 至少前5个字符匹配
  });
});
