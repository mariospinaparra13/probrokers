// Muestra y oculta el menú de navegación
document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('.nav-menu').classList.toggle('show');
});

// Inicialización de ScrollReveal
ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.news-cards', { delay: 400 });
ScrollReveal().reveal('.cards-banner-one', { delay: 400 });
ScrollReveal().reveal('.cards-banner-two', { delay: 400 });

// Funcionalidad del carrito de compras
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');

// Inicializa el contador del carrito
function updateCartCount(count) {
  cartCount.textContent = count;
}

// Selecciona todos los botones de agregar al carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Función para agregar un producto al carrito
function addToCart(event) {
  const product = event.target.getAttribute('data-product');
  const price = parseFloat(event.target.getAttribute('data-price'));
  const image = event.target.getAttribute('data-image');
  
  // Recuperar el carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Comprobar si el producto ya está en el carrito
  const existingItem = cart.find(item => item.product === product);

  if (existingItem) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    existingItem.quantity += 1;
  } else {
    // Si el producto no está en el carrito, añadirlo
    cart.push({ product, price, quantity: 1, image });
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Actualizar el contador del carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  updateCartCount(totalItems);

  // Mostrar un mensaje de confirmación
  alert(`${product} ha sido agregado al carrito por $${price.toFixed(2)}`);
}

// Asigna el evento de clic a todos los botones
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Inicializar el contador del carrito al cargar la página
function initializeCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  updateCartCount(totalItems);
}

// Inicializa el contador del carrito
initializeCartCount();
