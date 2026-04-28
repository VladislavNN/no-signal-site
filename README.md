# NO SIGNAL landing page

Static indie horror landing page for a liminal horror game concept.

## Structure

- `index.html` - main landing page.
- `styles.css` - visual system, responsive layout, modals, glitch states.
- `script.js` - boot screen, sound toggle, terminal, scanner, puzzle logic, modals.
- `404.html` - themed fallback page for deployment.
- `assets/images/` - active image assets used by the site, with lightweight WebP versions referenced by HTML/CSS.
- `assets/audio/` - Mixkit audio assets and credits.
- `assets/video/` - generated local trailer MP4 and source frame list.
- `assets/video/trailer-filter.ffmpeg` - FFmpeg filtergraph for the analog horror trailer.
- `assets/og-preview.png` - 1200x630 social preview image.
- `robots.txt` and `sitemap.xml` - static deploy metadata for Netlify, Vercel, and GitHub Pages.

Before deploy, replace the placeholder `https://nosignal.game/` in `robots.txt` and `sitemap.xml` with the production domain.

## Notes

The site runs directly from `index.html`. Audio starts only after the user enables sound, because browsers block autoplay by default.
