import { 
  setBasketLocalStorage,
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from './utils.js';

const cart = document.querySelector('.cart');
const totalPriceContainer = document.querySelector('.total-price');
const checkoutButton = document.querySelector('.btn-send');
checkoutButton.addEventListener('click', function(){
  localStorage.clear();
  loadProductBasket();
})
let productsData = [];

getProducts();
const basketCountElements = document.querySelectorAll('.basket__count');

async function getProducts() {
  try {
      if (!productsData.length) {
          const res = await fetch('../data/main.json');
          if (!res.ok) {
              throw new Error(res.statusText);
          }
          productsData = await res.json();
      }
      loadProductBasket(productsData);
  } catch (err) {
      console.log(err.message);
  }
}

function loadProductBasket(data) {
  cart.textContent = '';  // Очистка корзины

  const basket = getBasketLocalStorage();
  basketCountElements.forEach(element => {
    element.textContent = basket.length;
  });
  cart.addEventListener('click', handleCartActions);
  // Проверяем, пуста ли корзина
  if (!basket || !basket.length) {
      showEmptyCartMessage();
      return;
  }

  const findProducts = data.filter(item => basket.includes(String(item.id)));
  
  // Если найдены товары
  if (!findProducts.length) {
      showEmptyCartMessage();
      return;
  }

  renderProductsBasket(findProducts);
  calculateTotalPrice();
}

// Функция для отображения товаров в корзине
function renderProductsBasket(arr) {
  arr.forEach(card => {
      const { id, image, title, price, category } = card;

      const cardItem = `
      <div class="cart__product" data-product-id="${id}">
          <div class="cart__img">
              <img src="${image}" alt="${title}">
          </div>
          <div class="cart__title m-md-4">
              <a href="card.html?id=${id}&category=${category}">${title}</a>
          </div>
          <div class="cart__block-btns">
              <div class="cart__minus">-</div>
              <div class="cart__count">1</div> <!-- Значение по умолчанию -->
              <div class="cart__plus">+</div>
          </div>
          <div class="cart__price">
              <span>${price}</span> ₽
          </div>
          <div class="cart__del-card">X</div>
      </div>
      `;

      cart.insertAdjacentHTML('beforeend', cardItem);
  });
}

// Функция для работы с изменением количества, удалением товара и пересчетом общей цены
function handleCartActions(event) {
  const targetButton = event.target;
  const productElement = targetButton.closest('.cart__product');
  if (!productElement) return;

  const productId = productElement.dataset.productId;
  const countElement = productElement.querySelector('.cart__count');
  const priceElement = productElement.querySelector('.cart__price span');
  let currentCount = parseInt(countElement.textContent);
  let productPrice = productsData.find(product => product.id == productId).price;

  // Увеличение количества
  if (targetButton.classList.contains('cart__plus')) {
      if(currentCount < 10) currentCount++;
  }

  // Уменьшение количества
  if (targetButton.classList.contains('cart__minus')) {
      if (currentCount > 1) currentCount--;  // Минимум 1 товар
  }

  // Удаление товара
  if (targetButton.classList.contains('cart__del-card')) {
      removeProductFromBasket(productId);
      return;
  }

  // Обновляем количество и цену за товар
  countElement.textContent = currentCount;
  priceElement.textContent = (currentCount * productPrice);

  calculateTotalPrice(); // Пересчитываем общую сумму
}

// Функция для удаления товара из корзины
function removeProductFromBasket(id) {
  const basket = getBasketLocalStorage();
  const newBasket = basket.filter(item => item !== id);
  setBasketLocalStorage(newBasket);

  getProducts();  // Перезагружаем корзину
}

// Функция для пересчета общей суммы товаров в корзине
function calculateTotalPrice() {
  const prices = [...document.querySelectorAll('.cart__price span')];
  let total = prices.reduce((sum, price) => sum + parseFloat(price.textContent), 0);

  totalPriceContainer.textContent = `Общая сумма: ${total.toFixed(2)} ₽`;

  if (total === 0) {
      showEmptyCartMessage();
  }
}

// Функция для показа сообщения о пустой корзине
function showEmptyCartMessage() {
  cart.textContent = 'Корзина пуста';
  totalPriceContainer.textContent = '';
  checkoutButton.style.display = 'none';  // Скрываем кнопку "Оформить заказ"
}

// Показываем кнопку оформления заказа, если корзина не пуста
function showCheckoutButton() {
  checkoutButton.style.display = 'block';
}
