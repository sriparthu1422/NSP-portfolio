#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
REPO_DIR="$(dirname "$ROOT_DIR")"

git -C "$REPO_DIR" add blog-agent/
git -C "$REPO_DIR" diff --cached --quiet && echo "No blog changes to commit." && exit 0

git -C "$REPO_DIR" commit -m "Daily blog update"
git -C "$REPO_DIR" push origin main

# Publish to live portfolio API (optional — skip if .env not configured)
if [ -f "$ROOT_DIR/.env" ] || [ -f "$REPO_DIR/backend/.env" ]; then
  echo "Importing blog to portfolio API..."
  node "$SCRIPT_DIR/import-blog.mjs" || echo "Import skipped (check blog-agent/.env)"
else
  echo "Skipping API import — copy blog-agent/.env.example to blog-agent/.env and configure credentials."
fi