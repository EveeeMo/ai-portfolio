#!/usr/bin/env bash
set -euo pipefail

# 构建静态站并剔除未引用的图片，压到免费托管的体积限制内（如 Upma 10MB）
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ 构建静态站点..."
npm run build

echo "→ 收集实际用到的图片路径..."
# 组件通过 illustrations.xxx 间接引用，路径定义在 illustrations.ts；封面在 content frontmatter
REFERENCED=$(
  {
    grep -hoE '/images/[^"'\''` )>]+' src/lib/illustrations.ts content 2>/dev/null || true
    grep -rhoE '/images/[^"'\''` )>]+' src/app src/components 2>/dev/null || true
  } | sort -u | sed 's|^/||'
)

if [[ -z "$REFERENCED" ]]; then
  echo "警告：未找到任何图片引用，跳过精简。"
  du -sh out
  exit 0
fi

echo "→ 保留的图片："
echo "$REFERENCED" | sed 's/^/  + /'

echo "→ 删除 out/ 中未引用的图片..."
removed=0
while IFS= read -r file; do
  rel="${file#out/}"
  if ! echo "$REFERENCED" | grep -qxF "$rel"; then
    rm -f "$file"
    removed=$((removed + 1))
    echo "  - $rel"
  fi
done < <(find out/images -type f 2>/dev/null)

echo "→ 已删除 ${removed} 个未引用文件"
echo "→ 最终体积："
du -sh out
echo ""
echo "上传 out/ 文件夹里的内容到托管平台即可。"
