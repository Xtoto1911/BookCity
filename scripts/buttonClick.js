import {
  setBasketLocalStorage,
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from './utils.js';

import { handleCardClick, checkingActiveButtons } from './card.js';

const wrapper = document.querySelector('.main-container');
let productsData = [];

init();

async function init() {
  productsData = await getProducts('/data/main.json', productsData);
  const basket = getBasketLocalStorage();
  checkingActiveButtons(basket);
}

async function getProducts(path, productsData) {
  try {
    if (!productsData.length) {
      const res = await fetch(path);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      productsData = await res.json();
    }

    loadProductDetails(productsData);
    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);

  } catch (err) {
    console.log(err.message);
  }
}

function getParameterFromURL(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameter);
}

function loadProductDetails(data) {
  if (!data || !data.length) {
    showErrorMessage('Ошибка сервера');
    return;
  }

  checkingRelevanceValueBasket(data);

  const productId = Number(getParameterFromURL('id'));

  if (!productId) {
    showErrorMessage('Информация о продукте не найдена');
    return;
  }

  const findProduct = data.find(card => card.id === productId);

  if (!findProduct) {
    showErrorMessage('Информация о продукте не найдена');
    return;
  }

  // Создаем хлебные крошки
  updateBreadcrumbs(findProduct.category, findProduct.title);

  // Отрисовываем информацию о продукте
  renderInfoProduct(findProduct);
}

function updateBreadcrumbs(category, productTitle) {
  const breadcrumbs = document.querySelector('.breadcrumb');
  
  // Очищаем текущие хлебные крошки
  breadcrumbs.innerHTML = '';

  // Добавляем крошку "Главная"
  breadcrumbs.insertAdjacentHTML('beforeend', `
    <li class="breadcrumb-item"><a href="index.html">Главная</a></li>
  `);

  // Добавляем крошку для категории
  if (category) {
    breadcrumbs.insertAdjacentHTML('beforeend', `
      <li class="breadcrumb-item"><a href="${category}.html">${category}</a></li>
    `);
  }

  // Добавляем крошку для продукта (название продукта без ссылки)
  breadcrumbs.insertAdjacentHTML('beforeend', `
    <li class="breadcrumb-item active" aria-current="page">${productTitle}</li>
  `);
}

function renderInfoProduct(product) {
  const { id, image, title, price } = product;
  const productItem = `
    <div class="card flex-column justify-content-center" data-product-id="${id}">
      <h2 class="product__title w-100 d-flex justify-content-center">${title}</a></h2>
      <div class="product__img ms-md-2 ms-lg-3">
        <img src="${image}" alt="${title} class="w-100"">
      </div>
      <div class="product__inner-price">
        <div class="product__price">
          <b>Цена:</b>
          ${price}₽
        </div>
        <div class="card-body__container d-flex justify-content-center mt-4">
          <button class="btn card__add btn-primary text-nowrap">Купить</button>
        </div>
      </div>
    </div>
  `;
  wrapper.insertAdjacentHTML('beforeend', productItem);

  const buyButton = wrapper.querySelector('.btn.card__add');
  // Теперь вызываем handleCardClick с событием клика
  buyButton.addEventListener('click', handleCardClick);
}

function showErrorMessage(message) {
  const errorElement = document.createElement('div');
  errorElement.classList.add('error-message');
  errorElement.textContent = message;
  wrapper.appendChild(errorElement);
}
