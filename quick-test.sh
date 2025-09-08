#!/bin/bash
# Quick test for devcontainer-dotfiles using Node base image

set -e

CONTAINER_NAME="quick-test-$(date +%s)"
DOTFILES_DIR="/Users/jim/Projects/DevTools/devcontainer-dotfiles"

cleanup() {
    docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || true
    docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || true
}

trap cleanup EXIT

echo "🚀 Quick test - Starting Node container..."
docker run -d \
    --name "$CONTAINER_NAME" \
    -v "$DOTFILES_DIR:/dotfiles:ro" \
    -w /dotfiles \
    node:18 \
    sleep infinity

echo "📋 Container info:"
echo "User: $(docker exec "$CONTAINER_NAME" whoami)"
echo "Home: $(docker exec "$CONTAINER_NAME" bash -c 'echo $HOME')"
echo "PWD: $(docker exec "$CONTAINER_NAME" pwd)"

echo ""
echo "🔧 Running dotfiles installation..."
docker exec "$CONTAINER_NAME" node install.js

echo ""
echo "✅ Checking results:"
echo "Personal bashrc: $(docker exec "$CONTAINER_NAME" test -f ~/.bashrc_personal && echo "EXISTS" || echo "MISSING")"
echo "Claude agents dir: $(docker exec "$CONTAINER_NAME" test -d ~/.claude/agents && echo "EXISTS" || echo "MISSING")"
if docker exec "$CONTAINER_NAME" test -d ~/.claude/agents; then
    echo "Agent count: $(docker exec "$CONTAINER_NAME" find ~/.claude/agents -name "*.md" | wc -l)"
fi

echo ""
echo "🎯 Test completed!"