import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Axe 归档页可访问性扫描', () => {
  test('归档页（/archives/）无 critical/serious 违规', async ({ page }) => {
    await page.goto('/archives/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const criticalOrSerious = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalOrSerious.length > 0) {
      const details = criticalOrSerious.map(v =>
        `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`
      ).join('\n');
      expect(criticalOrSerious, `归档页严重违规:\n${details}`).toHaveLength(0);
    }
  });

  test('分类页（/categories/）无 critical/serious 违规', async ({ page }) => {
    await page.goto('/categories/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const severeViolations = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    );
    expect(severeViolations).toHaveLength(0);
  });

  test('标签页（/tags/）无 critical/serious 违规', async ({ page }) => {
    await page.goto('/tags/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const severeViolations = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    );
    expect(severeViolations).toHaveLength(0);
  });

  test('归档页 axe 扫描完整违规报告', async ({ page }) => {
    await page.goto('/archives/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.log(`归档页所有 axe 违规 (${results.violations.length}):`);
      results.violations.forEach(v => {
        console.log(`  - [${v.impact}] ${v.id}: ${v.description}`);
      });
    }

    const severeCount = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    ).length;
    expect(severeCount).toBe(0);
  });
});
