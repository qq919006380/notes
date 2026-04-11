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
    { icon: 'icon-youjian', title: '发邮件', link: 'mailto:919006380@qq.com' },
    { icon: 'icon-github', title: 'GitHub', link: 'https://github.com/qq919006380' },
    { icon: 'icon-juejin', title: '掘金', link: 'https://juejin.cn/user/3825956194361406/posts' },
  ],
  footer: {
    createYear: 2019,
    copyrightInfo: '夏天夏 | <a href="https://github.com/qq919006380/notes/blob/master/LICENSE" target="_blank">MIT License</a>',
  },
  nav: [
    { text: '首页', link: '/' },
    {
      text: '个人博客', link: '/blog/',
      items: [
        {
          text: '技术分享',
          items: [
            { text: '小白都能看懂的闭包', link: '/pages/fa532d/' },
            { text: '关于后台管理应用', link: '/pages/aef645/' },
            { text: '关于技术的取舍', link: '/pages/fb0623/' },
            { text: '前端工程化', link: '/pages/495485/' },
            { text: '切换node版本', link: '/pages/c458cd/' },
            { text: '如何优雅的写事件代理', link: '/pages/d7b35b/' },
            { text: '我所不了解的技术', link: '/pages/e7e70a/' },
            { text: '我喜欢的parcel', link: '/pages/03aae3/' },
            { text: 'angular1使用', link: '/pages/a61c40/' },
            { text: 'npm script打造前端工作流', link: '/pages/367d88/' },
          ],
        },
        {
          text: '发布一个node插件',
          items: [
            { text: '发布一个npm包', link: '/pages/c63419/' },
            { text: '如何打包一个插件工具库', link: '/pages/dd8138/' },
            { text: '打包工具的选择', link: '/pages/9f5618/' },
          ],
        },
        {
          text: '年终总结',
          items: [
            { text: '2019年总结', link: '/pages/5fc367/' },
            { text: '2020年总结', link: '/pages/15eaf7/' },
            { text: '2021年总结', link: '/pages/5627f3/' },
          ],
        },
      ],
    },
    {
      text: '学习笔记', link: '/notes/',
      items: [
        { text: 'JavaScript', link: '/pages/71e5ba/' },
        { text: 'CSS', link: '/pages/5516f8/' },
        { text: '框架', link: '/pages/1b420d/' },
        { text: 'Node', link: '/pages/67ce30/' },
        { text: '服务', link: '/pages/3b063c/' },
        { text: 'web3', link: '/pages/693942/' },
        { text: '其他', link: '/pages/fb011d/' },
      ],
    },
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
