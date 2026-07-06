# Eve 的数字花园

一座关于 AI 项目与思考的数字花园，手绘线稿风格，灵感来自 [Maggie Appleton](https://maggieappleton.com/)。

## 本地开发

```bash
cd ~/Desktop/ai-portfolio
npm run dev
```

## 花园概念

笔记按生长阶段分类：

| 阶段 | 含义 |
|------|------|
| 🌱 幼苗 | 刚发芽的想法 |
| 🌿 生长中 | 持续迭代的思考 |
| 🌳 常青 | 经得起时间检验的笔记 |

在 `content/blog/*.mdx` 的 frontmatter 中设置 `growth` 字段。

## 自定义

- `src/lib/site.ts` — 个人信息
- `content/projects/*.mdx` — 项目（`cover` 指向 `/images/sketch/` 下手绘插图）
- `content/blog/*.mdx` — 笔记（可加 `growth`、`illustration`）
- `public/images/sketch/` — 手绘线稿 SVG

## 技术栈

Next.js 16 · Tailwind CSS 4 · MDX · Fraunces + Nunito Sans
