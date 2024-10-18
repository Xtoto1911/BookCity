// Получение id из LS
export function getBasketLocalStorage() {
  const cartDataJSON = localStorage.getItem('basket');
  console.log(cartDataJSON)
  return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}

// Запись id товаров в LS
export function setBasketLocalStorage(basket) {
  const basketCountElements = document.querySelectorAll('.basket__count');
  console.log(basket)
  localStorage.setItem('basket', JSON.stringify(basket));

  basketCountElements.forEach(element => {
    element.textContent = basket.length;
  });
}


// Проверка, существует ли товар указанный в LS 
//(если например пару дней не заходил юзер, а товар, который у него в корзине, уже не существует)
export function checkingRelevanceValueBasket(productsData) {
  const basket = getBasketLocalStorage();

  basket.forEach((basketId, index) => {
      const existsInProducts = productsData.some(item => item.id === Number(basketId));
      if (!existsInProducts) {
          basket.splice(index, 1);
      }
  });

  setBasketLocalStorage(basket);
}