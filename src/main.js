import MemoryGameBoard from './board.js';
import gameConfig from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  const memoryGame = new MemoryGameBoard(gameConfig);
  memoryGame.init(); 
});