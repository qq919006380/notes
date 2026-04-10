import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4323';
const OUT = '/tmp/ui-audit';

const pages = [
  { name: 'home-desktop', url: '/', viewport: { width: 1440, height: 900 } },
  { name: 'home-mobile', url: '/', viewport: { width: 375, height: 667 } },
  { name: 'article', url: '/pages/fa532d/', viewport: { width: 1440, height: 900 } },
  { name: 'archives', url: '/archives/', viewport: { width: 1440, height: 900 } },
  { name: 'blog-catalogue', url: '/blog/', viewport: { width: 1440, height: 900 } },
];

const browser = await chromium.launch();

for (const p of pages) {
  const context = await browser.newContext({ viewport: p.viewport });
  const page = await context.newPage();
  await page.goto(`${BASE}${p.url}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // wait for animations
  await page.screenshot({ path: `${OUT}/${p.name}.png`, fullPage: false });
  console.log(`✓ ${p.name} (${p.viewport.width}x${p.viewport.height})`);
  await context.close();
}

await browser.close();
console.log(`\nScreenshots saved to ${OUT}/`);
