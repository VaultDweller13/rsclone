import { createElement } from './common';
import initGame from '../../game';

function enterMaze() {
  const mazeButBlock = createElement('div', '', 'block');
  const mazeBut = createElement('button', 'maze-but');
  mazeBut.textContent = 'Enter Maze';
  mazeButBlock.append(mazeBut);
  document.getElementById('main')?.append(mazeButBlock);
  mazeBut.addEventListener('click', () => {
    (document.getElementById('main') as HTMLElement).innerHTML = '';
    initGame();
  });
}

export default enterMaze;
