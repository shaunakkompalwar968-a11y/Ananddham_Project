# Anand Dham Agrotourism 🌾

A responsive, single-page website for **Anand Dham Agrotourism** — a rustic farm-stay and day-picnic destination located at Sitakhandi Talav, Bhokar, Bachoti Kamp, Maharashtra. The site showcases farm attractions, seasonal highlights, a photo gallery, and a dynamic booking system that sends enquiries directly via WhatsApp.

## 🔗 Live Preview
Open `index.html` in any modern browser, or deploy via GitHub Pages / Netlify / Vercel (see [Deployment](#-deployment) below).

## ✨ Features

- **Sticky Navbar** with mobile hamburger menu
- **Hero Banner** with quick call-to-action buttons (Explore Packages / Enquire via WhatsApp)
- **About Section** highlighting the 35-acre agro sanctuary
- **Seasonal Highlights** cards (Summer, Monsoon, Winter Hurda Party)
- **Attractions Grid** — bullock cart rides, traditional buffet, pool & rain dance
- **Filterable Photo Gallery** with a built-in **Lightbox** (next/prev navigation, keyboard arrow & Escape key support)
- **Dynamic Package Booking Form**
  - Auto-calculates total price based on package rate × number of guests
  - Automatically applies a **10% group discount** for 10+ guests
  - Submits the booking enquiry as a pre-filled **WhatsApp message**
- **Floating Contact Widget** (WhatsApp, Call, Directions) — expandable FAB button
- **Embedded Google Map** for directions
- **Fully Responsive** — breakpoints at 992px, 768px, and 576px for tablet/mobile

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties/variables, Flexbox, CSS Grid) |
| Interactivity | Vanilla JavaScript (no frameworks/libraries) |
| Fonts | Google Fonts — *Marcellus* (headings), *Plus Jakarta Sans* (body) |
| Images | Unsplash (placeholder imagery) + local `/images` assets |

## 📁 Project Structure

```
anand-dham/
├── index.html          # Main page markup (all sections)
├── style.css           # Global styles, layout, responsive rules
├── script.js           # Menu toggle, booking calculator, gallery/lightbox, FAB widget
└── images/              # Logo & branding assets (Logo.png, Agro.png)
```

> **Note:** `index.html` references `images/Agro.png` and `Images/Logo.png`. Ensure a single, consistently-cased `images/` folder exists with both files before deploying — mismatched casing (`images` vs `Images`) can break logo rendering on case-sensitive hosts like GitHub Pages/Linux servers.

## 🧩 Key Sections (`index.html`)

| Section ID | Description |
|---|---|
| `#home` | Hero banner |
| `#about` | About Ananddham |
| `#seasonal` | Harvest calendar / seasonal offers |
| `#attractions` | Farm activities & highlights |
| `#gallery` | Filterable image gallery + lightbox |
| `#packages` | Pricing packages |
| `#booking` | Booking form with live price calculator |

## ⚙️ How the Booking Calculator Works (`script.js`)

1. Reads the selected package rate (`packageSelect`) and guest count (`guestCountInput`).
2. Computes `total = rate × guests`.
3. If guests ≥ 10, applies a 10% discount.
4. Updates `#grandTotal` live on every input change.
5. On form submit, builds a formatted message and opens WhatsApp (`wa.me/918208219849`) with the enquiry pre-filled.

## 🚀 Getting Started (Local Setup)

1. Clone or download this repository.
2. Ensure the folder structure above is intact (especially the `images/` folder).
3. Open `index.html` directly in a browser — no build step or server required.

```bash
git clone <your-repo-url>
cd anand-dham
open index.html   # or double-click the file
```

## 🌐 Deployment

This is a static site, so it can be deployed on any static host:

- **GitHub Pages:** Push to a repo → Settings → Pages → select branch/root
- **Netlify / Vercel:** Drag-and-drop the project folder or connect the Git repo
- **Any shared hosting:** Upload `index.html`, `style.css`, `script.js`, and `images/` via FTP

## 📌 Notes / Suggested Improvements

- Replace Unsplash placeholder images with the property's own photography for authenticity and faster load times.
- Consider lazy-loading gallery/hero images for better mobile performance.
- Add form validation feedback (e.g., inline errors) beyond native HTML5 `required` attributes.
- Consider adding `alt` text consistency and ARIA labels for full accessibility compliance.

## 👨‍💻 Developer

**Developed by Shaunak Kompalwar**
Website built and deployed for Anand Dham Agrotourism.

## 📄 License

© 2026 Anand Dham Agrotourism. All rights reserved.
