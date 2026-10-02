# 观象 · Guanxiang

简洁深色界面的双语文化阅读与个人观察网站。首页并列展示卦象、星座、MBTI，保留淡星空背景，配有知识书阁与本地手记。

这是 2026-10-01 已发布简洁版的完整源码导出。原站源码提交为 `9815590fbf91a24800004ed94bcbbe08e4c6f26b`。本包补充了 GitHub 使用说明、忽略规则和文件校验清单；应用源码、图片、依赖版本及框架配置保持原样。

## 包含什么

- 完整 React / TypeScript / Vinext 项目与简洁版样式。
- 六十四卦数据、384 条爻辞、原创导读及任意爻位互动变化。
- 十二星座每日原创娱乐阅读，24 题原创 MBTI 偏好练习与十六种类型。
- 三条入门路径、术语、资料导航与虚构教学案例。
- 三类结果保存、手记回看、MBTI 分数对照、Markdown 导出。
- 图片资源、依赖锁文件、Cloudflare Worker 构建配置和第三方许可证。

手记、星座偏好与 MBTI 进度存放在访问者的浏览器中。本源码包不包含任何用户手记、浏览器数据、密钥、依赖安装目录、旧 Git 历史或构建缓存。

## 上传到 GitHub

先解压 ZIP，进入里面的 `guanxiang` 文件夹。仓库根目录应直接放置 `package.json`、`README.md`、`app/`、`components/`、`lib/` 和 `public/`；不要把 ZIP 文件本身作为唯一源码上传。

### 使用 Git 命令

1. 在 GitHub 创建空仓库，例如 `guanxiang`。创建时先不勾选自动生成 README、许可证或 `.gitignore`，本包已提供 README 与忽略规则。
2. 在解压后的 `guanxiang` 文件夹打开 PowerShell、终端或 Git Bash。
3. 运行以下命令，把示例地址中的 `YOUR_USERNAME` 换成自己的 GitHub 用户名：

```sh
git init -b main
git add .
git commit -m "Initial Guanxiang source"
git remote add origin https://github.com/YOUR_USERNAME/guanxiang.git
git push -u origin main
```

首次使用 Git 时，如提交提示没有作者身份，先设置 `git config --global user.name "你的名字"` 和 `git config --global user.email "你的邮箱"`。推送时按 GitHub 的登录提示完成验证。

### 使用 GitHub Desktop

在 GitHub Desktop 中选择 **File → New repository**，仓库名填写 `guanxiang`，创建一个本地仓库。把本包 `guanxiang` 文件夹内的全部文件复制进去（包含 `.gitignore`、`.npmrc` 和 `.openai` 等配置），提交后点击 **Publish repository**，选择公开或私有即可。

官方说明：[使用命令行上传本地代码](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github) · [GitHub Desktop](https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop)。

## 在自己的电脑运行

需要 Node.js **22.13.0 或更高版本**，以及项目固定版本 **pnpm 11.25.0**。Windows 可以在 PowerShell 中执行下列命令，无需使用本项目的 Linux 专用安装脚本。

先安装 pnpm：

```sh
npm install --global pnpm@11.25.0
```

然后在 `guanxiang` 文件夹中运行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

浏览器打开 `http://localhost:5173`。启动后修改代码会自动刷新。依赖由 `pnpm-lock.yaml` 固定，无需把 `node_modules` 上传 GitHub。

## 检查与构建

```sh
node scripts/check-content.mjs
pnpm exec tsc --noEmit --incremental false
pnpm build
```

检查包括六十四卦与爻辞位置、可逆变爻、MBTI 计分边界、旧／新手记读取、导出和初始页面渲染。构建产物输出到 `dist/`；`pnpm start` 可运行本地构建预览，使用其打印的地址。

本包保留 Vinext 与 Cloudflare Worker 构建结构。上传 GitHub 用于存放和维护源码；实际网站发布使用兼容的 Worker / Sites 部署流程。

## 多语言网址与 SEO

除首页互动应用外，六十四卦另有服务端渲染的独立页面，便于搜索引擎收录：

