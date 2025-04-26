const products = [
    { id: 1, title: "Cool Sneakers", price: 59.99, img: "https://picsum.photos/seed/sneaker/300/200" },
    { id: 2, title: "Stylish Backpack", price: 39.99, img: "https://picsum.photos/seed/backpack/300/200" },
    { id: 3, title: "Trendy Jacket", price: 89.99, img: "https://picsum.photos/seed/jacket/300/200" },
    { id: 4, title: "Elegant Watch", price: 129.99, img: "https://picsum.photos/seed/watch/300/200" },
  ];

  let cart = [];

  const productList = document.getElementById('product-list');
  const cartPanel = document.getElementById('cart');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  function displayProducts() {
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product';
      productCard.innerHTML = `
        <img src="${product.img}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productCard);
    });
  }

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartProduct = cart.find(item => item.id === id);
    if (cartProduct) {
      cartProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
  }

  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div>
          <strong>${item.title}</strong><br>
          $${item.price.toFixed(2)} × ${item.quantity}
        </div>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  function toggleCart() {
    cartPanel.classList.toggle('active');
  }
  displayProducts();