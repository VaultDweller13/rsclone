import { createChoice, createLayer, createElement, resetPage, warning } from '../common';
import castle from '../../Assets/castle.jpg';
import { createCharacter } from './characterCreator';
import changeParty from './changeParty';
import initGame from '../../../game';
import { party } from '../partyInitializer';

function renderCastle() {
  resetPage();
  const locationName = document.getElementById('location-name') as HTMLElement;
  locationName.innerHTML = 'Castle';
  const firstChoice = createElement('div', 'cstl-choice', 'block pop-up left');
  firstChoice.innerHTML = `
  <button class="button" id="tavern">Gilgamesh's Tavern</button>
  <button class="button" id="inn">Adventure's Inn</button>
  <button class="button" id="trade-post">Boltac's Trading Post</button>
  <button class="button" id="temple">Temple of Cant</button>
  <button class="button" id="enter-maze">Enter maze</button>
  `;
  const view = document.getElementById('view') as HTMLElement;
  view.style.backgroundImage = `url(${castle as string})`;
  view.style.backgroundSize = '100% 100%';
  view.append(firstChoice);
}

let implementCastle = () => {};

function enterCastle() {
  renderCastle();
  implementCastle();
}

implementCastle = () => {
  const view = document.getElementById('view') as HTMLElement;
  document.getElementById('tavern')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('tav-choice', [
          {
            id: 'add-to-prty',
            name: 'change party',
            func: () => changeParty(),
          },
          { id: 'inspect', name: 'inspect character' },
          {
            id: 'inspect',
            name: 'create character',
            func: () => createCharacter(),
          },
        ])
      )
    );
  });
  document.getElementById('inn')?.addEventListener('click', () => {
    view.append(
      createLayer(1, createChoice('inn-choice', [{ id: 'rest', name: 'rest' }]))
    );
  });
  document.getElementById('trade-post')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('trade-choice', [
          { id: 'buy', name: 'buy' },
          { id: 'sell', name: 'sell' },
          { id: 'uncurse', name: 'remove curse' },
          { id: 'identify', name: 'identify' },
        ])
      )
    );
  });
  document.getElementById('temple')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('temple-choice', [{ id: 'heal', name: 'Heal / Revive' }])
      )
    );
  });
  document.getElementById('enter-maze')?.addEventListener('click', () => {
    if (party.getParty().length > 0) {
      const locationName = document.getElementById('location-name');
    if (locationName) {
      locationName.textContent = 'Maze';
    }
    document.getElementById('cstl-choice')?.remove();
    if (!document.getElementById('view')?.classList.contains('maze')){
      document.getElementById('view')?.classList.add('maze');
    }
    initGame();
    } else {
      warning('You cannot enter maze without a party');
    }
  });
};

export default enterCastle;
