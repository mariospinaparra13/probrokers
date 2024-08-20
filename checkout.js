document.addEventListener('DOMContentLoaded', () => {
  const checkoutTotalElement = document.querySelector('#checkout-total');
  const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
  const paymentOptions = document.getElementById('payment-options');
  const payPSEBtn = document.getElementById('pay-pse');
  const payBanksBtn = document.getElementById('pay-bancos');
  const pseOptions = document.getElementById('pse-options');
  const payNequiBtn = document.getElementById('pay-nequi');
  const payBancosBtn = document.getElementById('pay-bancos');

  // Recuperar el carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  // Calcular el total sumando el precio de cada artículo por su cantidad
  cart.forEach(item => {
    if (item.price && item.quantity) {
      total += parseFloat(item.price) * parseInt(item.quantity, 10);
    }
  });

  // Mostrar el total en la página de pago
  checkoutTotalElement.textContent = `$${total.toLocaleString()}`;

  // Verificar si el usuario está autenticado
  function isAuthenticated() {
    // Aquí deberías comprobar si el usuario está autenticado, por ejemplo, verificando un token en localStorage
    // Ejemplo simple de comprobación
    return localStorage.getItem('authToken') !== null;
  }

  // Manejar el clic en el botón de confirmar pago
  confirmPaymentBtn.addEventListener('click', () => {
    if (isAuthenticated()) {
      // Mostrar el contenedor de opciones de pago si el usuario está autenticado
      paymentOptions.classList.remove('hidden');
    } else {
      // Redirigir a la página de inicio de sesión si el usuario no está autenticado
      window.location.href = '/Inicio_Sesion/frm_index_inicio.html'; // Cambia esto por la URL de tu página de inicio de sesión
    }
  });

  // Mostrar opciones adicionales cuando se selecciona PSE
  payPSEBtn.addEventListener('click', () => {
    pseOptions.classList.remove('hidden');
    payPSEBtn.classList.add('hidden'); // Oculta el botón de PSE para no mostrarlo dos veces
  });

  // Redirigir a la página de Nequi
  payNequiBtn.addEventListener('click', () => {
    window.location.href = 'https://ejemplo.com/nequi'; // Cambia esto por la URL de tu página de Nequi
  });

  // Redirigir a la página de Bancos
  payBancosBtn.addEventListener('click', () => {
    window.location.href = 'https://ejemplo.com/bancos'; // Cambia esto por la URL de tu página de Bancos
  });

  // Redirigir a la página de Bancos directamente
  payBanksBtn.addEventListener('click', () => {
    window.location.href = 'https://ejemplo.com/bancos'; // Cambia esto por la URL de tu página de Bancos
  });
});
