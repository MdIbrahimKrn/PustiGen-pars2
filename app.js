// Global configuration for WhatsApp and Google Forms.
const PUSTIGEN_CONFIG = {
  phone: '8801351004652',
  whatsappBase: 'https://wa.me/8801351004652',
  // Replace with your real Google Form endpoint + entry IDs from your form.
  googleForm: {
    action: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',
    fields: { product: 'entry.1111111111', quantity: 'entry.2222222222', amount: 'entry.3333333333' }
  }
};

const byId = (id) => document.getElementById(id);
const state = { products: [], cart: JSON.parse(localStorage.getItem('pustigen_cart') || '[]') };

async function loadProducts() {
  const res = await fetch('products.json');
  state.products = await res.json();
  return state.products;
}

function renderHome(products) {
  const hero = byId('hero-slider');
  if (hero) {
    const banners = [
      { t: 'Premium Natural Nutrition', d: 'Healthy food crafted for daily wellness.' },
      { t: 'Fresh & Trusted Ingredients', d: 'Clean recipes, rich nutrition, delicious taste.' },
      { t: 'Order in Seconds', d: 'Buy now directly via WhatsApp and instant forms.' }
    ];
    hero.innerHTML = banners.map(b => `<article class="slide"><h1>${b.t}</h1><p>${b.d}</p><a class="btn" href="#featured">Shop Now</a></article>`).join('');
  }
  const fill = (id, arr, cardFn) => { const el = byId(id); if (el) el.innerHTML = arr.map(cardFn).join(''); };
  fill('featured-products', products.slice(0, 4), productCard);
  fill('best-sellers', products.filter(p => p.bestSeller), productCard);
  fill('categories', [...new Set(products.map(p => p.category))], c => `<div class="card"><h3>${c}</h3></div>`);
  fill('reviews', [
    { n: 'Nabila', t: 'Excellent quality and fast response on WhatsApp.' },
    { n: 'Rahim', t: 'Fresh product and nice packaging.' },
    { n: 'Sadia', t: 'My family loves the taste and health benefits.' }
  ], r => `<div class="card"><p>“${r.t}”</p><strong>— ${r.n}</strong></div>`);
}

function productCard(p) { return `<article class="card"><img src="${p.images[0]}" alt="${p.name}" loading="lazy"/><h3>${p.name}</h3><p class="price">৳${p.price}</p><p>${p.shortDescription}</p><a class="btn" href="product.html?id=${p.id}">View Details</a></article>`; }
function qs() { return new URLSearchParams(location.search); }
function getProductById(id) { return state.products.find(p => String(p.id) === String(id)) || state.products[0]; }
function waUrl(text) { return `${PUSTIGEN_CONFIG.whatsappBase}?text=${encodeURIComponent(text)}`; }

function submitGoogleForm(product, qty) {
  const { action, fields } = PUSTIGEN_CONFIG.googleForm;
  if (action.includes('YOUR_FORM_ID')) return;
  const fd = new FormData();
  fd.append(fields.product, product.name);
  fd.append(fields.quantity, qty);
  fd.append(fields.amount, product.price * qty);
  fetch(action, { method: 'POST', mode: 'no-cors', body: fd });
}

function renderProductPage() {
  const title = byId('product-title'); if (!title) return;
  const p = getProductById(qs().get('id'));
  const main = byId('product-main-image');
  title.textContent = p.name; byId('product-price').textContent = `৳${p.price}`; byId('product-description').textContent = p.description;
  main.src = p.images[0]; main.alt = p.name;
  byId('benefits').innerHTML = p.benefits.map(b => `<li>${b}</li>`).join('');
  byId('thumbs').innerHTML = p.images.map((img, i) => `<img src="${img}" class="${i===0?'active':''}" alt="${p.name} image ${i+1}"/>`).join('');
  [...document.querySelectorAll('#thumbs img')].forEach(img => img.onclick = () => { main.src = img.src; document.querySelectorAll('#thumbs img').forEach(x => x.classList.remove('active')); img.classList.add('active'); });
  byId('plus').onclick = () => byId('qty').value = Number(byId('qty').value || 1) + 1;
  byId('minus').onclick = () => byId('qty').value = Math.max(1, Number(byId('qty').value || 1) - 1);
  byId('add-cart').onclick = () => { const qty = Number(byId('qty').value || 1); state.cart.push({ id: p.id, qty }); localStorage.setItem('pustigen_cart', JSON.stringify(state.cart)); alert('Added to cart'); };
  byId('whatsapp-order').href = waUrl(`Hello PustiGen, I want to order ${p.name}.`);
  byId('buy-now').onclick = () => {
    const qty = Number(byId('qty').value || 1);
    submitGoogleForm(p, qty);
    window.open(waUrl(`Order Request:%0AProduct: ${p.name}%0AQty: ${qty}%0ATotal: ৳${p.price * qty}`), '_blank');
  };
}

function initNav() {
  const btn = document.querySelector('.menu-btn'); const nav = document.querySelector('.nav-links');
  if (btn && nav) btn.onclick = () => nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

(async function init() {
  byId('year') && (byId('year').textContent = new Date().getFullYear());
  initNav();
  const products = await loadProducts();
  renderHome(products);
  renderProductPage();
})();
