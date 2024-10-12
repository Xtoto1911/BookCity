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
    renderInfoProduct(findProduct);
  }
  
  function renderInfoProduct(product) {
    const { id, image, title, price } = product;
    const productItem = `
      <div class="card flex-column justify-content-center" data-product-id="${id}">
        <h2 class="product__title">${title}</h2>
        <div class="product__img">
          <img src="${image}" alt="${title}">
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
  
    // Добавляем обработчик событий для кнопки "Купить"
    const buyButton = wrapper.querySelector('.btn.card__add');
    buyButton.addEventListener('click', () => handleCardClick(product));
  }
  
  function showErrorMessage(message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    wrapper.appendChild(errorElement);
  }
  
  // Функции из utils.js
  function getBasketLocalStorage() {
    const basket = localStorage.getItem('basket');
    return basket ? JSON.parse(basket) : [];
  }
  
  function setBasketLocalStorage(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
  }
  
  function checkingRelevanceValueBasket(data) {
    const basket = getBasketLocalStorage();
    const updatedBasket = basket.filter(id => data.some(product => product.id === id));
    setBasketLocalStorage(updatedBasket);
  }