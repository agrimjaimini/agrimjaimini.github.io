# Writing

Each `.mdx` file here becomes a post at `/writing/<filename>`.

A file starting with `_` is a draft: it's left out of lists and the production
build, and only shows up in `next dev` at `/writing/_<name>`.

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
- Figures: `<IsingField />` embeds the live Ising model with a `c` slider;
  `<AgreementPlot />` plots how often its neighbors agree against `c` (Fig. 2)
- Literal braces in text must be escaped (`\{`, `\}`), since MDX treats `{}` as code
