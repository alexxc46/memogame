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
      card.addEventListener('click', () => this.clickHandler(this));
      return card;
    }
  
    reveal() {
      this.element.textContent = this.value;
    }
  
    hide() {
      this.element.textContent = '?';
    }
  }
  
  export default Card;