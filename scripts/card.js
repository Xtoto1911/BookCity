import{
  setBasketLocalStorage,
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from './utils.js'

import{
  PRODUCTS,
  LSNaming,
  ClassName
} from './constant.js'


const cards = document.querySelector('.cards');
const btnShowCards = document.querySelector('.show-cards');
let shownCards = 5;
let countClickBtnShowCards = 1;
let productsData = [];

export async function getProducts(path, productsData) {
  try {

      if (!productsData.length) {
          const res = await fetch(path);
          if (!res.ok) {
              throw new Error(res.statusText)
          }
          productsData = await res.json();
          return productsData
      }

  } catch (err) {
      console.log('нет продуктов!')
      console.log(err.message);
  }
}

export function renderStartPage(data) {
  if (!data || !data.length) {
      console.log('Нет данных!')
      return 
  };

  const arrCards = data.slice(0, 6);
  createCards(arrCards);

  //checkingRelevanceValueBasket(data);

  //const basket = getBasketLocalStorage();
  //checkingActiveButtons(basket);
}


function createCards(data) {
  data.forEach(card => {
      const { id, image, title, price} = card;
  const cardItem = 
    `
          <div class="col-lg-4 col-md-4 col-5 p-0"
            <div class="card" data-product-id="${id}">
              <a href = "#.html?id=${id}" ><img src="${image}" class="card-img-top" alt="${title}"></a>
              <div class="card-body">
                <h5 class="card-title">${price} ₽</h5>
                <a href = "#.html?id=${id}"><p class="card-text">${title}</p></a>
                <div class = "d-flex justify-content-between">
                  <button class="btn btn-add-basket btn-primary text-nowrap ">Купить</button>
                  <button class="btn btn-light border-1 border-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          `
      cards.insertAdjacentHTML('beforeend', cardItem);
  });
}