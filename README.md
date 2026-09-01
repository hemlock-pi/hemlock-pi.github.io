# hemlock-pi.github.io

Personal website for Sophia Pi (π). Plain static HTML with one hand-written
stylesheet — no build step, no framework, no package manager. Open any `.html`
file in a browser and it works.

## Layout

```
index.html                  Homepage: about, news, selected projects
<slug>-project.html         One page per project (10 of them)
rips-experience.html        Non-technical write-up of the RIPS summer
blog.html                   Links out to metotheipi.wordpress.com
art.html                    Instagram embeds from @literally.just.lines
personal.html               Skating, hiking, reading
tutoring.html               Tutoring info
contact.html                Email, office, links
assets/
  css/site.css              The entire design system (tokens at the top)
  js/site.js                Shared header + footer, injected into every page
  img/profile.jpg           Portrait
  img/favicon.svg
  img/projects/             Project thumbnails, named after their page slug
  img/blog/                 Blog post thumbnails
  img/personal/             Personal photos
  docs/                     Papers, posters, slides (PDF)
context/                    Source material for writing (CV, SOPs, notes)
                            — not published, not linked from any page
```

## How the pages fit together

Every page is the same skeleton: a `<head>` block that loads the fonts and
`assets/css/site.css`, a `<main>`, and `assets/js/site.js` at the end.

The header and footer are **not** written into the pages. They're built once in
`assets/js/site.js` and injected on load, so navigation, the email address, and
the social links can only ever be edited in one place. Change the `NAV`, `EMAIL`,
or `LINKS` constants at the top of that file.

## Adding a project

1. Drop the thumbnail in `assets/img/projects/<slug>.png` (or `.jpg`), and any
   PDF in `assets/docs/`.
2. Copy an existing `<slug>-project.html` and edit it. Every project page has the
   same four parts, in this order:
   - **Title + one-line blurb** — the blurb is the same line used on the homepage card.
   - **Metadata strip** (`.meta`) — always exactly three fields, in this order:
     *when* (calendar), *where* (pin), *what came of it* (document). No more, no
     fewer, no reordering; that consistency is the point.
   - **Standfirst** (`.standfirst`) — the informal opener: acknowledgements,
     personal reflections, how the project came about.
   - **Abstract** — two paragraphs at the very most.
   - **Resources** (`.resources`) — buttons for papers/posters, and/or a
     `.callout` note explaining why something isn't public.
3. Add a `<article class="card">` to the projects grid in `index.html`, and a
   line to the news list if it's newsworthy.

## Styling

`assets/css/site.css` is organized as tokens → reset → layout → components. All
colors, fonts, and spacing come from custom properties in the `:root` block at
the top, so retheming the site means editing about fifteen lines. Fonts are IBM Plex
Mono (headings, labels, metadata) and IBM Plex Sans (body copy), loaded from
Google Fonts.
