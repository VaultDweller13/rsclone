import { party, tavern } from '../partyInitializer';
import { createChoice, createElement } from '../common';
import { confirm } from './characterCreator';
import Character from '../../../model/characters/character';

let currentPage = 1;

let renderTaverners = (page: number) => {
  page.toFixed();
};
let renderPartyforTavern = () => {};

function checkIfPagePossible(page: number): boolean {
  return Math.ceil(tavern.getParty().length / 5) >= page && page > 0;
}

function addFromParty(character: Character, index: number) {
  if (tavern.canBeAdded(character)) {
    tavern.add(character);
    party.remove(index);
    renderPartyforTavern();
    renderTaverners(currentPage);
  }
}
function addFromTavern(character: Character, index: number) {
  if (party.canBeAdded(character)) {
    party.add(character);
    tavern.remove(index);
    renderPartyforTavern();
    if (!checkIfPagePossible(currentPage) && currentPage !== 1) {
      currentPage -= 1;
    }
    renderTaverners(currentPage);
  }
}

function changeParty() {
  const view = document.getElementById('view') as HTMLElement;
  const tavernBlock = createElement('div', '', 'tavern');
  view.style.backgroundImage = '';
  view.innerHTML = '';
  currentPage = 1;
  const tavernBody = createElement('div', '', 'prty-body');
  tavernBlock.innerHTML = `
        <div class="prty-header">
          <div class="prty-param prty-names"><span class="param-wrap">Name</span></div>
          <div class="prty-param prty-classes"><span class="param-wrap">Class</span></div>
          <div class="prty-param prty-ac"><span class="param-wrap">AC?</span></div>
          <div class="prty-param prty-hp"><span class="param-wrap">HP /</span></div>
          <div class="prty-param prty-status"><span class="param-wrap">Status</span></div>
        </div>
  `;
  tavernBlock.append(tavernBody);
  view.append(tavernBlock);
  view.innerHTML += `
  <style>
    #view #tavern-choice{
      height: 35px;
      flex-direction: row;
      top: auto;
      bottom: 5px;
      width: fit-content;
      padding: 3px;
    }
  </style>
  `;
  view.append(
    createChoice('tavern-choice', [
      {
        id: 'prev',
        name: 'prev',
        func: () => {
          currentPage -= 1;
          if (checkIfPagePossible(currentPage)) {
            renderTaverners(currentPage);
          } else {
            currentPage += 1;
          }
        },
      },
      {
        id: 'next',
        name: 'next',
        func: () => {
          currentPage += 1;
          if (checkIfPagePossible(currentPage)) {
            renderTaverners(currentPage);
          } else {
            currentPage -= 1;
          }
        },
      },
      {
        id: 'confirm',
        name: 'confirm',
        func: () => {
          confirm.func();
        },
      },
    ])
  );
  renderTaverners(currentPage);
  renderPartyforTavern();
}

renderTaverners = (page: number) => {
  const partyArr = tavern.getParty().slice((page - 1) * 5, page * 5);
  const tavernBody = document.querySelector('.tavern .prty-body');
  if (tavernBody) {
    tavernBody.innerHTML = '';
    partyArr.forEach((character, index) => {
      const charBlock = createElement('div', character.name, 'prty-chr');
      charBlock.innerHTML = `
      <div class="chr-name chr-param">${character.name}</div>
      <div class="chr-class chr-param">${character.alignment
        .slice(0, 1)
        .toUpperCase()}-${character.class.name
        .slice(0, 3)
        .toUpperCase()}-${character.race.slice(0, 3).toUpperCase()}</div>
       <div class="chr-ac chr-param">${character.getAC()}</div>
      <div class="chr-hp chr-param">${character.getHp()}</div>
      <div class="chr-status chr-param">${
        character.status === 'OK' ? character.getMaxHP() : character.status
      }</div>
      `;
      charBlock.addEventListener('click', () => {
        document.getElementById('view')?.append(
          createChoice('add-remove', [
            {
              id: 'add',
              name: 'add to party',
              func: () => {
                addFromTavern(character, index);
                document.querySelector(`#view #add-remove`)?.remove();
              },
            },
            {
              id: 'remove',
              name: 'remove from tavern',
              func: () => {
                tavern.remove(index);
                if (!checkIfPagePossible(currentPage)) {
                  currentPage -= 1;
                }
                renderTaverners(currentPage);
                document.querySelector(`#view #add-remove`)?.remove();
              },
            },
            {
              id: 'cancel',
              name: 'cancel',
              func: () => {
                document.querySelector(`#view #add-remove`)?.remove();
              },
            },
          ])
        );
      });
      tavernBody.append(charBlock);
    });
  }
};

renderPartyforTavern = () => {
  const prtyBody = document.querySelector('.prty .prty-body');
  const partyArr = party.getParty();
  if (prtyBody) {
    prtyBody.innerHTML = '';
    partyArr.forEach((character, index) => {
      const charBlock = createElement('div', character.name, 'prty-chr');
      charBlock.innerHTML = `
      <div class="chr-name chr-param">${character.name}</div>
      <div class="chr-class chr-param">${character.alignment
        .slice(0, 1)
        .toUpperCase()}-${character.class.name
        .slice(0, 3)
        .toUpperCase()}-${character.race.slice(0, 3).toUpperCase()}</div>
       <div class="chr-ac chr-param">${character.getAC()}</div>
      <div class="chr-hp chr-param">${character.getHp()}</div>
      <div class="chr-status chr-param">${
        character.status === 'OK' ? character.getMaxHP() : character.status
      }</div>
      `;
      charBlock.addEventListener('click', () => {
        addFromParty(character, index);
      });
      prtyBody.append(charBlock);
    });
  }
};

export default changeParty;
