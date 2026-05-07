fetch('products.json')
.then(res => res.json())
.then(products => {

  const container = document.querySelector('.products-grid');

  products.forEach(product => {

    container.innerHTML += `

      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-content">

          <h3>${product.name}</h3>

          <div class="price">৳${product.price}</div>

          <a href="product.html?id=${product.id}" class="primary-btn">
            View Product
          </a>

        </div>

      </div>

    `;
  });
});