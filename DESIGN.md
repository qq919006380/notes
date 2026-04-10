# 设计系统文档

## 设计 Tokens

所有 tokens 定义在 `src/styles/global.css` 的 `:root` 中。

### 颜色
| Token | 值 | 用途 |
|-------|------|------|
| `--accent-color` | `#11A8CD` | 品牌主色、链接色 |
| `--active-color` | `#ff5722` | 激活状态 |
| `--badge-tip-color` | `#42b983` | 提示徽章 |
| `--reading-progress-color` | `#b160ea` | 阅读进度条 |
| `--body-bg` | `#f4f4f4` | 页面背景 |
| `--main-bg` | `rgba(255,255,255,1)` | 卡片/内容区背景 |
| `--text-color` | `#004050` | 正文文字 |
| `--text-lighten-color` | `#0085AD` | 次要文字 |
| `--border-color` | `rgba(0,0,0,0.15)` | 边框 |
| `--blur-bg` | `rgba(255,255,255,0.9)` | 导航栏毛玻璃背景 |

### 布局尺寸
| Token | 值 | 用途 |
|-------|------|------|
| `--navbar-height` | `3.6rem` | 导航栏高度 |
| `--sidebar-width` | `18rem` | 左侧结构化侧边栏 |
| `--content-width` | `860px` | 文章内容最大宽度 |
| `--home-page-width` | `1100px` | 首页/主区域最大宽度 |
| `--right-menu-width` | `230px` | 右侧目录/小部件栏 |

### 主题模式
仅 light 模式（Amendment 6）。不支持暗色或阅读模式。

## 响应式断点

| 断点 | 说明 |
|------|------|
| `375px` | 移动端最小支持宽度 |
| `768px` | 导航栏切换为汉堡菜单，搜索框隐藏 |
| `1024px` | 侧边栏隐藏，内容区全宽 |
| `1440px` | 桌面端设计基准 |

## 组件清单

### 布局组件
| 组件 | Props | 用途 |
|------|-------|------|
| `BaseLayout` | `title?`, `description?`, `pageClass?` | HTML 骨架，head meta，全局脚本 |
| `PostLayout` | `title`, `date`, `categories?`, `tags?`, `titleTag?`, `author?`, `headings`, `rawContent`, `prevArticle?`, `nextArticle?`, `collection?`, `currentSlug?` | 文章详情页布局 |
| `CatalogueLayout` | `title`, `description?`, `imgUrl?` | 目录页布局 |

### UI 组件
| 组件 | Props | 用途 |
|------|-------|------|
| `Navbar` | — | 固定导航栏（多级下拉 + 搜索 + 移动端滑出面板） |
| `Footer` | — | 页脚（社交图标 + 版权） |
| `HomeBanner` | — | 首页全屏 Banner（打字动画 + 滚动箭头） |
| `PostList` | `articles` | 文章卡片列表（标题 + 日期 + 分类 + 摘要） |
| `Pagination` | `currentPage`, `totalPages`, `baseUrl` | 分页导航 |
| `Sidebar` | `showBlogger?`, `showContact?` | 右侧小部件容器 |
| `StructuredSidebar` | `collection`, `currentSlug?` | 左侧树形导航侧边栏 |
| `SidebarGroup` | `text`, `items`, `collapsed` | 可折叠侧边栏分组 |
| `SidebarLink` | `text`, `link`, `active?` | 侧边栏链接项 |
| `BloggerBar` | — | 博主信息卡片（头像 + 姓名 + 签名） |
| `ContactCard` | — | 联系信息卡片 |
| `SiteInfo` | — | 站点统计（文章数 + 运行天数 + 总字数） |
| `RecentArticles` | — | 最近更新文章列表（前 5 篇） |
| `RightMenu` | `headings` | 文章目录（TOC） |
| `ArticleNav` | `prevArticle?`, `nextArticle?` | 上一篇/下一篇导航 |
| `ReadingProgress` | — | 顶部阅读进度条 |
| `BackToTop` | — | 返回顶部按钮 |

## 图标系统

使用 iconfont（阿里云 CDN），通过 `<i class="iconfont icon-xxx">` 引用。

常用图标：
- `icon-riqi` — 日期
- `icon-shu` — 字数
- `icon-shijian` — 时间
- `icon-zuozhe` — 作者
- `icon-zuixin` — 最近更新
- `icon-github` — GitHub
- `icon-youjian` — 邮件
- `icon-juejin` — 掘金
- `icon-huidaodingbu` — 返回顶部

## 排版

### 字体栈
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
  Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### 文章内容
使用 `@tailwindcss/typography` 的 `.prose` 类，CSS 变量覆盖默认颜色：
- `--tw-prose-body`: `var(--text-color)`
- `--tw-prose-headings`: `var(--text-color)`
- `--tw-prose-links`: `var(--accent-color)`
- `--tw-prose-code`: `var(--code-color)`

## 卡片样式约定

所有卡片组件共享统一样式：
```css
background-color: var(--main-bg);
border-radius: 8px;
box-shadow: 0 1px 6px rgba(0,0,0,0.05);
padding: 1.25rem;
```

带 `.card-box` class 的组件自带此样式。
