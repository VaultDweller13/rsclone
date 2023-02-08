import { createElement, getMain } from './common';
import initGame from '../../game';

function enterMaze() {
  const block = createElement('div', '', 'block');
  const button = createElement('button', 'maze-but');
  button.textContent = 'Enter Maze';
  block.append(button);
  getMain().append(block);
  button.addEventListener('click', () => {
    getMain().innerHTML = '';
    initGame();
  });
}

export default enterMaze;
