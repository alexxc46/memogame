import anime from '../node_modules/animejs/lib/anime.es.js';

class Card {
  constructor(value, index, clickHandler) {
    this.value = value;
    this.index = index;
    this.clickHandler = clickHandler;
    this.element = this.createCardElement();
  }

  createCardElement() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = this.index;
    card.textContent = '?';
    
    // Add click event listener to trigger the animation
    card.addEventListener('click', () => this.clickHandler(this));

    return card;
  }

  reveal() {
    anime({
      targets: this.element,
      rotateY: 180,
      easing: 'easeInOutQuad',
      duration: 500,
      complete: () => {
        this.element.innerHTML = `<p class="mirror-text">${this.value}</p>`;
      },
    });
  }

  hide() {
    anime({
      targets: this.element,
      rotateY: 0,
      easing: 'easeInOutQuad',
      duration: 500,
      complete: () => {
        this.element.innerHTML = `<p>?</p>`;
      },
    });
  }
}

export default Card;