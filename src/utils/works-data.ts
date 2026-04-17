export interface WorkItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string;
  category: string;
  stars?: number;
  demo: string;
  repo?: string;
  logo: string;
  accent: string;
  featured?: boolean;
}

export const WORKS: WorkItem[] = [
  {
    slug: 'pencil-vue',
    name: 'pencil-vue',
    tagline: '手绘风格的 Vue 组件库',
    description: `以前一直想做一个自己的组件库，但经过市场调研发现现在的组件库已经非常全了，没必要再做一次。直到发现了 [rough](https://github.com/rough-stuff/rough) 这个手绘风格的工具库，灵感一闪——做一个手绘风格的组件库吧。

实现原理很简单：动态计算出 div 的宽高然后把 div 隐藏掉，使用 rough 来描绘出 div 的宽高。主要目的是为了抛砖引玉学习组件库开发中的架构、设计、封装等思想。`,
    stack: 'Vue · rough.js',
    category: 'UI 组件库',
    stars: 42,
    demo: 'https://pencil-vue.cn/',
    repo: 'https://github.com/qq919006380/pencil-vue',
    logo: 'https://pencil-vue.cn/logo.jpg',
    accent: '#f59e0b',
  },
  {
    slug: 'mindmap',
    name: 'MindMap',
    tagline: '在线思维导图编辑器',
    description: `之前有过图在线编辑的需求，从零搭建工作量非常巨大——涉及拖拽、画布数据结构、物料、组件架构等大量知识。

后来发现了 [antv-x6](https://antv-x6.gitee.io/zh/) 这个图编辑引擎，开箱即用完全满足业务需求。这个思维导图就是基于 x6 引擎构建的，支持多种布局，在线使用、无需安装。`,
    stack: 'Vue · AntV X6',
    category: '效率工具',
    stars: 21,
    demo: 'https://www.minmap.cn',
    repo: 'https://github.com/qq919006380/MindMap',
    logo: 'https://www.minmap.cn/logo.jpg',
    accent: '#10b981',
  },
  {
    slug: 'nftgen',
    name: 'NFT Generator',
    tagline: '批量生成百万张 NFT 头像的艺术创作工具',
    description: `2021 年 Web3 领域最火的 NFT 出现了。那时候想着一套 NFT 需要好几万张，如果设计师一张一张合成会很慢——就做了这个工具。

支持批量生成百万张 NFT 头像，可以设置元素稀有度，解放设计师的双手。功能简单好用，专注于把"批量合成"这一件事做到极致。`,
    stack: 'Vue · Canvas',
    category: '设计工具',
    demo: 'https://nftgen.cn/',
    logo: 'https://nftgen.cn/assets/3.c36d0c95.png',
    accent: '#6366f1',
    featured: true,
  },
  {
    slug: 'charactergen',
    name: 'CharacterGen',
    tagline: 'AI 角色设计器 / OC Maker',
    description: `用 AI 生成完整的角色设计方案，支持 30+ 种风格的 turnarounds（三视图）、表情、姿势，单次生成不到 60 秒。

面向插画师、游戏开发者、小说作者、TTRPG 玩家。输入角色设定，AI 会输出一整套可用于原画参考、立绘、角色扮演的视觉素材。`,
    stack: 'Next.js · AI',
    category: 'AI 工具',
    demo: 'https://charactergen.app/',
    logo: 'https://charactergen.app/logo.png',
    accent: '#a855f7',
    featured: true,
  },
  {
    slug: 'ai-logo-generator',
    name: 'AI Logo Generator',
    tagline: '30 秒生成专业 Logo',
    description: `描述你的品牌，AI 立即输出一组可商用的 Logo 设计方案。无需任何设计技能，也不用一遍遍改稿——换几个关键词就能迭代出新风格。

主要面向个人开发者、早期创业公司、自由职业者——那些需要快速建立品牌形象但预算有限的人。`,
    stack: 'Next.js · AI',
    category: 'AI 工具',
    demo: 'https://ailogogenerator.online/',
    logo: 'https://ailogogenerator.online/logo.png',
    accent: '#ef4444',
    featured: true,
  },
  {
    slug: 'bucici',
    name: 'Bucici',
    tagline: '每日幸运数字 · 星座数字占卜',
    description: `基于星座与数字命理算法的每日幸运数字工具。为 12 星座提供个性化的每日数字推荐，每天更新。

轻松愉快的小工具，给愿意把运气当回事的人一个每日打开的理由。`,
    stack: 'Next.js',
    category: '趣味工具',
    demo: 'https://bucici.com/',
    logo: 'https://bucici.com/logo.png',
    accent: '#ec4899',
    featured: true,
  },
  {
    slug: 'icebreaker-games',
    name: 'Ice Breaker Games',
    tagline: '免费的破冰游戏集合',
    description: `为团队、学生、成年人准备的破冰游戏集合。从 5 分钟短活动到团队建设全日程，全部免费、无需准备。

适合项目启动会、团建、课堂、workshop——需要快速让陌生人熟悉起来的任何场景。搜索 + 过滤让你按时长、人数、目的快速找到合适的游戏。`,
    stack: 'Next.js',
    category: '社交工具',
    demo: 'https://icebreakergames.club/',
    logo: 'https://icebreakergames.club/logo.png',
    accent: '#14b8a6',
    featured: true,
  },
  {
    slug: 'askjoey',
    name: 'AskJoey',
    tagline: 'AI 约会资料优化器',
    description: `5 分钟优化你的约会资料。AI 会给照片评分、重写 bio、生成对话开场白——覆盖 Tinder、Bumble、Hinge、Facebook Dating。

已为 5,000+ 份资料做过优化。面向那些"知道自己拍得不错但就是没人回复"的用户——问题往往不在照片本身，而在呈现方式和 bio 的组合。`,
    stack: 'Next.js · AI',
    category: 'AI 工具',
    demo: 'https://askjoey.io/',
    logo: 'https://askjoey.io/logo.png',
    accent: '#f97316',
    featured: true,
  },
  {
    slug: 'filz',
    name: 'Filz',
    tagline: '免登录的文件在线秒传',
    description: `很多时候需要传大文件给微信好友，或者跨端传送会遇到各种限制——于是做了这个免登录的文件传输工具。

也可以拿来做静态站点托管。极简、免费、无需登录、不限速——把"文件分享"最核心的那件事做到最简单。`,
    stack: 'Next.js',
    category: '效率工具',
    demo: 'https://filz.io/',
    logo: 'https://filz.io/favicon.ico',
    accent: '#0969A5',
  },
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export function buildDemoUrl(work: WorkItem): string {
  const sep = work.demo.includes('?') ? '&' : '?';
  const params = `utm_source=weibaichao.com&utm_medium=portfolio&utm_campaign=works_${work.slug}`;
  return `${work.demo}${sep}${params}`;
}
