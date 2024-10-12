import {
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from './utils.js';

import {handleCardClick, checkingActiveButtons} from './card.js';

const wrapper = document.querySelector('.main-container');
let productsData = [];


init()

async function init() {
  productsData = await getProducts('/data/main.json',productsData);
  const basket = getBasketLocalStorage();
  checkingActiveButtons(basket);
}

async function getProducts(path, productsData) {
    try {
        if (!productsData.length) {
            const res = await fetch(path);
            if (!res.ok) {
                throw new Error(res.statusText)
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
        showErrorMessage(ERROR_SERVER)
        return;
    }

    checkingRelevanceValueBasket(data);

    const productId = Number(getParameterFromURL('id'));

    if (!productId) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return;
    }

    const findProduct = data.find(card => card.id === productId);

    if(!findProduct) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return;
    }
    renderInfoProduct(findProduct);
}


function renderInfoProduct(product) {
    const {id,image, title, price} = product;;
    const productItem = 
        `
         <div class="card flex-column justify-content-center data-product-id="${id}">
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
        `
    wrapper.insertAdjacentHTML('beforeend', productItem);
}