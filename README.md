# Atlantic Hours

Static Cape Town experience website. No build step, backend, paid service or package installation required.

## Hosting

Publish the repository root on any static host. `index.html` is the homepage. Upload the entire folder, including `photos/`, `fonts/`, `styles.css`, `app.js`, `terms.html` and `privacy.html`.

For GitHub Pages, select the `main` branch and `/ (root)` in the repository's Pages settings. For Netlify or Cloudflare Pages, select the repository, leave the build command empty, and publish the root directory.

To preview locally, run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`. No external hosting origin is required for images, fonts, styles or scripts.

## Files

- `index.html`: homepage, gallery and WhatsApp enquiry.
- `terms.html`: standalone booking terms.
- `privacy.html`: standalone privacy notice.
- `styles.css` and `app.js`: all site styles and interactions.
- `photos/`, `fonts/`, `favicon.svg`, `wordmark-black.svg`, `share-atlantic-hours.jpg`: local assets.

The homepage retains embedded copies of the legal content for its single-file gallery export. Normal navigation uses the standalone legal pages.

## WhatsApp and gallery

Enquiries open WhatsApp to +27 65 662 5625 with a prepared message. The visitor chooses when to send. No enquiry is stored by this site.

Open `index.html#gallery-editor` to add up to 12 photographs and captions. Preview changes stay in that browser session. Choose **Prepare website with these photos**, then **Download index.html** to save a self-contained homepage copy. Replace the hosted homepage to publish those changes. Keep the standalone Terms and Privacy files in the host folder.

## Share metadata

The share image is included locally. Once the final public hosting address is known, set absolute HTTPS `og:image` and `twitter:image` URLs and add the canonical `og:url` in the HTML head. Relative image paths are provided until then; social platforms may require absolute URLs.

## Photography and content

Venue and operator photographs illustrate experience inspiration; they are not guest testimonials or proof of confirmed partnerships. Source credits remain in the site footer. No licence to redistribute third-party photography is granted by this repository; confirm publication rights or replace with photographs you own or may publish. No open-source licence is asserted for third-party assets.

Guest stories are a placeholder for actual guest feedback. Booking quotes must specify the actual deposit, inclusions, suppliers and cancellation conditions. Business contact: Atlantic Hours, 32 Kloof St, Gardens, Cape Town, 8000, South Africa; +27 65 662 5625.