| 网址 | 内容 |
| --- | --- |
| `/en` | 英文首页（服务端渲染）：以易经为主——起卦、今日一卦、三步说明、八卦、文本出处；星座与 MBTI 放在“Also on Guanxiang”。`/zh` 永久跳转到 `/`；`/` 与 `/en` 互为 hreflang 中英文版本 |
| `/zh/hexagram`、`/en/hexagram` | 六十四卦总表 |
| `/zh/hexagram/49-ge`、`/en/hexagram/49-ge` | 单卦页面（卦序 + 拼音）；`/en/hexagram/49` 会 308 跳转到规范网址 |
| `/zh/reading`、`/en/reading` | 在线起卦（三枚铜钱法，浏览器加密随机数），可逐爻或一次掷完 |
| `/zh/reading/result?lines=789687` | 起卦结果（六位数自下而上，6–9）：本卦、变爻、之卦；可分享但不被索引（noindex），问题不进入网址，只存于浏览器并可留进手记 |
| `/sitemap.xml`、`/robots.txt` | 站点地图（含 hreflang 互指）与爬虫规则 |

英文单卦页另附理雅各（James Legge）1882 年英译的卦辞与爻辞（公有领域，`lib/hexagrams-legge.json`，经 [opencosmos-ai/iching](https://github.com/opencosmos-ai/iching)（CC0）转录：1–31 卦对照维基文库扫描本校对；32–64 卦为扫描 OCR，卦辞取自另一份 Legge 文本，爻辞经人工校正，39 与 64 卦上爻扫描缺字处以“…”标出而不补写），以及观象原创的英文导读与逐爻解读（`lib/hexagram-readings-en.ts`）。

每页带 `canonical`、`hreflang`（zh-Hans / en / x-default）、Open Graph 与 JSON-LD 面包屑。互动应用在英文模式下也以易经为主：首页顶部为起卦与六十四卦入口，星座与 MBTI 收为一行链接并移到导航末尾；中文模式保持原样。首页支持 `/?lang=en`，未保存语言偏好时按浏览器语言选择中英文。

**上线前请设置 `NEXT_PUBLIC_SITE_URL`**（如 `https://你的域名`），让 canonical、hreflang 和站点地图都指向主域名；未设置时使用请求的主机名。之后在 Google Search Console 提交 `/sitemap.xml`。

相关文件：`lib/site.ts`（拼音、网址、语言）、`app/[lang]/`（单卦与总表页）、`app/sitemap.xml/`、`app/robots.txt/`。互动应用位于 `app/(app)/`。

## 主要文件

| 路径 | 用途 |
| --- | --- |
| `app/(app)/page.tsx` | 首页、卦象探索与手记 |
| `app/[lang]/hexagram/` | 服务端渲染的中英文六十四卦页面 |
| `app/minimal-ui.css` | 简洁深色风格 |
| `app/globals.css` | 基础排版、交互与响应式布局 |
| `components/horoscope.tsx` | 星座页面 |
| `components/mbti.tsx` | MBTI 页面 |
| `components/knowledge-library.tsx` | 六十四卦与知识书阁 |
| `lib/hexagrams-data.json` | 卦辞、爻辞及所核对版本出处 |
| `lib/knowledge.ts` | 入门、术语、资料与案例 |
| `lib/iching.ts` | 手记格式、兼容读取与导出 |
| `lib/results.ts` | 结果快照 |
| `public/assets/` | 图片资源 |
| `SOURCE_MANIFEST.json` | 导出来源、文件清单与 SHA-256 校验 |
| `docs/SITES_RUNTIME.md` | 原项目说明及框架维护文档 |

`.openai/hosting.json` 中保留原站点的项目标识及空存储绑定；它不是访问密钥，正常本地运行不需要修改。若要在 Sites 创建独立新站，应通过该平台关联自己的项目。

## 内容来源

六十四卦古籍文本来自所核对版本的维基文库《周易》，每条数据都保留固定版本链接。双语导读、思考问题、星座文案、偏好练习和案例为观象原创编辑内容。星座文案属于娱乐阅读；MBTI 练习不是官方量表。

框架插件和组件样式的第三方许可证随源码保留在 `build/sites-vite-plugin.LICENSE` 和 `vendor/shadcn-tailwind-4.13.0.LICENSE.md`。
