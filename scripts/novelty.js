import { getProducts, renderStartPage } from './card.js';

let productsData = [];

async function init() {
  productsData = await getProducts('/data/main.json', productsData);
  console.log(productsData)
  renderStartPage(productsData);
}

function toggleLayout() {
  const cardsContainer = document.querySelector('.cards');
  cardsContainer.classList.toggle('cards-large');

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.toggle('card-large');
  });
}

init();
const toggleLayoutButton = document.getElementById('toggle-layout');
toggleLayoutButton.addEventListener('click', toggleLayout);



