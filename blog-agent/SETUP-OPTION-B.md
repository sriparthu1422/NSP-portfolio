# Option B — Automated Blog Import Setup

## 1. Get your Render backend URL

Render Dashboard → your web service → copy the URL (e.g. `https://nsp-portfolio-xxxx.onrender.com`).

## 2. Create `blog-agent/.env`

```bash
cp .env.example .env
```

Edit `blog-agent/.env`:

```env
BLOG_API_URL=https://nsp-portfolio-backend-g6wj.onrender.com
BLOG_IMPORT_API_KEY=your-secret-key-here
FRONTEND_URL=https://nsp-portfolio-frontend.vercel.app
```

Generate a key (run once):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 3. Add the same key on Render

Render → your backend service → **Environment** → add:

| Key | Value |
|-----|-------|
| `BLOG_IMPORT_API_KEY` | same value as in `blog-agent/.env` |

Save and redeploy.

## 4. Set admin login (quickest way to import now)

In `blog-agent/.env`, set your portfolio admin credentials:

```env
BLOG_ADMIN_EMAIL=you@email.com
BLOG_ADMIN_PASSWORD=your-admin-password
```

## 5. Deploy latest code

Push backend + frontend changes so Render/Vercel have the new `/api/v1/blogs/import` and `/blog/:slug` routes.

## 6. Import today's post

```powershell
cd blog-agent
node scripts/import-blog.mjs content/blog-2026-06-07.md
```

Or with URL override:

```powershell
node scripts/import-blog.mjs content/blog-2026-06-07.md --url https://YOUR-SERVICE.onrender.com
```

## 7. Daily workflow

After `blog-agent/.env` is configured, `publish.sh` auto-imports after git push:

```powershell
& "C:\Program Files\Git\bin\bash.exe" scripts/publish.sh
```

## Alternative: admin login (no API key)

Use instead of `BLOG_IMPORT_API_KEY`:

```env
BLOG_ADMIN_EMAIL=your-admin@email.com
BLOG_ADMIN_PASSWORD=your-password
```
