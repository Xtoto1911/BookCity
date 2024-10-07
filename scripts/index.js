import { PRODUCTS } from './constant.js';

function addProductsToCarousel(products, id) {
  const carouselInner = document.getElementById(id);
  let carouselItems = '';


  let groupSize = 4
  if(window.innerWidth < 768){
    groupSize = 1
  }else if(window.innerWidth < 1000){
    groupSize = 3
  }else{
    groupSize = 4
  }
  

  for (let i = 0; i < products.length; i += groupSize) {
    const isActive = i === 0 ? 'active' : '';  // Первый слайд активный
    carouselItems += `<div class="carousel-item ${isActive} carusel-cards"><div class="row justify-content-center">`;

    // Добавляем карточки в текущую группу
    for (let j = i; j < i + groupSize && j < products.length; j++) {
      const product = products[j];
      carouselItems += `
        <a class="col-lg-3 col-md-4 col-sm-5 col-12 p-1" href = "#">
          <div class="card carusel-cards__item">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.price} ₽</h5>
              <p class="card-text">${product.description}</p>
              <div class = "d-flex justify-content-between">
                <button class="btn btn-primary">Добавить в корзину</button>
                <button class="btn btn-primary">Добавить в закладки</button>
              </div>
            </div>
          </div>
        </a>`;
    }

    carouselItems += `</div></div>`;
  }

  carouselInner.innerHTML = carouselItems;
}

window.onload = function() {
  addProductsToCarousel(PRODUCTS,'newProductCarouselInner');
  addProductsToCarousel(PRODUCTS,'goodProductCarouselInner');
};
window.addEventListener('resize', function() {
    addProductsToCarousel(PRODUCTS,'newProductCarouselInner');
    addProductsToCarousel(PRODUCTS,'goodProductCarouselInner');
});

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


