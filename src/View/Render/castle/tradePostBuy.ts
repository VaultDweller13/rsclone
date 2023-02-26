import Character from '../../../model/characters/character';
import shop from '../../../model/data/shop';
import createItemTip from '../../itemTip';
import { createChoice, createElement, warning } from '../common';
import { party } from '../partyInitializer';
import { confirm } from './characterCreator';

let currentPage = 1;

const checkIfPagePossible = (page: number) => page > 0 && page < 4;

let createItemsPage = (page: number, character: Character): HTMLElement[] => {
  character.name.toString();
  page.toString();
  return [new HTMLElement()];
};

function createShop(character: Character): HTMLElement| null {
  const shopBlock = createElement('div', 'shop', 'block pop-up center');
  const goldBlock = createElement('div', 'gold');
  const currentGold = party.getGold();
  if (currentGold) {
    goldBlock.textContent = `Gold: ${currentGold}`;
  }
  shopBlock.append(goldBlock);
  const itemsBlock = createElement('div', 'items', 'block');
  createItemsPage(currentPage, character).forEach((el) => {
    itemsBlock.append(el);
  })
  shopBlock.append(itemsBlock);
  const buyChoice = createChoice('buy-choice', [
    {
      id: 'prev',
      name: 'prev',
      func: () => {
        currentPage -= 1;
        if (checkIfPagePossible(currentPage)) {
          createShop(character);
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
          createShop(character);
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
  ]);
  buyChoice.classList.remove('pop-up');
  shopBlock.append(buyChoice);
  if (document.getElementById('shop')){
    document.getElementById('shop')?.replaceWith(shopBlock);
  } else {
    return shopBlock;
  }
  return null;
}

createItemsPage = (page: number, character: Character): HTMLElement[] =>
  shop.slice((page - 1) * 10, page * 10).map((item) => {
    const itemBlock = createElement('div', '', 'button item');
    itemBlock.append(createItemTip(item));
    itemBlock.append(document.createTextNode(`${item.name} [${item.cost}]`));
    itemBlock.addEventListener('click', () => {
      const gold = party.getGold();
      if (gold) {
        if (gold >= item.cost && character.getInventory().length < 8) {
          character.addToInventory(item);
          party.changeGold(-item.cost);
          warning('item was purchased');
          createShop(character);
        } else if (character.getInventory().length >= 8){
          warning('inventory is full');
        } else if (gold < item.cost) {
          warning('not enough gold');
        }
      }
    });
    return itemBlock;
  });

export default createShop;

// createChoice('tavern-choice', [
//   {
//     id: 'prev',
//     name: 'prev',
//     func: () => {
//       currentPage -= 1;
//       if (checkIfPagePossible(currentPage)) {
//         renderTaverners(currentPage);
//       } else {
//         currentPage += 1;
//       }
//     },
//   },
//   {
//     id: 'next',
//     name: 'next',
//     func: () => {
//       currentPage += 1;
//       if (checkIfPagePossible(currentPage)) {
//         renderTaverners(currentPage);
//       } else {
//         currentPage -= 1;
//       }
//     },
//   },
//   {
//     id: 'confirm',
//     name: 'confirm',
//     func: () => {
//       confirm.func();
//     },
//   },
// ])
