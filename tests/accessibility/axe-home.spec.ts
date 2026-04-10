import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Axe 首页可访问性扫描', () => {
  test('首页无 critical/serious 可访问性违规', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const criticalOrSerious = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalOrSerious.length > 0) {
      const details = criticalOrSerious.map(v =>
        `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} elements)`
      ).join('\n');
      expect(criticalOrSerious, `发现严重可访问性违规:\n${details}`).toHaveLength(0);
    }
  });

  test('首页整体可访问性检查（仅报告违规数量）', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // 记录所有违规以便调试
    const violations = results.violations;
    if (violations.length > 0) {
      const summary = violations.map(v =>
        `  - ${v.id} (${v.impact}): ${v.description}`
      ).join('\n');
      console.log(`首页 axe 违规 (${violations.length}):\n${summary}`);
    }

    // 严格：0 critical/serious 违规
    const severeCount = violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    ).length;
    expect(severeCount).toBe(0);
  });

  test('首页 axe 扫描排除第三方内容', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('#search-box') // Pagefind 搜索框可能有自己的 a11y 问题
      .analyze();

    const criticalOrSerious = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalOrSerious).toHaveLength(0);
  });
});
