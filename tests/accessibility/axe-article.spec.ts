import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('Axe 文章页可访问性扫描', () => {
  test('文章页无 critical/serious 可访问性违规', async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const criticalOrSerious = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalOrSerious.length > 0) {
      const details = criticalOrSerious.map(v =>
        `[${v.impact}] ${v.id}: ${v.description}\n  Elements: ${v.nodes.slice(0, 2).map(n => n.html).join(', ')}`
      ).join('\n');
      expect(criticalOrSerious, `文章页严重可访问性违规:\n${details}`).toHaveLength(0);
    }
  });

  test('多篇文章页面均无 critical 违规', async ({ page }) => {
    const slugsToTest = SAMPLE_SLUGS.slice(0, 3);

    for (const slug of slugsToTest) {
      await page.goto(`/pages/${slug}/`);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const critical = results.violations.filter(v => v.impact === 'critical');
      expect(
        critical,
        `文章 /pages/${slug}/ 有 critical 违规: ${critical.map(v => v.id).join(', ')}`
      ).toHaveLength(0);
    }
  });

  test('文章页 axe 扫描所有违规报告', async ({ page }) => {
    await page.goto(`/pages/${SAMPLE_SLUGS[0]}/`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    if (results.violations.length > 0) {
      const summary = results.violations.map(v =>
        `  - ${v.id} (${v.impact}): ${v.description}`
      ).join('\n');
      console.log(`文章页 axe 违规 (${results.violations.length}):\n${summary}`);
    }

    const severeCount = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    ).length;
    expect(severeCount).toBe(0);
  });
});
