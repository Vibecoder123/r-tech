# R-Tech Developments Ltd — Website

Real build. Vanilla HTML/CSS/JS, no framework, no build step — mirrors the
Brickhaus pattern. Design approved by Mike (mockup sign-off, 2026-07-22).
This scaffolding is not yet live anywhere.

## Structure

```
rtech/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── README.md        ← what goes where, and how to swap in
│       ├── logo/
│       ├── hero/
│       ├── slider/
│       ├── gallery/
│       ├── conversions/
│       └── booth/
└── README.md                ← this file
```

## Status right now

- All copy, layout, and the signature before/after slider are in place and
  working.
- Every photo slot is an intentional styled placeholder (not a broken
  image) — see `assets/images/README.md` for what's expected in each and
  how to swap it in once supplied.
- Nav/footer logo is a text wordmark stand-in — see
  `assets/images/logo/README.md`-equivalent notes in
  `assets/images/README.md` for sourcing the real one.
- Contact form has no backend wired yet (still an open decision).
- Reviews are placeholder-tagged, pending real quotes from Facebook.
- Contact details (phone/address/hours) are bracketed placeholders in the
  footer.

None of the above block deployment — the site is safe to push and preview
as-is.

## Local preview

No build step needed. Either:

```bash
open index.html
```

or, for a closer-to-production preview (recommended, avoids any
relative-path quirks):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying (GitHub → Cloudflare Pages)

This repo is not yet pushed anywhere. Suggested repo name: `rtech` or
`rtechdevelopments`, mirroring the Brickhaus naming pattern.

1. Create a new GitHub repo (empty, no README/template).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site structure"
   git branch -M main
   git remote add origin git@github.com:<your-username>/rtech.git
   git push -u origin main
   ```
3. In Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
   select the new repo. Build settings: no build command, no framework
   preset — output directory `/` (root), since this is static HTML with
   no build step.
4. Cloudflare will assign a `*.pages.dev` preview URL immediately — confirm
   the site loads correctly there before touching DNS on the real domain.
5. **Do not touch the `rtechdevelopments.co.uk` nameservers yet.** That's a
   separate, later step: add the domain as a custom domain in the
   Cloudflare Pages project first (this generates the nameservers to use),
   *then* update them via the Unlimited Web Hosting UK Ltd Client Area →
   My Domains → Manage Nameservers. See the project's going-live checklist
   for the full launch-day sequence — verify against Cloudflare's current
   docs at that time rather than relying on this note.

## Git hygiene reminder

New image files must be explicitly `git add`-ed — untracked images are a
common silent-failure cause ("it's not showing up" is usually actually
"it never got pushed").
