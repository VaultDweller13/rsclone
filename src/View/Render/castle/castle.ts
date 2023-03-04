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
import initGame from '../../../game/run';
import { party, partyReload, saveGame } from '../partyInitializer';
import Character from '../../../model/characters/character';
import inspect from '../inspection';
import createSellBlock from './tradePostSell';
import createShop from './tradePostBuy';
import mazeParty from '../maze/mazeParty';
import { playCastle, playMaze, stopBattle, stopCastle, stopMaze } from '../music';

function createInstructionsBlock() {
  const instructions = document.createElement('div');
  instructions.classList.add('instructions');
  instructions.innerHTML = `Привет, искатель приключений! 
  Wizardry - пошаговая партийная ролевая игра, в которой твоему отряду необходимо исследовать лабиринт, населенный разнообразными монстрами.
  Чтобы начать играть, создай отряд приключенцев, выбрав в меню слева <span class = 'em'>Gilgamesh's tavern</span>. 
  Нажми <span class = 'em'>Manage party</span>, чтобы добавить прегенерированных или созданных тобой персонажей в отряд. 
  Нажми <span class = 'em'>Create character</span>, чтобы создать персонажа самостоятельно.
  Чтобы отправиться навстречу приключениям, выбери <span class = 'em'>Enter maze</span> - твой отряд спустится в пугающую неизвестность лабиринта.
  Во время исследования подземелья, на твой отряд будут нападать враги - битвы с ними проходят в пошаговом режиме. После победы, твой отряд получит опыт и золото. 
  При наборе определенного количества опыта, рядом с именем персонажа появится значок повышения уровня - стрелочка вверх.
  Нужно вернуться в город и зайти в <span class = 'em'>Adventurer's Inn</span>: твой персонаж отдохнет и получит уровень, став сильнее.
  Полученное в битвах золото можно потратить на экипировку, зайдя в <span class = 'em'>Boltac's Trading Post</span>
  Жрецы в <span class = 'em'>Temple of Cant</span> могут воскресить павшего в бою персонажа.
  <p class = 'center'>Удачи!</p>`;

  return instructions;
}

function renderCastle() {
  resetPage();
  const locationName = document.getElementById('location-name') as HTMLElement;
  locationName.innerHTML = 'Castle';
  const firstChoice = createElement('div', 'cstl-choice', 'block pop-up left');
  firstChoice.innerHTML = `
  <button class="button" id="tavern">Gilgamesh's Tavern</button>
  <button class="button" id="inn">Adventurer's Inn</button>
  <button class="button" id="trade-post">Boltac's Trading Post</button>
  <button class="button" id="temple">Temple of Cant</button>
  <button class="button" id="saves">Save game/ Start new</button>
  <button class="button" id="enter-maze">Enter maze</button>
  `;

  const view = document.getElementById('view') as HTMLElement;
  view.style.backgroundImage = `url(${castle as string})`;
  view.style.backgroundSize = '100% 100%';
  view.append(firstChoice, createInstructionsBlock());
}

let implementCastle = () => {};

function enterCastle() {
  stopBattle();
  stopMaze();
  playCastle();
  renderCastle();
  implementCastle();
}

