document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('#cart-items-list');
  const cartCount = document.querySelector('.cart-count');
  const totalPriceElement = document.querySelector('#total-price');
  const clearCartButton = document.querySelector('.clear-cart-btn');
  const checkoutButton = document.querySelector('.checkout-btn'); // Selecciona el botón "Proceder al Pago"

  // Recuperar el carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Función para actualizar la visualización del carrito
  const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor de items
    let total = 0;

    // Iterar sobre los elementos del carrito y mostrarlos en la página
    cart.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.className = 'cart-item';

      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.product}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${item.product}</h3>
          <p>Precio: $${parseFloat(item.price).toFixed(2)}</p>
          <p>Cantidad: 
            <button class="quantity-btn decrease" data-id="${item.product}">-</button> 
            ${item.quantity} 
            <button class="quantity-btn increase" data-id="${item.product}">+</button>
          </p>
          <p>Subtotal: $${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
        </div>
        <div class="cart-item-actions">
          <button class="remove-btn" data-id="${item.product}">Eliminar</button>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);

      // Calcular el total sumando el precio de cada artículo por su cantidad
      total += parseFloat(item.price) * item.quantity;
    });

    // Actualizar el total y el contador de artículos
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  };

  // Función para manejar la adición de productos
  const handleAddItem = (event) => {
    if (event.target.classList.contains('increase')) {
      const productId = event.target.getAttribute('data-id');
      cart = cart.map(item => {
        if (item.product === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar el carrito en localStorage
      updateCartDisplay(); // Actualizar la vista del carrito
    }
  };

  // Función para manejar la reducción de productos
  const handleDecreaseItem = (event) => {
    if (event.target.classList.contains('decrease')) {
      const productId = event.target.getAttribute('data-id');
      cart = cart.map(item => {
        if (item.product === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      }).filter(item => item !== null); // Filtrar los productos eliminados
      localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar el carrito en localStorage
      updateCartDisplay(); // Actualizar la vista del carrito
    }
  };

  // Función para manejar la eliminación de productos del carrito
  const handleRemoveItem = (event) => {
    if (event.target.classList.contains('remove-btn')) {
      const productId = event.target.getAttribute('data-id');
      cart = cart.filter(item => item.product !== productId);
      localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar el carrito en localStorage
      updateCartDisplay(); // Actualizar la vista del carrito
    }
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    cart = []; // Limpiar el array del carrito
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar el carrito en localStorage
    updateCartDisplay(); // Actualizar la vista del carrito
    cartCount.textContent = 0; // Actualizar el contador del carrito en la página principal
  };

  // Función para manejar la redirección al proceso de pago
  const handleCheckout = () => {
    window.location.href = 'checkout.html'; // Redirigir a la página de pago
  };

  // Asignar los eventos de clic a los botones de eliminar, aumentar y disminuir
  cartItemsContainer.addEventListener('click', (event) => {
    handleRemoveItem(event);
    handleAddItem(event);
    handleDecreaseItem(event);
  });

  // Asignar el evento de clic al botón de vaciar carrito
  clearCartButton.addEventListener('click', clearCart);

  // Asignar el evento de clic al botón de proceder al pago
  checkoutButton.addEventListener('click', handleCheckout);

  // Mostrar los productos en el carrito al cargar la página
  updateCartDisplay();
});
