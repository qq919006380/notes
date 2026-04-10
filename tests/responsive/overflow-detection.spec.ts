import { test, expect } from '@playwright/test';
import { BASE_URL, BREAKPOINTS, SAMPLE_SLUGS } from '../helpers/test-config';
import { checkOverflow } from '../helpers/test-utils';

const OVERFLOW_SELECTORS = [
  '.post-content',
  '.post-item',
  '.card-box',
  '.navbar',
  '.footer',
  '.sidebar-link',
  '.nav-link',
  '.category-link',
  '.tag-link',
  'h1',
  'h2',
  'h3',
  '.post-title',
  '.post-meta',
  '.banner-content',
];

const PAGE_TYPES = [
  { name: 'home', url: '/' },
  { name: 'article', url: `/pages/${SAMPLE_SLUGS[0]}/` },
  { name: 'archives', url: '/archives/' },
  { name: 'categories', url: '/categories/' },
  { name: 'tags', url: '/tags/' },
  { name: 'blog catalogue', url: '/blog/' },
];

for (const bp of Object.entries(BREAKPOINTS)) {
  const [bpName, bpSize] = bp;

  for (const pageType of PAGE_TYPES) {
    test(`[${bpName} ${bpSize.width}px] ${pageType.name} 页面无水平溢出`, async ({ page }) => {
      await page.setViewportSize(bpSize);
      await page.goto(`${BASE_URL}${pageType.url}`);
      await page.waitForLoadState('networkidle');

      const allOverflows: Array<{ selector: string; index: number; scrollWidth: number; clientWidth: number }> = [];

      for (const selector of OVERFLOW_SELECTORS) {
        const results = await checkOverflow(page, selector);
        allOverflows.push(...results);
      }

      if (allOverflows.length > 0) {
        const details = allOverflows
          .slice(0, 5)
          .map((o) => `  selector="${o.selector}" index=${o.index} scroll=${o.scrollWidth} client=${o.clientWidth}`)
          .join('\n');
        expect(allOverflows.length, `发现 ${allOverflows.length} 处溢出:\n${details}`).toBe(0);
      }
    });
  }
}
