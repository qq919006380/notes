module.exports = {
  base: '/notes/', // 设置站点根路径  
  dest: './dist',    // 设置输出目录
  title: '夏天夏',  // 设置网站标题
  description: '12345，上山打老虎。',
  themeConfig: {
    repo: 'qq919006380/notes', // 添加 github 链接
    nav: [
      { text: 'Home', link: '/' },//主页
      { text: 'Blog', link: '/blog/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'About', link: 'about/about.md' },

    ],
    sidebar: {
      // '/': [ 
      //   '',        
      //   ['主页','主页'],
      // ],
      '/blog/': [
        '', //README
        ['angular1.x使用', 'angular1.x的使用总结'],
        ['three', 'three'],
        ['ng', 'ng_title'],
        ['闭包', '闭包']
      ],
      '/notes/': [
        '',
        {
          title: '笔记',
          // collapsable: false,//侧边栏自动收缩展开
          children: [
            // '',
            //   'Angular1.x.md',
            //   'Angular6.md',
            ['js设计模式.md', 'js设计模式'],
            ['Promise.md', 'Promise'],
            ['webpack.md', 'webpack'],
            ['js深入浅出.md', 'js深入浅出'],
            ['造轮子思路.md', '造轮子思路'],
            ['ES6.md', 'ES6'],
            ['Nodejs.md', 'Nodejs'],
            ['typescript.md', 'typescript'],
            ['编程概念.md', '编程概念'],
            ['JS概念.md', 'JS概念'],
            ['vue.md', 'vue'],
            ['web前端/实用代码段.md', '代码段'],
            // ['web前端/ajax&fetch&跨域.md','ajax&fetch&跨域'],
            ['web前端/git笔记.md', 'git笔记'],
            ['web前端/浏览器兼容问题.md', '浏览器兼容问题'],
            ['web前端/DOM和事件.md', 'DOM和事件'],
            // ['web前端/HTML5+CSS3.md','HTML5+CSS3'],
            ['web前端/实用代码段.md', '实用代码段'],
            // ['web前端/flex布局&Grid 布局.md','flex布局&Grid 布局'],
            ['web前端/JavaScript.md', 'JavaScript']

          ]
        },
        {
          title: '资源',
          children: [
            // '',
            ['前端资源.md', '前端资源'],
            ['书籍.md', '书籍'],
          ]
        }
      ]

    }

  }
}
