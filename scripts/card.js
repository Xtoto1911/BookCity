import {
  setBasketLocalStorage,
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from './utils.js';


let cards = document.querySelector('.cards');
if(cards){
  console.log("Не найдено")
  cards.addEventListener('click', handleCardClick);
}
else {
  console.log("Много карточек");
  const cards = document.querySelectorAll('.cards-main');
  cards.forEach(card => {
    card.addEventListener('click', handleCardClick);
  });
  console.log("Обработчик событий был повешен на элементы с классом 'cards-main'");
}



// Получение продуктов с сервера
export async function getProducts(path, productsData) {
  try {
    if (!productsData.length) {
      const res = await fetch(path);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      productsData = await res.json();
      return productsData;
    }
  } catch (err) {
    console.log('нет продуктов!');
    console.log(err.message);
  }
}

// Рендеринг начальной страницы с ограничением на количество отображаемых карточек
export function renderStartPage(data, shownCards = 8) {
  if (!data || !data.length) {
    console.log('Нет данных!');
    return;
  }

  // Показываем только первые shownCards
  const arrCards = data.slice(0, shownCards);
  createCards(arrCards);
  checkingRelevanceValueBasket(data);

  const basket = getBasketLocalStorage();
  checkingActiveButtons(basket);
}

// Обновление и добавление новых карточек при скролле
export function sliceArrCards(productsData, COUNT_SHOW_CARDS_CLICK, countClickBtnShowCards, shownCards) {
  // Проверяем, если уже все карточки показаны
  if (shownCards >= productsData.length) return shownCards;

  const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtnShowCards;

  // Получаем новые карточки
  const arrCards = productsData.slice(shownCards, countShowCards);
  createCards(arrCards);

  // Возвращаем новое количество отображаемых карточек
  return cards.children.length;

}

export function handleCardClick(event) {
  const targetButton = event.target.closest('.card__add');
  if (!targetButton){ 
    console.log("нет");
    return
  }
  const card = targetButton.closest('.card');
  const id = card.dataset.productId;
  const basket = getBasketLocalStorage();
  if (basket.includes(id)) return;

  basket.push(id);
  setBasketLocalStorage(basket);
  checkingActiveButtons(basket);
}

export function checkingActiveButtons(basket) {
  const buttons = document.querySelectorAll('.card__add');

  buttons.forEach(btn => {
      const card = btn.closest('.card');
      const id = card.dataset.productId;
      const isInBasket = basket.includes(id);

      btn.disabled = isInBasket;
      btn.classList.toggle('active', isInBasket);
      btn.textContent = isInBasket ? 'В корзине' : 'В корзину';
  });
}

// Функция создания карточек
function createCards(data) {
  data.forEach(card => {
    const { id, image, title, price, category} = card;
    console.log(category)
    const cardItem = `
      <div class="card_contaiter col-lg-3 col-md-3 col-6 p-1">
        <div class="card h-100" data-product-id="${id}">
          <a href="#.html?id=${id}">
            <img src="${image}" class="card-img-top" alt="${title}">
          </a>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${price} ₽</h5>
            <a href="card.html?id=${id}&category=${category}">
              <p class="card-text">${title}</p>
            </a>
            <div class="card-body__container d-flex justify-content-center mt-4"> 
              <button class="btn card__add btn-primary text-nowrap">В корзину</button>
            </div>
          </div>
        </div>
      </div>
    `;
    cards.insertAdjacentHTML('beforeend', cardItem);
  });
}

