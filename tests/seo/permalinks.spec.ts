import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

interface PermalinkEntry {
  slug: string;
  title: string;
  collection: string;
}

// 兼容 ESM：使用 import.meta.url 替代 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 从文件系统读取 permalink-map.json
const permalinkMap: PermalinkEntry[] = JSON.parse(
  readFileSync(join(__dirname, '../../scripts/permalink-map.json'), 'utf-8')
);

test.describe('Permalink 路由验证（103 个文章 URL）', () => {
  test('permalink-map.json 共有 103 个条目', () => {
    expect(permalinkMap.length).toBe(103);
  });

  // 将 103 个 slug 分批测试，每批 20 个
  const batchSize = 20;
  for (let i = 0; i < permalinkMap.length; i += batchSize) {
    const batch = permalinkMap.slice(i, i + batchSize);
    const batchIndex = Math.floor(i / batchSize) + 1;
    const batchEnd = Math.min(i + batchSize, permalinkMap.length);

    test(`批次 ${batchIndex}：文章 ${i + 1}-${batchEnd} 均返回 200`, async ({ page }) => {
      for (const entry of batch) {
        const url = `/pages/${entry.slug}/`;
        const response = await page.goto(url);
        expect(
          response?.status(),
          `文章 "${entry.title}" (${url}) 应返回 200，实际: ${response?.status()}`
        ).toBe(200);
      }
    });
  }

  test('文章 URL 不发生非预期重定向（URL 结构保留 slug）', async ({ page }) => {
    // 抽查 10 个 slug 验证无重定向
    const sample = permalinkMap.slice(0, 10);
    const redirectedSlugs: string[] = [];

    for (const entry of sample) {
      const expectedPath = `/pages/${entry.slug}/`;
      await page.goto(expectedPath);
      const finalUrl = page.url();

      // 最终 URL 应包含原始 slug
      if (!finalUrl.includes(entry.slug)) {
        redirectedSlugs.push(`${entry.slug}: 最终跳转到 ${finalUrl}`);
      }
    }

    expect(
      redirectedSlugs,
      `以下 slug 发生了非预期重定向:\n${redirectedSlugs.join('\n')}`
    ).toHaveLength(0);
  });

  test('permalink-map 包含多个 collection 类型', () => {
    const collections = new Set(permalinkMap.map(e => e.collection));
    expect(collections.size).toBeGreaterThanOrEqual(2);
  });
});
