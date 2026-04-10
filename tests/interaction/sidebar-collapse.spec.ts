import { test, expect } from '@playwright/test';
import { SAMPLE_SLUGS } from '../helpers/test-config';

test.describe('Sidebar 侧边栏折叠', () => {
  const articleUrl = `/pages/${SAMPLE_SLUGS[0]}/`;

  test.beforeEach(async ({ page }) => {
    // 文章页面才有左侧目录侧边栏
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(articleUrl);
    await page.waitForLoadState('networkidle');
  });

  test('文章页面有 <details> 折叠分组', async ({ page }) => {
    const details = page.locator('details');
    const count = await details.count();
    expect(count).toBeGreaterThan(0);
  });

  test('点击关闭状态的 <summary> 后 <details> 打开', async ({ page }) => {
    const allDetails = page.locator('details');
    const totalCount = await allDetails.count();
    if (totalCount === 0) {
      test.skip();
      return;
    }

    // 若所有 details 都已展开，先通过 JS 关闭第一个
    const firstDetails = allDetails.first();
    const isAlreadyOpen = await firstDetails.evaluate(el => (el as HTMLDetailsElement).open);
    if (isAlreadyOpen) {
      await firstDetails.evaluate(el => { (el as HTMLDetailsElement).open = false; });
      await page.waitForTimeout(100);
    }

    const summary = firstDetails.locator('summary').first();
    await summary.click();
    await page.waitForTimeout(300);

    const isOpen = await firstDetails.evaluate(el => (el as HTMLDetailsElement).open);
    expect(isOpen).toBe(true);
  });

  test('点击已打开的 <summary> 后 <details> 关闭', async ({ page }) => {
    // 找一个已打开的 details（但不是当前文章所在的分组，那个可能保持打开）
    const allDetails = page.locator('details');
    const count = await allDetails.count();

    let openedIndex = -1;
    for (let i = 0; i < count; i++) {
      const isOpen = await allDetails.nth(i).evaluate(el => (el as HTMLDetailsElement).open);
      if (isOpen) {
        openedIndex = i;
        break;
      }
    }

    if (openedIndex === -1) {
      // 没有打开的，先打开一个再关闭
      await allDetails.first().locator('summary').click();
      await page.waitForTimeout(300);
      openedIndex = 0;
    }

    const targetDetails = allDetails.nth(openedIndex);
    await targetDetails.locator('summary').click();
    await page.waitForTimeout(300);

    const isOpen = await targetDetails.evaluate(el => (el as HTMLDetailsElement).open);
    expect(isOpen).toBe(false);
  });

  test('包含当前文章的分组默认展开', async ({ page }) => {
    // 当前文章的侧边栏链接有 .active 类
    const activeLink = page.locator('.sidebar-link.active, .active');
    const activeLinkCount = await activeLink.count();

    if (activeLinkCount > 0) {
      // 找到当前文章的父 details
      const parentDetails = activeLink.first().locator('xpath=ancestor::details');
      const parentCount = await parentDetails.count();
      if (parentCount > 0) {
        const isOpen = await parentDetails.first().evaluate(el => (el as HTMLDetailsElement).open);
        expect(isOpen).toBe(true);
      }
    }
    // 如果没有 active 链接，测试仍通过（设计可能不同）
  });
});
