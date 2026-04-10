import { Page, Locator } from '@playwright/test';

export interface OverflowResult {
  selector: string;
  index: number;
  scrollWidth: number;
  clientWidth: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * 检测页面中指定选择器的元素是否存在水平溢出
 */
export async function checkOverflow(page: Page, selector: string): Promise<OverflowResult[]> {
  return page.evaluate((sel) => {
    const elements = document.querySelectorAll(sel);
    const results: OverflowResult[] = [];
    elements.forEach((el, index) => {
      const htmlEl = el as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlEl);
      const overflow = computedStyle.overflow;
      const overflowX = computedStyle.overflowX;
      // 如果元素没有设置 overflow hidden/auto/scroll，且内容宽度超过容器宽度则视为溢出
      const isOverflowControlled =
        overflow === 'hidden' ||
        overflow === 'auto' ||
        overflow === 'scroll' ||
        overflowX === 'hidden' ||
        overflowX === 'auto' ||
        overflowX === 'scroll';
      if (!isOverflowControlled && htmlEl.scrollWidth > htmlEl.clientWidth + 2) {
        results.push({
          selector: sel,
          index,
          scrollWidth: htmlEl.scrollWidth,
          clientWidth: htmlEl.clientWidth,
        });
      }
    });
    return results;
  }, selector);
}

/**
 * 解析 CSS rgb/rgba 颜色字符串为 RGB 对象
 */
export function parseRGB(cssColor: string): RGB {
  const match = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) throw new Error(`无法解析颜色: ${cssColor}`);
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
  };
}

/**
 * 计算两个颜色之间的相对亮度（用于对比度计算）
 */
function relativeLuminance(rgb: RGB): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(rgb.r) + 0.7152 * toLinear(rgb.g) + 0.0722 * toLinear(rgb.b);
}

/**
 * 计算前景色和背景色的对比度比值（WCAG 标准）
 */
export function contrastRatio(fg: RGB, bg: RGB): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 获取两个元素的位置关系
 */
export async function getBoundingBoxRelation(
  el1: Locator,
  el2: Locator,
): Promise<'above' | 'below' | 'left' | 'right' | 'overlapping'> {
  const box1 = await el1.boundingBox();
  const box2 = await el2.boundingBox();
  if (!box1 || !box2) throw new Error('元素不可见，无法获取位置');

  const center1y = box1.y + box1.height / 2;
  const center2y = box2.y + box2.height / 2;
  const center1x = box1.x + box1.width / 2;
  const center2x = box2.x + box2.width / 2;

  // 检查是否重叠
  const overlapX = box1.x < box2.x + box2.width && box1.x + box1.width > box2.x;
  const overlapY = box1.y < box2.y + box2.height && box1.y + box1.height > box2.y;
  if (overlapX && overlapY) return 'overlapping';

  if (Math.abs(center1y - center2y) > Math.abs(center1x - center2x)) {
    return center1y < center2y ? 'above' : 'below';
  } else {
    return center1x < center2x ? 'left' : 'right';
  }
}
