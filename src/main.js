import MemoryGameBoard from './board.js';
import gameConfig from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  let memoryGame = null;

  const startGame = () => {
    console.log('entering game start  ')
    if (memoryGame) {
      console.log(memoryGame)
      console.log('Game already started, returning...');
      return;
    }
    memoryGame = new MemoryGameBoard(gameConfig);
    document.getElementById('timer').style.width = '100px';
  };

  const restartGame = () => {
    console.log('Restarting the game');
    if (memoryGame) {
      memoryGame.destroy();
      memoryGame = null;
      const board = document.querySelector('.board');
      board.parentNode.removeChild(board);
    }
    startGame();
  };

  const addEventListeners = () => {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart-button').addEventListener('click', restartGame);
  };  

  // Initial start of the game
  console.log('DOMContentLoaded event fired');
  addEventListeners();
});