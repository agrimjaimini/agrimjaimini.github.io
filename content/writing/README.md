# Writing Directory

Add your `.mdx` blog posts here.

## File Naming

- Regular posts: `my-post-title.mdx`
- Hidden/placeholder posts: `_filename.mdx` (will be filtered out from UI)

## Frontmatter

```yaml
---
title: "Your Post Title"
date: "2026-02-09"
excerpt: "A brief description of your post (150-200 characters)"
tags: ["tag1", "tag2"]
featured: false
hidden: false  # Set to true to hide from UI
---
```

## Notes

- `_placeholder.mdx` is a build-time placeholder that allows static export to work
- It's hidden from the UI and can be ignored
- When you add real posts, the placeholder will remain hidden
