#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG="${ROOT}/deploy-config.json"

if [[ ! -f "$CONFIG" ]]; then
  echo "Missing deploy-config.json — copy deploy-config.example.json and edit if needed."
  exit 1
fi

if [[ -z "${AI_BUILDER_TOKEN:-}" ]]; then
  echo "Missing AI_BUILDER_TOKEN in environment."
  exit 1
fi

REPO_URL=$(python3 -c "import json; print(json.load(open('$CONFIG'))['repo_url'])")
SERVICE_NAME=$(python3 -c "import json; print(json.load(open('$CONFIG'))['service_name'])")
BRANCH=$(python3 -c "import json; print(json.load(open('$CONFIG'))['branch'])")
PORT=$(python3 -c "import json; print(json.load(open('$CONFIG')).get('port', 8000))")

BODY=$(python3 <<PY
import json
with open("$CONFIG") as f:
    cfg = json.load(f)
payload = {
    "repo_url": cfg["repo_url"],
    "service_name": cfg["service_name"],
    "branch": cfg["branch"],
    "port": cfg.get("port", 8000),
    "env_vars": cfg.get("env_vars", {}),
    "streaming_log_timeout_seconds": 120,
}
print(json.dumps(payload))
PY
)

echo "Deploying ${SERVICE_NAME} from ${REPO_URL} (${BRANCH})..."
curl -sS -X POST "https://space.ai-builders.com/backend/v1/deployments" \
  -H "Authorization: Bearer ${AI_BUILDER_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$BODY" | python3 -m json.tool

echo ""
echo "Live URL: https://${SERVICE_NAME}.ai-builders.space"
echo "Check status: curl -H \"Authorization: Bearer \$AI_BUILDER_TOKEN\" https://space.ai-builders.com/backend/v1/deployments/${SERVICE_NAME}"
