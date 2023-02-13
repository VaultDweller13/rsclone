import Character from '../../model/characters/character';
import ChoiceButton from './choice';
import { party } from './partyInitializer';

function createElement(tag: string, id: string, elClass?: string): HTMLElement {
  const newEl = document.createElement(tag);
  if (elClass) {
    newEl.setAttribute('class', elClass);
  }
  if (id) {
    newEl.setAttribute('id', id);
  }
  return newEl;
}

function createChoice(
  choiceId: string,
  buttonsDesc: ChoiceButton[]
): HTMLElement {
  const choice = createElement('div', choiceId, 'block pop-up center');
  buttonsDesc.forEach((el) => {
    const newButton = createElement('button', el.id, 'button');
    newButton.innerHTML = el.name;
    if (el.func !== undefined) {
      newButton.addEventListener('click', el.func as EventListener);
    }
    choice.append(newButton);
  });
  return choice;
}

function createLayer(layerNum: number, layerContent: HTMLElement): HTMLElement {
  const newLayer = createElement('div', '', `layer layer${layerNum}`);
  switch (layerNum) {
    case 1:
      layerContent.classList.add('left');
      break;
    case 2:
    case 3:
      layerContent.classList.add('center');
      break;
    default:
      break;
  }
  newLayer.append(layerContent);
  newLayer.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('layer')) {
      newLayer.remove();
    }
  });
  return newLayer;
}

function getMain(): HTMLElement {
  return document.querySelector('.main') as HTMLElement;
}

function getParty(): HTMLElement {
  return document.querySelector('.prty') as HTMLElement;
}

function warning(warnText: string) {
  const view = document.getElementById('view') as HTMLElement;
  const warnBlock = createElement('div', '', 'block pop-up center');
  warnBlock.textContent = warnText;
  view.append(createLayer(3, warnBlock));
}

function getAC(character: Character): number {
  let ac = 0;
  character.equipment.forEach((item) => {
    if (item) {
      ac += item.AC;
    }
  });
  return ac;
}

function renderParty() {
  const prtyBlock = createElement('div', '', 'prty block');
  const partyArr = party.getParty();
  prtyBlock.innerHTML = `
        <div class="prty-header">
          <div class="prty-param" class="prty-names"><span class="param-wrap">Name</span></div>
          <div class="prty-param" class="prty-classes"><span class="param-wrap">Class</span></div>
          <div class="prty-param" class="prty-ac"><span class="param-wrap">AC?</span></div>
          <div class="prty-param" class="prty-hp"><span class="param-wrap">HP /</span></div>
          <div class="prty-param" class="prty-status"><span class="param-wrap">Status</span></div>
        </div>
        <div class="prty-body">
          ${partyArr
            .map(
              (character) =>
                `
          <div class="prty-chr" id="dummy-name">
            <div class="chr-name chr-param">${character.name}</div>
            <div class="chr-class chr-param">${character.alignment
              .slice(0, 1)
              .toUpperCase()}-${character.class.name
                  .slice(0, 3)
                  .toUpperCase()}-${character.race
                  .slice(0, 3)
                  .toUpperCase()}</div>
            <div class="chr-ac chr-param">${character.getAC()}</div>
            <div class="chr-hp chr-param">${character.getHp()}</div>
            <div class="chr-status chr-param">${character.status === 'OK' ? character.getMaxHP() : character.status}</div>
          </div>
            `
            )
            .join('\n')}
        </div>
  `;
  if (document.querySelector('.prty')) {
    document.querySelector('.prty')?.replaceWith(prtyBlock);
  } else {
    document.querySelector('.game')?.append(prtyBlock);
  }
}
function resetPage() {
  const gamePage = document.querySelector('.game') as HTMLElement;
  gamePage.replaceChildren();
  const view = createElement('div', 'view', 'block');
  view.innerHTML = `
        <div id="location-name" class="block">
        </div>
  `;
  gamePage.append(view);
  renderParty();
}

export {
  createChoice,
  createElement,
  createLayer,
  getMain,
  warning,
  getParty,
  resetPage,
  renderParty,
  getAC
};
