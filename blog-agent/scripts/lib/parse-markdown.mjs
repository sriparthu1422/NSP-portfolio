export function parseBlogMarkdown(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw.trim() };

  const frontmatter = {};
  const lines = match[1].split('\n');
  let currentKey = null;

  for (const line of lines) {
    const keyMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const value = keyMatch[2].replace(/^["']|["']$/g, '').trim();
      frontmatter[currentKey] = value;
      continue;
    }
    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = frontmatter[currentKey]
          ? [frontmatter[currentKey]]
          : [];
      }
      frontmatter[currentKey].push(listMatch[1].replace(/^["']|["']$/g, ''));
    }
  }

  return { frontmatter, body: match[2].trim() };
}

export function toBlogPayload(frontmatter, body) {
  const h1 = body.match(/^#\s+(.+)$/m);
  const title =
    frontmatter.meta_title ||
    frontmatter.seo_title ||
    (h1 ? h1[1].trim() : null) ||
    'Untitled Post';

  return {
    title,
    preview: (frontmatter.meta_description || '').slice(0, 200),
    content: body,
    tag: frontmatter.tag || 'Technical',
    isPublished: frontmatter.isPublished !== 'false',
  };
}
