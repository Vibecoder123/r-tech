# Image drop-in checklist

None of these folders have real photos yet — that's expected, this is
scaffolding only (see project handoff). Every image slot on the site is
currently a styled CSS placeholder, not a broken `<img>`, so the site works
fine with nothing in these folders. This file exists so it's obvious what
goes where once photography is supplied.

| Folder | Expected file(s) | Used for | Recommended size |
|---|---|---|---|
| `logo/` | `logo.svg` (or `.png`) | Nav + footer brand mark | Height ~38px equivalent, transparent background |
| `hero/` | `hero.jpg` | Full-bleed header background | 1920×1200 |
| `slider/` | `before.jpg`, `after.jpg` | Signature drag-to-reveal slider | 4:3, matched framing between the pair |
| `gallery/` | 6 files, e.g. `job-0118.jpg` | "Recent jobs" grid | 4:3 each |
| `conversions/` | `conversion.jpg` | Van conversion feature section | 4:3, min-height ~460px |
| `booth/` | `booth.jpg` | Spray booth feature section | 4:3 |

## Sourcing the logo specifically

The real logo already exists as a base64 PNG embedded in the original
`rtech-mockup.html` (the file used for Mike's approval screen recording).
That file isn't in this project yet — pull it in from wherever it was
downloaded, then extract the embedded image, rather than asking Mike for
it again from scratch.

## Sourcing everything else

Real project photos and reviews are top of the going-live checklist and
are being chased from Mike directly (not via Claude). Don't block the
build on these — swap them in as they arrive.

## How to swap a placeholder for a real photo

Each `.photo-slot` div in `index.html` has an HTML comment directly above
it stating the exact expected filename. To swap:

1. Drop the real file into the matching folder above.
2. Replace the `<div class="photo-slot">...</div>` block with either:
   - `<img src="assets/images/<folder>/<file>.jpg" alt="...">`, or
   - keep the wrapping div and set it as a CSS `background-image` if the
     crop/overlay styling needs to be preserved.
3. Remove the placeholder SVG/label markup inside.
4. Confirm the file is actually staged in git (`git add`) — untracked
   images are the most common "it's not showing up" bug on this kind of
   deploy.
