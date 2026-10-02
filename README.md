# Ponderosa Pine Trading website

Website for Ponderosa Pine Trading 26CC, civil engineering contractors in Shelly Beach, KZN:
https://ponderosapinetrading.co.za

Plain HTML, CSS and JavaScript. No build step or frameworks.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `about.html` | About Us |
| `projects.html` | Project photo gallery |
| `contact.html` | Contact form, details and map |
| `css/style.css` | All styling |
| `js/main.js` | Mobile menu, photo viewer, contact form |
| `images/` | Project photos |
| `.htaccess` | Redirects old `/about`, `/projects`, `/contact` links (Apache hosting) |

## Editing

- **Text:** edit the HTML file for that page.
- **Header or footer:** these are repeated on all four pages, so change them in each file.
- **Add a photo:** put it in `images/` and copy one of the `<button class="gallery-item">` blocks in
  `projects.html` (or `index.html`), changing `src` and `alt`.

## Preview and upload

Open `index.html` in a browser to preview. To publish, upload everything in this folder (including
`.htaccess`) to the website's root folder on the hosting.

The contact form opens the visitor's email app with their message filled in, addressed to
digbysm@gmail.com. It doesn't need a server.
