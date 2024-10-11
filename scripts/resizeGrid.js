
export function switchGridLayout(gridType) {
  const svgBig = document.getElementById('big-grid');
  const svgSmall = document.getElementById('small-grid');
  const cards = document.getElementsByClassName('card_contaiter');

  if (gridType === 'big') {
    svgBig.classList.add('d-none');
    svgSmall.classList.remove('d-none');
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('col-lg-4', 'col-md-4', 'col-12');
      cards[i].classList.add('col-lg-3', 'col-md-3', 'col-6');
    }
  } else {
    svgSmall.classList.add('d-none');
    svgBig.classList.remove('d-none');
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('col-lg-3', 'col-md-3', 'col-6');
      cards[i].classList.add('col-lg-4', 'col-md-4', 'col-12');
    }
  }
}