implementCastle = () => {
  const view = document.getElementById('view') as HTMLElement;
  view.classList.remove('maze');
  const tavernTip = createElement('div', '', 'block pop-up tooltip');
  // PUT YOUR TEXT HERE
  tavernTip.innerHTML = `
  Create adventurers and form party
  `;
  document.getElementById('tavern')?.append(tavernTip);
  document.getElementById('tavern')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('tav-choice', [
          {
            id: 'add-to-prty',
            name: 'Manage party',
            func: () => changeParty(),
          },
          {
            id: 'inspect',
            name: 'Inspect character',
            func: () => {
              document.getElementById('tav-choice')?.replaceWith(
                selectCharacter((char: Character) => {
                  inspect(char);
                })
              );
            },
          },
          {
            id: 'create-character',
            name: 'Create character',
            func: () => createCharacter(),
          },
        ])
      )
    );
  });
  const innTip = createElement('div', '', 'block pop-up tooltip');
  // PUT YOUR TEXT HERE
  innTip.innerHTML = `
  Level up adventurers
  `;
  document.getElementById('inn')?.append(innTip);
  document.getElementById('inn')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('inn-choice', [
          {
            id: 'rest',
            name: 'Rest',
            func: () => {
              document.getElementById('inn-choice')?.replaceWith(
                selectCharacter((character) => {
                  const goldValue = party.getGold();
                  const restChoice = createChoice('rest-choice', [
                    {
                      id: 'stable',
                      name: 'Stable [free]',
                      func: () => {
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
                          character.rest(true);
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
  const tradeTip = createElement('div', '', 'block pop-up tooltip');
  // PUT YOUR TEXT HERE
  tradeTip.innerHTML = `
  Buy or sell equipment
  `;
  document.getElementById('trade-post')?.append(tradeTip);
  document.getElementById('trade-post')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('trade-choice', [
          {
            id: 'buy',
            name: 'Buy',
            func: () => {
              document.getElementById('trade-choice')?.replaceWith(
                selectCharacter((character) => {
                  const buyBlock = createShop(character);
                  if (buyBlock) {
                    document.getElementById('select')?.replaceWith(buyBlock);
                  }
                })
              );
            },
          },
          {
            id: 'sell',
            name: 'Sell',
            func: () => {
              document.getElementById('trade-choice')?.replaceWith(
                selectCharacter((character) => {
                  const sellBlock = createSellBlock(character);
                  if (sellBlock) {
                    document.getElementById('select')?.replaceWith(sellBlock);
                  }
                })
              );
            },
          },
        ])
      )
    );
  });
  const templeTip = createElement('div', '', 'block pop-up tooltip');
  // PUT YOUR TEXT HERE
  templeTip.innerHTML = `
  Heal and revive adventurers
  `;
  document.getElementById('temple')?.append(templeTip);
  document.getElementById('temple')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('temple-choice', [
          {
            id: 'heal',
            name: 'Heal / Revive',
            func: () => {
              document.getElementById('temple-choice')?.replaceWith(
                selectCharacter((character) => {
                  const goldValue = party.getGold();
                  const healChoice = createChoice('heal-choice', [
                    {
                      id: 'purge',
                      name: 'Bring back to normal [500 Gold]',
                      func: () => {
                        if (goldValue && goldValue >= 500 && character.status !== 'OK') {
                          party.changeGold(-500);
                          // need function character.setStatus()
                          // eslint-disable-next-line no-param-reassign
                          character.status = 'OK';
                          if (character.getHp() === 0) {
                            character.setHp(1);
                          }
                          healChoice.replaceWith(createMessage(`${character.name} is now ok`));
                          renderParty();
                        } else if (character.status === 'OK') {
                          warning('character is already fine');
                        } else {
                          warning('not enough gold');
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
                  healChoice.firstChild?.before(goldBlock);
                  document.getElementById('select')?.replaceWith(healChoice);
                })
              );
            },
          },
        ])
      )
    );
  });
  document.getElementById('saves')?.addEventListener('click', () => {
    view.append(
      createLayer(
        1,
        createChoice('save-choice', [
          {
            id: 'save',
            name: 'Save game',
            func: () => {
              saveGame();
              enterCastle();
            },
          },
          {
            id: 'restart',
            name: 'Start new game',
            func: () => {
              partyReload();
              enterCastle();
            },
          },
        ])
      )
    );
  });
  const mazeTip = createElement('div', '', 'block pop-up tooltip');
  // PUT YOUR TEXT HERE
  mazeTip.innerHTML = `
  Enter maze
  `;
  document.getElementById('enter-maze')?.append(mazeTip);
  document.getElementById('enter-maze')?.addEventListener('click', () => {
    if (party.getParty().length > 0) {
      const locationName = document.getElementById('location-name');
      if (locationName) {
        locationName.textContent = 'Maze';
      }
      document.getElementById('cstl-choice')?.remove();
      document.querySelector('.instructions')?.remove();
      if (!document.getElementById('view')?.classList.contains('maze')) {
        document.getElementById('view')?.classList.add('maze');
      }
      stopCastle();
      playMaze();
      mazeParty();
      initGame();
    } else {
      warning('You cannot enter maze without a party');
    }
  });
};

export default enterCastle;
