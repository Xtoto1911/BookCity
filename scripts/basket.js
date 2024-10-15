
import { 
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';

const cart = document.querySelector('.cart');
let productsData = [];


getProducts();
cart.addEventListener('click', delProductBasket);


async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/main.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
        
        loadProductBasket(productsData);

    } catch (err) {
        console.log(err.message);
    }
}

function loadProductBasket(data) {
  cart.textContent = '';

  if (!data || !data.length) {
      return;
  }

  checkingRelevanceValueBasket(data);
  const basket = getBasketLocalStorage();

  if (!basket || !basket.length) {
      showErrorMessage(NO_ITEMS_CART);
      document.querySelector('.btn-send').disabled = true; // Disable button
      return;
  }

  document.querySelector('.btn-send').disabled = false; // Enable button if items exist

  const findProducts = data.filter(item => basket.includes(String(item.id)));

  if (!findProducts.length) {
      return;
  }

  renderProductsBasket(findProducts);
}


function delProductBasket(event) {
    const targetButton = event.target.closest('.cart__del-card');
    if (!targetButton) return;

    const card = targetButton.closest('.cart__product');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    const newBasket = basket.filter(item => item !== id);
    setBasketLocalStorage(newBasket);

    getProducts()
}

function renderProductsBasket(arr) {
    arr.forEach(card => {
        const { id, image, title, price} = card;

        const cardItem = 
        `
        <div class="cart__product" data-product-id="${id}">
            <div class="cart__img">
                <img src="${image}" alt="${title}">
            </div>
            <div class="cart__title"><a href = "card.html?id=${id}">${title}</a></div>
            <div class="cart__block-btns">
                <div class="cart__minus">-</div>
                <div class="cart__count">1</div>
                <div class="cart__plus">+</div>
            </div>
            <div class="cart__price">
                <span>${price}</span>₽
            </div>
            <div class="cart__del-card">X</div>
        </div>
        `;

        cart.insertAdjacentHTML('beforeend', cardItem);
    });
}