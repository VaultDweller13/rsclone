import { createChoice, createLayer, createElement } from './common';
import castle from '../Assets/castle.jpg';

function renderCastle() {
  const locationName = document.getElementById('location-name') as HTMLElement;
  locationName.innerHTML = 'Castle';
  const firstChoice = createElement('div', 'cstl-choice', 'block pop-up');
  firstChoice.innerHTML = `
  <button id="tavern">Gilgamesh's Tavern</button>
  <button id="inn">Adventure's Inn</button>
  <button id="trade-post">Boltac's Trading Post</button>
  <button id="temple">Temple of Cant</button>
  <button id="town-edge"> Edge of Town</button>
  `;
  const view = document.getElementById('view') as HTMLElement;
  view.style.backgroundImage = `url(${castle as string})`;
  view.style.backgroundSize = '100% 100%';
  view.append(firstChoice);
}
function implementCastle() {
  const view = document.getElementById('view') as HTMLElement;
  document.getElementById('tavern')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('tav-choice', [
          { id: 'add-to-prty', name: 'add to party' },
          { id: 'rmv-frm-prty', name: 'remove from party' },
          { id: 'inspect', name: 'inspect character' },
        ])
      )
    );
  });
  document.getElementById('inn')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('tav-choice', [
          { id: 'add-to-prty', name: 'add to party' },
          { id: 'rmv-frm-prty', name: 'remove from party' },
          { id: 'inspect', name: 'inspect character' },
        ])
      )
    );
  });
  document.getElementById('trade-post')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('tav-choice', [
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
  document.getElementById('town-edge')?.addEventListener('click', () => {
    /* go to town's edge */
  });
}

function enterCastle() {
  renderCastle();
  implementCastle();
}

export default enterCastle;
