/**
 * Parse blog-agent markdown files: YAML frontmatter + body.
 */
export function parseBlogMarkdown(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw.trim() };
  }

  const frontmatter = {};
  const lines = match[1].split('\n');
  let currentKey = null;

  for (const line of lines) {
    const keyMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const value = keyMatch[2].replace(/^["']|["']$/g, '').trim();
      if (value) frontmatter[currentKey] = value;
      else frontmatter[currentKey] = '';
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
  const title =
    frontmatter.meta_title ||
    frontmatter.seo_title ||
    extractH1(body) ||
    'Untitled Post';

  const preview = (frontmatter.meta_description || '').slice(0, 200);

  return {
    title,
    preview,
    content: body,
    tag: frontmatter.tag || 'Technical',
    isPublished: frontmatter.isPublished !== 'false',
  };
}

function extractH1(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}
