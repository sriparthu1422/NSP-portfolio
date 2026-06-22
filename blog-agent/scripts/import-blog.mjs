#!/usr/bin/env node
/**
 * Import blog-agent markdown into the portfolio API.
 *
 * Usage:
 *   node scripts/import-blog.mjs                    # today's post
 *   node scripts/import-blog.mjs content/blog-2026-06-07.md
 *
 * Env (blog-agent/.env or backend/.env):
 *   BLOG_API_URL          — e.g. https://your-api.onrender.com
 *   BLOG_IMPORT_API_KEY   — preferred (set on Render + local)
 *   BLOG_ADMIN_EMAIL      — fallback login
 *   BLOG_ADMIN_PASSWORD   — fallback login
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseBlogMarkdown, toBlogPayload } from './lib/parse-markdown.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const repoRoot = path.join(root, '..');

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv(path.join(root, '.env'));
loadEnv(path.join(repoRoot, 'backend', '.env'));

const urlFlag = process.argv.indexOf('--url');
const fileArg = process.argv.find(
  (a, i) => i > 1 && !a.startsWith('--') && a.endsWith('.md')
);

const API_URL =
  (urlFlag !== -1 ? process.argv[urlFlag + 1] : null) ||
  process.env.BLOG_API_URL ||
  process.env.VITE_API_URL ||
  'http://localhost:5000';

function todayFile() {
  const d = new Date();
  const iso = d.toISOString().slice(0, 10);
  return path.join(root, 'content', `blog-${iso}.md`);
}

function resolveFile(arg) {
  if (!arg) return todayFile();
  if (path.isAbsolute(arg)) return arg;
  return path.join(root, arg);
}

const PLACEHOLDER_KEY = 'your-secret-import-key';

function hasImportKey() {
  const key = process.env.BLOG_IMPORT_API_KEY;
  return key && key !== PLACEHOLDER_KEY;
}

async function getAdminHeaders() {
  const email = process.env.BLOG_ADMIN_EMAIL;
  const password = process.env.BLOG_ADMIN_PASSWORD;
  if (!email || !password || email.includes('example.com') || password === 'your-password') {
    throw new Error(
      'Set BLOG_ADMIN_EMAIL + BLOG_ADMIN_PASSWORD in blog-agent/.env (your portfolio admin login)'
    );
  }

  const res = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Login failed (${res.status}): ${err}`);
  }

  const { token } = await res.json();
  return { Authorization: `Bearer ${token}` };
}

async function getImportKeyHeaders() {
  return { 'x-import-key': process.env.BLOG_IMPORT_API_KEY };
}

async function main() {
  const filePath = resolveFile(fileArg || process.argv[2]);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(filePath, 'utf8');
  const adminHeaders = await getAdminHeaders();
  const jsonHeaders = { 'Content-Type': 'application/json', ...adminHeaders };

  let res;
  let data;
  let action = 'imported';

  if (hasImportKey()) {
    res = await fetch(`${API_URL}/api/v1/blogs/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await getImportKeyHeaders()) },
      body: JSON.stringify({ markdown }),
    });
  } else {
    res = { status: 404 };
  }

  if (res.status === 404) {
    console.log('Using standard blog API (deploy latest backend for /import endpoint)...');
    const { frontmatter, body } = parseBlogMarkdown(markdown);
    const payload = toBlogPayload(frontmatter, body);

    const listRes = await fetch(`${API_URL}/api/v1/blogs`, { headers: jsonHeaders });
    const listData = await listRes.json();
    const slug = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const existing = listData.data?.find((b) => b.slug === slug);

    if (existing) {
      res = await fetch(`${API_URL}/api/v1/blogs/${existing._id}`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify(payload),
      });
      action = 'updated';
    } else {
      res = await fetch(`${API_URL}/api/v1/blogs`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(payload),
      });
      action = 'created';
    }
  }

  data = await res.json();

  if (!res.ok) {
    console.error(`Import failed (${res.status}):`, data.message || data);
    process.exit(1);
  }

  const blog = data.data;
  const frontend =
    process.env.FRONTEND_URL || 'https://sriparthu.vercel.app';

  console.log(`✅ Blog ${data.action || action}: ${blog.title}`);
  console.log(`   Slug: ${blog.slug}`);
  console.log(`   Live: ${frontend}/blog/${blog.slug}`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
