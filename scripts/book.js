import { getProducts, renderStartPage, sliceArrCards, checkingActiveButtons } from './card.js';
import { switchGridLayout } from './resizeGrid.js';

import {
  setBasketLocalStorage,
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from './utils.js';

let productsData = [];
const COUNT_SHOW_CARDS_CLICK = 8;
let shownCards = COUNT_SHOW_CARDS_CLICK;
let countClickBtnShowCards = 0;

async function init() {
  productsData = await getProducts('/data/book.json', productsData);
  console.log(productsData);

  // Передаем значение shownCards в renderStartPage
  renderStartPage(productsData, shownCards);
}

init();

document.getElementById('big-grid').addEventListener('click', () => {
  console.log('Большая сетка');
  switchGridLayout('big');
});

document.getElementById('small-grid').addEventListener('click', () => {
  console.log('Маленькая сетка');
  switchGridLayout('small');
});

let lastScrollPosition = 0;
console.log(countClickBtnShowCards, shownCards);

window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const documentHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  // Когда скроллим к низу страницы
  if (scrollPosition + windowHeight >= documentHeight - 100 && scrollPosition !== lastScrollPosition) {
    countClickBtnShowCards++;
    
    // Передаем обновленное количество карточек для отображения
    shownCards = sliceArrCards(productsData, COUNT_SHOW_CARDS_CLICK, countClickBtnShowCards, shownCards);
    console.log(countClickBtnShowCards, shownCards);
    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
    lastScrollPosition = scrollPosition;
  }
});
