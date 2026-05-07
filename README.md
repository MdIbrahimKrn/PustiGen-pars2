# PustiGen E-commerce Website

Modern, mobile-first, matte-black themed ecommerce frontend for **PustiGen**.

## Pages
- `index.html` – homepage with hero slider, featured products, categories, best sellers, reviews, about snippet
- `product.html` – dynamic product details page (query param: `?id=1`)
- `about.html`
- `contact.html`

## Product Management
All products are loaded dynamically from `products.json`.
To add a product:
1. Add a new object in `products.json` with unique `id`.
2. Include `name`, `price`, `description`, `benefits`, `images`, etc.
3. No HTML edits required.

## Order System (No Database)
1. **WhatsApp**: order buttons create prefilled message links.
2. **Google Sheets Form**: set Google Form endpoint in `app.js`:
   - Replace `YOUR_FORM_ID` in `googleForm.action`.
   - Replace entry keys (`entry.xxxxx`) with your actual form field IDs.

## Run locally
Open `index.html` using a local static server for fetch support:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Netlify Deploy
- Drag-and-drop the project folder into Netlify or connect this repo.
- Build command: *(none)*
- Publish directory: `/`

## Brand Contact
- Website: https://www.pustigen.com
- Phone/WhatsApp: 01351004652
- Email: pustigen@gmail.com
- Facebook/Instagram/TikTok: `@pustigen`
