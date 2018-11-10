module.exports = {
    // title: 'my-blog',  // 设置网站标题
    // dest: './dist',    // 设置输出目录
    // base: '/mt-blog/', // 设置站点根路径
    // repo: 'https://github.com/TaoXuSheng/mt-blog', // 添加 github 链接
    themeConfig: {
        // activeHeaderLinks: false, // 活动的标题链接 默认值：true 
        // displayAllHeaders: true, // 显示所有页面的标题链接 默认值：false
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Blog', link: '/blog/' },
        { text: 'Notes', link: '/notes/' },
        { text: 'About', link: 'About' }, 
        { text: 'github', link: 'https://github.com' },       
      ],
      sidebar: {
        '/blog/': [
            '',
            {
                title: 'Group 1',
                collapsable: false,
                children: [
                    // '',
                    ['four','four'],
                    ['three','three']
                ]
            },
            {
                title: 'Group 2',
                children: [
                    // '',
                    ['ng','ng_title']
                ]
            }
        ],
        '/notes/': [
          '',      
        //   'Angular1.x.md',
        //   'Angular6.md',
          ['js设计模式.md','js设计模式'],
          ['Promise.md','Promise'],
          ['webpack.md','webpack'],
          ['书籍.md','书籍'],
          ['js深入浅出.md','js深入浅出'],
          ['造轮子思路.md','造轮子思路'],
          ['ES6.md','ES6'],
          ['Nodejs.md','Nodejs'],
          ['typescript.md','typescript'],
          ['编程概念.md','编程概念'],
          ['JS概念.md','JS概念'],
          ['vue.md','vue'],
          ['前端资源.md','前端资源'],
          
        ],
        // fallback
        '/': [
          '',        
          ['contact','主页'],
          ['About','关于']
        ]
      }
    
    }
  }
  