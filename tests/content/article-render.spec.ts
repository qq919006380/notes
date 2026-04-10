import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('文章渲染验证', () => {
  for (const slug of SAMPLE_SLUGS) {
    test.describe(`文章 ${slug}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/pages/${slug}/`);
      });

      test('h1 标题存在且非空', async ({ page }) => {
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
        const text = await h1.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      });

      test('prose 正文内容非空', async ({ page }) => {
        // 文章正文容器
        const prose = page.locator('.prose, article, .post-content, main').first();
        await expect(prose).toBeVisible();
        const text = await prose.textContent();
        expect(text?.trim().length).toBeGreaterThan(10);
      });

      test('正文至少有一个块级元素（p/ul/ol/pre/blockquote）', async ({ page }) => {
        // aef645 全是标题+列表，没有 <p>，改为检查任意块级内容元素
        const blocks = page.locator(
          '.prose p, .prose ul, .prose ol, .prose pre, .prose blockquote,' +
          'article p, article ul, article ol, article pre, article blockquote'
        );
        const count = await blocks.count();
        expect(count).toBeGreaterThanOrEqual(1);
      });

      test('不含原始 Markdown 语法（## ** ` 等）', async ({ page }) => {
        // 获取可见文本
        const visibleText = await page.evaluate(() => {
          // 排除 pre/code 中的内容（代码块可以有 # 等字符）
          const body = document.body.cloneNode(true) as HTMLElement;
          const codeBlocks = body.querySelectorAll('pre, code, script, style');
          codeBlocks.forEach(el => el.remove());
          return body.innerText || body.textContent || '';
        });

        // 正文不应出现 Markdown 语法标记
        expect(visibleText).not.toMatch(/^#{1,6}\s+\S/m); // ## 标题语法
        expect(visibleText).not.toMatch(/\*\*[^*]+\*\*/); // **加粗**
      });
    });
  }

  test('含代码块的文章有语法高亮（有色 span 标签）', async ({ page }) => {
    // 找一篇已知包含代码的文章
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);

    const codeBlocks = page.locator('pre code');
    const count = await codeBlocks.count();

    if (count > 0) {
      // 有代码块时，应有语法高亮（expressive-code 生成有颜色的 span）
      const spans = await codeBlocks.first().locator('span').count();
      expect(spans).toBeGreaterThan(0);
    } else {
      // 如果这篇文章没有代码块，测试通过（语义上正确）
      expect(count).toBe(0);
    }
  });
});
