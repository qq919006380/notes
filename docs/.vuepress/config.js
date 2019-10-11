module.exports = {
  // base: "/notes/", // 设置站点根路径 注意：如果有域名则不需要
  title: "夏天夏", // 设置网站标题
  description: "编程是一门手艺活",
  themeConfig: {
    // repo: "qq919006380/notes", // 添加 github 链接
    docsDir: "docs",
    editLinks: true,
    // editLinkText: "帮助我改善此页面",
    // lastUpdated: "上次更新", // string | boolean
    nav: [
      { text: "Home", link: "/" }, //主页
      { text: "Blog", link: "/blog/" },
      { text: "Notes", link: "/notes/" }
    ],

    sidebar: {
      // '/': [
      //   '',
      //   ['主页','主页'],
      // ],
      "/blog/": [
        "", //README
        ["angular1.x使用", "angular1.x的使用总结"],
        ["前端工程化", "前端工程化"],
        ["关于技术的取舍","关于技术的取舍"],
        // ["闭包", "闭包"],
        // ["闭包", "宏任务和微任务，z-index的7个权限"],
        ["切换node版本","切换node版本"],
        ["我喜欢的parcel","我喜欢的parcel"],
        ["我所不了解的技术","2018年我所不了解的技术"],
        ["关于后台管理应用","关于后台管理应用"],
        ["lorem", "lorem"]
      ],
      "/notes/": [
        // "",
        {
          title: "记录",
          // collapsable: false,//侧边栏自动收缩展开
          children: [
            // '',
            ["tc39/DOM和事件.md", "DOM和事件"],
            ["tc39/ES6.md", "ES6"],
            ["tc39/JavaScript.md", "JavaScript"],
            ["tc39/JS概念.md", "JS概念"],
            ["tc39/js设计模式.md", "js设计模式"],
            ["tc39/js深入浅出.md", "js深入浅出"],
            ["tc39/Promise.md", "Promise"],
            ["tc39/typescript.md", "typescript"],

            ['w3c/flex布局.md', 'flex布局'],
            ['w3c/HTML5_CSS3.md', 'HTML5_CSS3'],
            ["w3c/svg.md", "svg"],
            ["w3c/WEB_API.md", "WEB_API"],


            ['other/ajax.md', 'ajax'],
            ["other/git笔记.md", "git笔记"],
            ["other/浏览器兼容问题.md", "浏览器兼容问题"],
            ["other/实用代码段.md", "实用代码段"],

            ["Nodejs.md", "Nodejs"],
            ["vue.md", "vue"],
            ["编程概念.md", "编程概念"],
            ["打包工具.md", "打包工具"],
            ["造轮子思路.md", "造轮子思路"],
            ["前端单元测试.md", "前端单元测试"],
            ["虚拟DOM.md", "虚拟DOM"],
            ["自定义组件.md", "自定义组件"],
            ["Angularjs","Angularjs"],
            ["Angular6","Angular6"],
          ]
        },
        {
          title: "资源",
          children: [
            // '',
            ["前端资源.md", "前端资源"],
            ["书籍.md", "书籍"],
            ["开发环境.md", "插件"]
          ]
        }
      ]
    }
  }
};
