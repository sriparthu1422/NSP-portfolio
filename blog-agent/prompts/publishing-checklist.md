# Publishing Checklist

Use this after every "Create Today's Blog" run.

## Content

- [ ] Trending topic selected and justified
- [ ] 8–12 keywords researched with search intent
- [ ] SEO title, meta title, and meta description generated
- [ ] Outline completed before writing
- [ ] Article is ~2000 words, original, and well-structured
- [ ] FAQ section included (5–6 questions)
- [ ] Conclusion and CTA included

## Social & Assets

- [ ] Instagram caption written
- [ ] LinkedIn post written
- [ ] Facebook post written
- [ ] YouTube community post written
- [ ] Feature image prompt generated
- [ ] Cover image created from prompt (manual or AI tool)

## File & Git

- [ ] Saved as `content/blog-YYYY-MM-DD.md`
- [ ] Frontmatter fields populated
- [ ] Git commit message prepared
- [ ] Run `bash scripts/publish.sh` (Git Bash on Windows) when ready to publish

## Portfolio App (optional)

- [ ] Import into admin: title → `title`, meta description → `preview`
- [ ] Paste markdown body → `content`
- [ ] Upload cover image via `/api/v1/upload`
- [ ] Set tag (default: `Technical`)
- [ ] Publish or schedule

## Distribution

- [ ] Post to LinkedIn
- [ ] Post to Facebook
- [ ] Post to Instagram
- [ ] Post to YouTube Community
- [ ] Share link on portfolio blog section
