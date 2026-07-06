#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== 1/3 构建国内静态包 ==="
npm run build:upma

echo ""
echo "=== 2/3 提交并推送（Vercel 自动部署）==="
git add \
  src/lib/site.ts \
  src/app/about/page.tsx \
  src/lib/illustrations.ts \
  next.config.ts \
  package.json \
  scripts/prepare-upma-deploy.sh \
  scripts/deploy-gitee-pages.sh \
  scripts/redeploy.sh \
  Dockerfile

if git diff --cached --quiet; then
  echo "没有待提交的站点改动，跳过 commit"
else
  git commit -m "$(cat <<'EOF'
更新 About 页并完善静态部署配置

对齐简历与求职方向，精简关于我文案；修复国内托管构建脚本与插画引用。
EOF
)"
  git push origin main
  echo "✓ 已推送到 GitHub，Vercel 将自动部署"
fi

echo ""
echo "=== 3/3 国内托管（Upma）==="
echo "请打开 https://www.upma.cn ，将 out/ 文件夹里的内容重新上传覆盖"
echo ""
echo "国际站：https://eve-builds-puce-tau.vercel.app"
du -sh out
