# Writing

Each `.mdx` file here becomes a post at `/writing/<filename>`.

## Frontmatter

```yaml
---
title: "Post title"
date: "2026-10-06"          # YYYY-MM-DD
excerpt: "One or two sentences, used in link previews."
tags: ["optional"]
hidden: true                 # optional: builds the page but leaves it out of lists
---
```

## In a post

- Math: `$inline$` and `$$display$$` (KaTeX)
- Figures: `<IsingField />` embeds the live Ising model with a `c` slider
- Literal braces in text must be escaped (`\{`, `\}`), since MDX treats `{}` as code
