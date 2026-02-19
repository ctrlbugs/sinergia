#!/bin/sh
# Install git hooks for this project (strips Cursor co-author from commits)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOK_SRC="$SCRIPT_DIR/prepare-commit-msg"
HOOK_DEST=".git/hooks/prepare-commit-msg"

if [ ! -d ".git/hooks" ]; then
  echo "Error: Not a git repository. Run from project root."
  exit 1
fi

cp "$HOOK_SRC" "$HOOK_DEST"
chmod +x "$HOOK_DEST"
echo "Git hook installed: prepare-commit-msg (strips Cursor co-author)"
echo "Your commits will no longer include Cursor attribution."
