import Card from './card.js';

class MemoryGameBoard {
  constructor(config) {
    this.config = config;
    this.cards = this.generateShuffledCards();
    this.flippedCards = [];
    this.matchedCards = [];

    this.wrapper = document.getElementById('wrapper');
    this.timer = null;
    this.timeElapsed = config.timeLimit;
    this.timerDisplay = document.getElementById('timer');

    this.createBoard();
  }

  calculateCardSize() {
    const boardWidth = this.config.width;
    const boardHeight = this.config.height;
    const columns = this.config.columns;
    const rows = this.config.rows;

    const cardWidth = Math.floor(boardWidth / columns) - 10; // Adjust with a margin
    const cardHeight = Math.floor(boardHeight / rows) - 10; // Adjust with a margin

    return { cardWidth, cardHeight };
  }

  generateShuffledCards() {
    const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    values.push(...values);
    const shuffledValues = this.shuffleArray(values);
    return shuffledValues.map((value, index) => new Card(value, index, this.handleCardClick.bind(this)));
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createBoard() {
    const { cardWidth, cardHeight } = this.calculateCardSize();

    const board = document.createElement('div');
    board.classList.add('board');
    board.style.width = `${this.config.width}px`;
    board.style.height = `${this.config.height}px`;
    board.style.backgroundColor = this.config.theme.backgroundColor;

    this.cards.forEach(card => {
      card.element.style.width = `${cardWidth}px`;
      card.element.style.height = `${cardHeight}px`;
      board.appendChild(card.element);
    });

    if (this.wrapper) {
      this.wrapper.appendChild(board);
    } else {
      console.error('Wrapper element not found.');
    }

    this.wrapper.addEventListener('mouseover', this.handleMouseOver.bind(this));
    this.wrapper.addEventListener('mouseout', this.handleMouseOut.bind(this));

    this.startTimer();
  }

  handleMouseOver() {
    if (!this.timer) {
      this.startTimer();
    }
  }

  handleMouseOut() {
    if (this.timer) {
      this.pauseTimer();
    }
  }

  handleCardClick(clickedCard) {
    if (this.flippedCards.length < 2 && !this.flippedCards.includes(clickedCard)) {
      clickedCard.reveal();
      this.flippedCards.push(clickedCard);

      if (this.flippedCards.length === 2) {
        setTimeout(() => this.checkMatch(), 1000);
      }
    }
  }

  startTimer() {
    this.timer = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    this.timeElapsed--;
    this.displayTime();
    
    if (this.timeElapsed <= 0) {
      this.endGame();
    }
  }

  displayTime() {
    const minutes = Math.floor(this.timeElapsed / 60);
    const seconds = this.timeElapsed % 60;
    this.timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  endGame() {
    console.log('Game Over - Time Limit Exceeded');
    clearInterval(this.timer);
    // Additional logic to handle game over, such as displaying a message
    // or resetting the game state
    this.destroy();
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    if (card1.value === card2.value) {
      this.matchedCards.push(card1, card2);
      if (this.matchedCards.length === this.cards.length) {
        alert('Congratulations! You matched all the cards.');
      }
    } else {
      card1.hide();
      card2.hide();
    }

    this.flippedCards = [];
  }

  destroy() {
    // Implement cleanup logic if needed when restarting the game
    const board = document.querySelector('.board');
    board.parentNode.removeChild(board);
  }
}

export default MemoryGameBoard;