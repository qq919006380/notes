export const BASE_URL = 'http://localhost:4323';

export const BREAKPOINTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1024, height: 768 },
  desktop: { width: 1440, height: 900 },
};

export const DESIGN_TOKENS = {
  accentColor: 'rgb(17, 168, 205)',
  progressColor: 'rgb(177, 96, 234)',
  navbarHeight: 57.6, // 3.6rem * 16
  sidebarWidth: 288, // 18rem * 16
  contentWidth: 860,
  homePageWidth: 1100,
  rightMenuWidth: 230,
  bodyBg: 'rgb(244, 244, 244)',
  mainBg: 'rgb(255, 255, 255)',
  textColor: 'rgb(0, 64, 80)',
  borderColor: 'rgba(0, 0, 0, 0.15)',
};

/** 10 个已知有效的文章 slug，覆盖多个 collection */
export const SAMPLE_SLUGS = [
  'fa532d', // 小白都能看懂的闭包 (blog)
  'aef645', // 关于后台管理应用 (blog)
  'fb0623', // 关于技术的取舍 (blog)
  '796ac5', // 了不起的盖茨比有感 (posts)
  '67470e', // docker (posts)
  'c458cd', // 切换node版本 (blog)
  'd7b35b', // 如何优雅的写事件代理 (blog)
  '5fc367', // 2019年总结 (blog)
  '0c32e0', // ES6 (notes)
  '1b420d', // vue (notes)
];

/** 用于文章导航测试的已知文章 */
export const ARTICLE_FOR_NAV = 'fa532d'; // 小白都能看懂的闭包

/** 站点名称 */
export const SITE_NAME = '夏天夏';

/** 站点域名 */
export const SITE_DOMAIN = 'https://www.weibaichao.com';

/** 预期的特殊页面 URL */
export const SPECIAL_PAGES = [
  '/',
  '/blog/',
  '/notes/',
  '/works/',
  '/archives/',
  '/categories/',
  '/tags/',
];
