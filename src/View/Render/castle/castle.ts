import {
  createChoice,
  createLayer,
  createElement,
  resetPage,
  warning,
  selectCharacter,
  createMessage,
  renderParty,
} from '../common';
import castle from '../../Assets/castle.jpg';
import { createCharacter } from './characterCreator';
import changeParty from './changeParty';
import initFirstLevel from '../../../game/run';
import { party } from '../partyInitializer';
import Character from '../../../model/characters/character';
import inspect from '../inspection';

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
          {
            id: 'inspect',
            name: 'inspect character',
            func: () => {
              document.getElementById('tav-choice')?.replaceWith(
                selectCharacter((char: Character) => {
                  inspect(char);
                })
              );
            },
          },
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
      createLayer(
        1,
        createChoice('inn-choice', [
          {
            id: 'rest',
            name: 'rest',
            func: () => {
              document.getElementById('inn-choice')?.replaceWith(
                selectCharacter((character) => {
                  const goldValue = party.getGold();
                  const restChoice = createChoice('rest-choice', [
                    {
                      id: 'stable',
                      name: 'Stable [free]',
                      func: () => {
                        console.log(character.exp, character.nextExp);
                        character.rest();
                        restChoice.replaceWith(createMessage(character.message));
                        renderParty();
                      },
                    },
                    {
                      id: '',
                      name: 'Royal suite [500 Gold]',
                      func: () => {
                        party.changeGold(-500);
                        if (goldValue && goldValue >= 500) {
                          character.rest();
                          restChoice.replaceWith(createMessage(character.message));
                          renderParty();
                        }
                      },
                    },
                    {
                      id: 'cancel',
                      name: 'Leave',
                      func: () => {
                        enterCastle();
                      },
                    },
                  ]);
                  const goldBlock = createElement('div', 'gold');
                  if (goldValue) {
                    goldBlock.textContent = `Gold: ${goldValue}`;
                  }
                  restChoice.firstChild?.before(goldBlock);
                  document.getElementById('select')?.replaceWith(restChoice);
                })
              );
            },
          },
        ])
      )
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
    view.append(createLayer(1, createChoice('temple-choice', [{ id: 'heal', name: 'Heal / Revive' }])));
  });
  document.getElementById('enter-maze')?.addEventListener('click', () => {
    if (party.getParty().length > 0) {
      const locationName = document.getElementById('location-name');
      if (locationName) {
        locationName.textContent = 'Maze';
      }
      document.getElementById('cstl-choice')?.remove();
      if (!document.getElementById('view')?.classList.contains('maze')) {
        document.getElementById('view')?.classList.add('maze');
      }
      initFirstLevel();
    } else {
      warning('You cannot enter maze without a party');
    }
  });
};

export default enterCastle;
