# R-Tech Developments Ltd

Website for R-Tech Developments, a vehicle workshop in Eastleigh, Hampshire covering general mechanical work, bodyshop repairs, restoration, van conversions and wraps, and an on-site spray booth.

Live: https://rtechdevelopments.co.uk

## Stack

Plain HTML, CSS and JavaScript with no framework and no build step. Hosted on Cloudflare Pages, which deploys automatically on every push to `main`. Domain, DNS and the www-to-apex redirect are also on Cloudflare. The contact form posts to Formspree.

## What's on the page

- Scroll-triggered reveal animations
- Before/after comparison slider (drag handle plus a range input for keyboard users)
- Job gallery with a lightbox, one card per job and captioned photos
- Contact form submitted with `fetch`, a honeypot field for spam, and an inline success message
- Separate hero images for desktop and mobile
- Open Graph and Twitter card tags for link previews

## Structure

```
index.html
css/style.css
js/script.js
assets/images/
  booth/  conversions/  gallery/job-NNNN/  hero/  logo/  slider/
```

Each gallery job has its own folder, and its photos are listed in the card's `data-gallery` attribute in `index.html`.

## Running locally

Serve the repo root with any static server, for example:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Submissions from a local copy still go to the live Formspree form, so they land in the client's inbox.

## Decisions

- **No framework.** It's a single page that a small business needs to stay fast and cheap to run, and hosting costs nothing.
- **Formspree for the form.** A static host has no server to send mail from. The form endpoint is only in the form's `action` attribute, and the script reads it from there.
- **Facebook linked, not embedded through the Graph API.** A static site can't keep an access token secret.
- **Filename case matters.** Cloudflare Pages is case-sensitive, so a path that differs from the file only in letter case returns a 404 in production even though it works locally on macOS or Windows.

---

Built by [Moi / Vibecoder123].
