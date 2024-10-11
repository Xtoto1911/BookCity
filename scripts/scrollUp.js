window.addEventListener('scroll',function() {
  let scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const scrollUpBtn = document.getElementById('scrollToTopBtn');
scrollUpBtn.addEventListener('click', scrollToTop);