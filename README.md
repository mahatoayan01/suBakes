# SuBakes - Wood Fired Pizzeria Website

Production-quality demo website for **SuBakes - Wood Fired Pizzeria** (Sadashiv Peth, Pune), built with React, Vite, React Router, and Tailwind CSS. Fully static, responsive, WCAG AA compliant, and configured for seamless deployment on Netlify.

---

## 🍕 About the Project

- **Official Name:** SuBakes - Wood Fired Pizzeria
- **Short Brand Name:** SuBakes
- **Location:** Shop No. 2 and 3, Chaitanya Apartment, 2063, near Sir Parashurambhau (SP) College, Vijayanagar Colony, Sadashiv Peth, Pune, Maharashtra 411030
- **Phone:** +91 90215 49565
- **Ratings:** 4.4 / 5.0 (1,850+ Google Reviews)
- **Cuisine:** Wood-Fired Neapolitan Pizza, Artisanal Breads, Handmade Pastas, Desserts

---

## 🚀 Getting Started & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, code-split production build in the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 🌐 Netlify Deployment

This project is pre-configured with zero configuration needed for Netlify:
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** `20` (specified in `netlify.toml`)
- **SPA Fallback Routing:** Guaranteed via `netlify.toml` and `public/_redirects` (`/*  /index.html  200`). Page refreshes on routes like `/menu` or `/location` never 404.

---

## 📁 Where to Edit Data and Content

All application content is cleanly decoupled and lives under `src/data/`:

| Data File | Purpose & Contents |
| :--- | :--- |
| `src/data/restaurant.js` | Core business info: official name, phone (+91 90215 49565), address, opening hours, Google Maps place ID, coordinates, demo owner credentials, and the `MISSING_INFO` list. |
| `src/data/menu.js` | Categories, dish names, verified prices, descriptions, veg/non-veg flags, prep times, and image source attributes. |
| `src/data/reviews.js` | Real verified patron reviews collected from Google Maps (Abdullah, Rohit, Sneha, Tanmay, Ananya). |
| `src/data/orders.js` | Pre-filled sample orders and payment ledger history for the Owner Dashboard. |
| `src/data/instagram.js` | 6 Instagram post tiles, captions, likes, and profile link. |
| `src/data/gallery.js` | Categorized pizzeria photos (Oven, Pizzas, Ambiance). |
| `src/data/faqs.js` | Frequently asked questions accordion data. |
| `src/data/offers.js` | Promotional deals & combo discounts. |

---

## 🖼️ Where to Replace Images

All image files are stored locally in `public/images/`:
- `public/images/hero/`: Hero banner graphics
- `public/images/food/`: Dish photos for pizzas, garlic breads, pastas, and desserts
- `public/images/interior/`: Dining room and stone oven ambiance
- `public/images/exterior/`: Cafe storefront and entrance
- `public/images/gallery/`: Dough preparation and artisan baking
- `public/images/instagram/`: Social grid square tiles

*Note: All current images are locally stored vector/raster graphics matching the exact dish names. Each item in `src/data/menu.js` contains `imageSource` and `isSample: true` attributes so they can be replaced with the restaurant's live photos at any time.*

---

## 🔐 Owner Demo Portal

- **URL:** `/owner-login`
- **Demo Username:** `owner@subakes.com`
- **Demo Password:** `woodfired2026`
- **Dashboard Features:** Live order stream, metrics (revenue, in-kitchen orders, completed orders), status toggles, and payment ledger. Automatically integrates orders placed through the `/cart` page in real-time via `localStorage`.

---

## ⚖️ License
Built for SuBakes - Wood Fired Pizzeria demo and showcase purposes.
