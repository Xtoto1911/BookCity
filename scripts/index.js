import { getProducts, renderStartPage, sliceArrCards, handleCardClick, checkingActiveButtons} from './card.js';
import { PRODUCTS } from './constant.js';
import {
  setBasketLocalStorage,
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from './utils.js';



function addProductsToCarousel(products, id) {
  const carouselInner = document.getElementById(id);
  let carouselItems = '';

  let groupSize = 4;
  if (window.innerWidth < 768) {
    groupSize = 1;
  } else if (window.innerWidth < 1000) {
    groupSize = 3;
  } else {
    groupSize = 4;
  }

  for (let i = 0; i < products.length; i += groupSize) {
    const isActive = i === 0 ? 'active' : '';
    carouselItems += `<div class="carousel-item ${isActive} carusel-cards"><div class="row cards-main justify-content-center">`;

    for (let j = i; j < i + groupSize && j < products.length; j++) {
      const product = products[j];
      carouselItems += `
        <div class="col-lg-3 col-md-4 col-sm-5 col-12 p-1" href = "#">
          <div class="card carusel-cards__item" data-product-id="${product.id}">
            <a href = "#.html?id=${product.id}" ><img src="${product.image}" class="card-img-top" alt="${product.title}"></a>
            <div class="card-body">
              <h5 class="card-title">${product.price} ₽</h5>
              <a href = "#.html?id=${product.id}"><p class="card-text">${product.title}</p></a>
              <div class = "card-body__container d-flex justify-content-center mt-4"> 
                <button class="btn card__add btn-primary text-nowrap">Купить</button>
              </div>
            </div>
          </div>
        </div>`;
    }

    carouselItems += `</div></div>`;
  }

  carouselInner.innerHTML = carouselItems;
}

async function init() {
  productsData = await getProducts('/data/main.json',productsData);
  checkingRelevanceValueBasket(productsData);

  
  render()
  addEventListenersToCards();
  const basket = getBasketLocalStorage();
  checkingActiveButtons(basket);
}

function addEventListenersToCards() {
  console.log("Много карточек");
  const cards = document.querySelectorAll('.cards-main');

  if (cards.length === 0) {
      console.log("Элементы с классом '.cards-main' не найдены.");
      return; // Прекратите выполнение, если элементы не найдены
  }

  cards.forEach(card => {
      card.addEventListener('click', handleCardClick);
  });
}

function render(){
  addProductsToCarousel(productsData, 'newProductCarouselInner');
  addProductsToCarousel(productsData, 'goodProductCarouselInner');
}
let productsData = []
init();

window.addEventListener('resize', render);
