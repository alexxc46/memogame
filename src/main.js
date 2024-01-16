import MemoryGameBoard from './board.js';
import gameConfig from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  let memoryGame = null;

  const startGame = () => {
    console.log('Starting the game');
    if (memoryGame) {
      console.log('Game already started, returning...');
      return;
    }
    memoryGame = new MemoryGameBoard(gameConfig);
    addEventListeners();
  };

  const restartGame = () => {
    console.log('Restarting the game');
    if (memoryGame) {
      memoryGame.destroy();
      memoryGame = null;
    }
    startGame();
  };

  const addEventListeners = () => {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('restartButton').addEventListener('click', restartGame);
  };

  // Initial start of the game
  console.log('DOMContentLoaded event fired');
  startGame();
});