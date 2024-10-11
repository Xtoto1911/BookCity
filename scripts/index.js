import { getProducts } from './card.js';
import { PRODUCTS } from './constant.js';

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
    carouselItems += `<div class="carousel-item ${isActive} carusel-cards"><div class="row justify-content-center">`;

    for (let j = i; j < i + groupSize && j < products.length; j++) {
      const product = products[j];
      carouselItems += `
        <div class="col-lg-3 col-md-4 col-sm-5 col-12 p-1" href = "#">
          <div class="card carusel-cards__item" data-product-id="${product.id}">
            <a href = "#.html?id=${product.id}" ><img src="${product.image}" class="card-img-top" alt="${product.title}"></a>
            <div class="card-body">
              <h5 class="card-title">${product.price} ₽</h5>
              <a href = "#.html?id=${product.id}"><p class="card-text">${product.title}</p></a>
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
        </div>`;
    }

    carouselItems += `</div></div>`;
  }

  carouselInner.innerHTML = carouselItems;
}

async function init() {
  productsData = await getProducts('/data/main.json',productsData);
  render()
}

function render(){
  addProductsToCarousel(productsData, 'newProductCarouselInner');
  addProductsToCarousel(productsData, 'goodProductCarouselInner');
}
let productsData = []
init();

window.addEventListener('resize', render);

window.onscroll = function() {
  let scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const scrollUpBtn = document.getElementById('scrollToTopBtn');
scrollUpBtn.addEventListener('click', scrollToTop);
