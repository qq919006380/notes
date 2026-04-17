export const SITE_CONFIG = {
  title: '夏天夏',
  description: 'web前端技术博客,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,React,python,css3,html5,Node,git,github等技术文章。',
  author: {
    name: '夏天夏',
    link: 'https://github.com/qq919006380',
    avatar: '/img/a.jpg',
    slogan: '我也不饶岁月',
  },
  blogCreate: '2019-12-12',
  social: [
    { icon: 'lucide:mail', title: '发邮件', link: 'mailto:919006380@qq.com' },
    { icon: 'lucide:github', title: 'GitHub', link: 'https://github.com/qq919006380' },
    { icon: 'lucide:pen-tool', title: '掘金', link: 'https://juejin.cn/user/3825956194361406/posts' },
  ],
  footer: {
    createYear: 2019,
    copyrightInfo: '夏天夏 | <a href="https://github.com/qq919006380/notes/blob/master/LICENSE" target="_blank">MIT License</a>',
  },
  nav: [
    { text: '首页', link: '/' },
    { text: '个人博客', link: '/blog/' },
    { text: '学习笔记', link: '/notes/' },
    { text: '我的作品', link: '/works/' },
    {
      text: '索引', link: '/archives/',
      items: [
        { text: '分类', link: '/categories/' },
        { text: '标签', link: '/tags/' },
        { text: '归档', link: '/archives/' },
      ],
    },
  ],
  indexImg: {
    navColor: 2,
    switchNavColor: true,
    bgTimeColor: true,
    bgTimeColorArray: ['transparent', 'rgba(255, 148, 48, .2)', 'rgba(0, 0, 0, .3)', 'rgba(0, 0, 0, .5)'],
    descFade: true,
    desc: ['Hello world!'],
    descFontSize: '1.4rem',
    descFadeInTime: 200,
    descFadeOutTime: 100,
    descNextTime: 800,
  },
  bodyBgImg: '/img/bg.jpg',
} as const;

export const PAGE_SIZE = 10;
