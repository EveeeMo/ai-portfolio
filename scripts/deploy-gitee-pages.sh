#!/usr/bin/env bash
set -euo pipefail

# Gitee 项目页地址：https://<用户名>.gitee.io/<仓库名>
GITEE_REPO="${GITEE_REPO:-git@gitee.com:EveeeM/ai-portfolio.git}"
GITEE_BRANCH="${GITEE_BRANCH:-gitee-pages}"
BASE_PATH="${NEXT_PUBLIC_BASE_PATH:-/ai-portfolio}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ 构建静态站点 (basePath=${BASE_PATH})..."
NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npm run build

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

cp -r out/. "$WORKDIR/"
cd "$WORKDIR"

git init -q
git checkout -b "$GITEE_BRANCH"
git add -A
git -c user.name="deploy" -c user.email="deploy@local" \
  commit -q -m "deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)"

if git remote | grep -q '^gitee$'; then
  git remote set-url gitee "$GITEE_REPO"
else
  git remote add gitee "$GITEE_REPO"
fi

echo "→ 推送到 Gitee ($GITEE_BRANCH)..."
git push -f gitee "HEAD:$GITEE_BRANCH"

echo ""
echo "✓ 推送完成。请在 Gitee 仓库 → 服务 → Gitee Pages 中："
echo "  1. 部署分支选择：$GITEE_BRANCH"
echo "  2. 部署目录：/ (根目录)"
echo "  3. 点击更新 / 启用"
echo ""
echo "  访问地址：https://eveeeem.gitee.io/ai-portfolio"
