import { renderParty } from '../common';
import inspect from '../inspection';
import { party } from '../partyInitializer';

function mazeParty() {
  const partyCharacters = party.getParty();
  renderParty();
  document.querySelectorAll('.prty-chr').forEach((el, index) => {
    el.addEventListener('click', () => {
      const canvasContainer = document.querySelector('.canvas__container');
      console.log(canvasContainer);
      inspect(partyCharacters[index]);
      const view = document.getElementById('view');
      const leave = document.getElementById('cancel');
      leave?.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        console.log('a');
        view?.childNodes.forEach((element) => {
          element.remove();
        });
        console.log(canvasContainer)
        if (canvasContainer) {
          view?.append(canvasContainer);
          mazeParty();
        }
      });
    });
  });
}

export default mazeParty;
