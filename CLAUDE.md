# 项目指南

## 技术栈
- Astro 6.x (SSG) — 静态站点生成
- Tailwind CSS 4.x — 通过 @tailwindcss/vite 插件（含 @tailwindcss/typography）
- astro-expressive-code — 代码块（内置 copy 按钮、语法高亮）
- @astrojs/sitemap + @astrojs/rss — 站点地图与 RSS 订阅
- Pagefind — 全文搜索（构建时索引，零运行时 JS）
- medium-zoom — 文章图片点击放大
- dayjs — 日期格式化
- gray-matter — Frontmatter 解析（用于辅助脚本）
- Playwright + @axe-core — E2E / 可访问性测试

## 开发命令
- `pnpm dev` — 启动开发服务器（localhost:4321）
- `pnpm build` — 构建生产版本（前置 autofix-slugs，含 Pagefind 索引）
- `pnpm preview` — 预览构建结果
- `pnpm new "标题" [collection]` — 快捷新建（可选），自动生成 slug 和文件
- `pnpm autofix` — 扫描 md，**只补**缺失的 slug（已有的永不改）
- `pnpm validate` — 校验 frontmatter + slug 唯一性 + SEO 注册表
- `node scripts/validate-urls.mjs` — 构建后验证所有 URL 完整性
- `npx playwright test` — 跑测试套件（baseURL: localhost:4323）

## 内容管理
- 文章放在 `src/content/{blog,notes,posts,works}/`
- **文件名 = 标题**（如 `我喜欢的parcel.md`），不是 slug；slug 独立存于 frontmatter
- 4 个 Content Collections 共享同一 schema（`src/content.config.ts`）
- Frontmatter 必须包含: title, slug, date, categories, tags

### 写文章工作流（极简版）
1. 在 `src/content/{collection}/{标题}.md` 直接新建文件，写 title + 内容即可（slug 字段可不填）
2. `pnpm build` — autofix 会**自动补齐缺失的 slug** 并写回文件
3. `git commit` 提交（**重要**：自动补的 slug 必须入库，否则下次 build 会生成新的，URL 会漂移）
4. CI 保护：如果 push 的 commit 里有缺 slug 的文章，CI 构建会主动失败

### slug 规则
- 格式 `^[a-f0-9]{6}$`（6 位小写十六进制）
- **已有 slug 永不被覆盖**（任何情况），只补缺失
- 已索引但不符合规则的历史 slug（`个人作品`、`796ac5-心流`）放在 `LEGACY_SLUGS` 白名单
- slug 对应 URL `/pages/{slug}/`，**不可修改已发布文章的 slug**（Google 已收录）
- 纯数字 slug 需要加引号（如 `slug: '018557'`），避免 YAML 解析为数字
- `scripts/permalink-map.json` 是 SEO 注册表，记录所有已公开的 slug
- sortOrder 字段控制侧边栏和目录页的排序

## 项目结构
```
src/
├── content/          # 文章内容（Markdown）
│   ├── blog/         # 个人博客
│   ├── notes/        # 学习笔记
│   ├── posts/        # 随笔
│   └── works/        # 作品
├── components/       # UI 组件（17 个 .astro 文件）
├── layouts/          # 布局（BaseLayout, PostLayout, CatalogueLayout）
├── pages/            # 路由
│   ├── pages/[...slug].astro  # permalink 路由（最关键）
│   ├── page/[page].astro      # 首页分页
│   ├── categories/            # 分类索引页
│   ├── tags/                  # 标签索引页
│   ├── rss.xml.ts             # RSS 输出
│   └── {archives,blog,notes,works}.astro
├── scripts/          # 客户端脚本（vanilla JS：love-me / reading-progress / time-greeting / typing-animation）
├── styles/           # 全局样式
│   ├── global.css    # design tokens（:root 变量）
│   └── theme.css     # 主题样式
└── utils/            # 工具函数（content, date, sidebar, site-config）

scripts/              # 辅助脚本（autofix-slugs / new-post / validate-content / validate-urls / ui-audit / migrate-content / permalink-map.json）
tests/                # Playwright 测试（accessibility / content / interaction / responsive / seo / ui）
public/               # 静态资源（_headers 安全头、_redirects、robots.txt、img/）
```

## 组件约定
- 布局组件放 `src/layouts/`，UI 组件放 `src/components/`
- 交互脚本放 `src/scripts/`，纯 vanilla JS
- CSS 变量（design tokens）统一在 `src/styles/global.css` 的 `:root` 中定义
- 组件间通过 Props 接口传递数据，避免全局状态

## 路由规则
- `/pages/{slug}/` — 文章详情页（所有 collection 聚合）
- `/blog/`, `/notes/`, `/works/` — 目录页（按子分类分组）
- `/page/{n}/` — 首页分页（第 1 页重定向到 `/`）
- `/archives/`, `/categories/`, `/tags/` — 索引页
- `/rss.xml` — RSS 订阅
- `/sitemap-index.xml` — 由 @astrojs/sitemap 自动生成

## 部署
- GitHub Pages: push 到 master 自动部署（`.github/workflows/deploy.yml`）
- Cloudflare Pages: 连接仓库自动部署
- 自定义域名: weibaichao.com（通过 CNAME 配置）
- 产物目录: `dist/`
- `public/_headers` 配置了安全响应头（CSP 等）

## 注意事项
- 只有 light 模式，不要添加暗色模式
- URL 结构 `/pages/{hash}/` 是 SEO 关键，不可更改
- 代码块由 expressive-code 处理，不要手写复制按钮
- 图标使用 iconfont（通过阿里 CDN），不要用 emoji
- 搜索由 Pagefind 处理，不需要手动维护索引
- 改动 UI/交互后尽量补 Playwright 用例；修改内容/路由后跑 `validate-urls.mjs`
