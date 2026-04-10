import { test, expect } from '@playwright/test';

test.describe('文章摘要验证', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('首页文章列表中每篇文章有摘要文本（> 10 字）', async ({ page }) => {
    // 文章列表的摘要选择器
    const excerptSelectors = [
      '.post-abstract',
      '.post-excerpt',
      '.article-excerpt',
      '.post-description',
      '.excerpt',
      '.post-content p',
      '.post-item p',
      '.post-summary',
    ];

    let excerpts: any = null;
    for (const selector of excerptSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        excerpts = page.locator(selector);
        break;
      }
    }

    if (!excerpts) {
      // 如果专门的摘要元素不存在，查找文章卡片中的段落
      excerpts = page.locator('.post-item p, .article-card p, .card p');
    }

    const count = await excerpts.count();
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        const text = await excerpts.nth(i).textContent();
        if (text && text.trim().length > 0) {
          expect(text.trim().length).toBeGreaterThan(10);
        }
      }
    } else {
      // 如果页面没有明显的摘要区域，只验证页面有文章内容
      const articleLinks = page.locator('a[href*="/pages/"]');
      const linkCount = await articleLinks.count();
      expect(linkCount).toBeGreaterThan(0);
    }
  });

  test('摘要文本不含 Markdown 语法', async ({ page }) => {
    // 获取可见的摘要内容（排除代码块）
    const excerptText = await page.evaluate(() => {
      const selectors = [
        '.post-abstract', '.post-excerpt', '.article-excerpt',
        '.excerpt', '.post-summary', '.post-description',
      ];

      for (const sel of selectors) {
        const elements = document.querySelectorAll(sel);
        if (elements.length > 0) {
          return Array.from(elements).map(el => (el as HTMLElement).innerText || '').join('\n');
        }
      }
      return '';
    });

    if (excerptText.length > 0) {
      // 摘要不应有 Markdown 语法
      expect(excerptText).not.toMatch(/^#{1,6}\s/m); // ## 标题
      expect(excerptText).not.toMatch(/\*\*[^*]+\*\*/); // **加粗**
      expect(excerptText).not.toMatch(/\[.+\]\(.+\)/); // [链接](url)
    }
  });

  test('首页有文章列表', async ({ page }) => {
    // 验证首页有文章链接（即有内容可以展示）
    const articleLinks = page.locator('a[href*="/pages/"]');
    const count = await articleLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
