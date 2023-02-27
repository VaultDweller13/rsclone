import { createElement, getMain } from './common';
import initGame from '../../game/run';
import mazeParty from './maze/mazeParty';

function enterMaze() {
  const block = createElement('div', '', 'block');
  const button = createElement('button', 'maze', 'button');
  button.textContent = 'Enter Maze';
  block.append(button);
  getMain().append(block);
  button.addEventListener('click', () => {
    getMain().innerHTML = '';
    initGame();
    mazeParty();
    console.log('a');
  });
}

export default enterMaze;
