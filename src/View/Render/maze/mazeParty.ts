import { renderParty, createElement } from '../common';
import inspect from '../inspection';
import { party } from '../partyInitializer';

function mazeParty() {
  const partyCharacters = party.getParty();
  renderParty();
  document.querySelectorAll('.prty-chr').forEach((el, index) => {
    el.addEventListener('click', () => {
      const canvasContainer = document.querySelector('.canvas__container');
      inspect(partyCharacters[index]);
      const view = document.getElementById('view');
      const leave = document.getElementById('cancel');
      leave?.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        const children = view?.childNodes;
        if (children) {
          Array.from(children).forEach((element) => {
            element.remove();
          });
        }
        if (canvasContainer) {
          const locationBlock = createElement('div', 'location-name', 'block');
          locationBlock.textContent = 'Maze';
          view?.append(locationBlock);
          view?.append(canvasContainer);
          mazeParty();
        }
      });
    });
  });
}

export default mazeParty;
