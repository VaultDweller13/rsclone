import Character from '../../model/characters/character';
import { createElement, getParty, warning } from './common';
import { confirm } from './castle/characterCreator';
import createItemTip from '../itemTip';

let currentPage = 1;

let charInfo = (character: Character): HTMLElement[] => [createElement('div', character.name)];

function renderInventory(page: number, character: Character, inventoryBlock: HTMLElement) {
  const inventory = character.getInventory();
  if (Math.ceil(inventory.length / 4) >= page && page > 0) {
    inventory.slice((page - 1) * 4, page * 4).forEach((item) => {
      const itemBlock = createElement('div', item.name, 'item');
      itemBlock.classList.add('button');
      itemBlock.append(createItemTip(item))
      console.log(itemBlock.innerHTML);
      itemBlock.append(document.createTextNode(item.name)) ;
      console.log(itemBlock.innerHTML);
      inventoryBlock?.append(itemBlock);
    });
  }
}

function inspect(character: Character) {
  if (getParty()) {
    getParty().remove();
  }
  const view = document.getElementById('view') as HTMLElement;
  view.classList.add('flex');
  const charTable = createElement('div', 'char-table', 'block');
  const cancelButton = createElement('button', 'cancel', 'block button');
  view.style.backgroundImage = '';
  view.innerHTML = '';
  cancelButton.textContent = 'leave';
  cancelButton.addEventListener('click', () => {
    confirm.func();
  });
  view.appendChild(charTable);
  charInfo(character).forEach((block) => {
    charTable.append(block);
  });
  view.appendChild(cancelButton);
}

charInfo = (character: Character): HTMLElement[] => {
  const basicInfo = createElement('div', '', 'flex-around');
  basicInfo.style.display = 'flex';
  basicInfo.style.justifyContent = 'space-between';
  basicInfo.innerHTML = `
  <div class='basic-content'>${character.name}</div>
  <div class='basic-content'>Level ${character.level}</div>
  <div class='basic-content'>${String(character.alignment).toUpperCase()}-${String(
    character.class.name
  ).toUpperCase()}</div>
  <div class='basic-content'>${String(character.race).toUpperCase()}</div>
  `;
  const secondaryInfo = createElement('div', '', 'flex-around');
  secondaryInfo.innerHTML = `
  <div class='basic-content'>Experience: ${character.exp}</div>
  <div class='basic-content'>Age: ${character.age}</div>
  <div class='basic-content'>Armor Class: ${String(character.getAC())}</div>
  `;
  const statsInfo = createElement('div', 'stats-info', 'flex-around');
  statsInfo.innerHTML = `
  <div class="stats-block">
    <div class='stats-line flex-default'>
      <span class='stat-name'>Strength:</span>
      <span class='stat-value'>${character.strength}</span>
    </div>
    <div class='stats-line flex-default'>
      <span class='stat-name'>Intelligence:</span>
      <span class='stat-value'>${character.intelligence}</span>
    </div>
    <div class='stats-line flex-default'>
      <span class='stat-name'>Piety:</span>
      <span class='stat-value'>${character.piety}</span>
    </div>
    <div class='stats-line flex-default'>
      <span class='stat-name'>Vitality:</span>
      <span class='stat-value'>${character.vitality}</span>
    </div>
    <div class='stats-line flex-default'>
      <span class='stat-name'>Agility:</span>
      <span class='stat-value'>${character.agility}</span>
    </div>
    <div class='stats-line flex-default'>
      <span class='stat-name'>Luck:</span>
      <span class='stat-value'>${character.luck}</span>
    </div>
  </div>
  <div class="stats-block">
    <div class='stats-line flex-default'>
      <span class='stat-name'>HP:</span>
      <span class='stat-value'>${character.getHp()}/${character.getMaxHP()}</span> 
    </div>
    <div class='stats-line flex-default'>
      <span class='stat-name'>Status:</span>
      <span class='stat-value'>${character.status}</span>
    </div>
  </div>
  `;
  const changeItemsBlock = createElement('div', 'change-items', 'flex-default');
  const equipmentWrap = createElement('div', 'equipment-wrap', 'items-wrap');
  const equipmentName = createElement('div', 'equipment-name');
  equipmentName.textContent = 'Equipment';
  const equipment = createElement('div', 'equipment', 'items-block block');
  Array.from(character.equipment.keys()).forEach((itemType) => {
    const item = character.equipment.get(itemType);
    const itemBlock = createElement('div', itemType, 'item');
    if (item) {
      itemBlock.classList.add('button');
      itemBlock.append(createItemTip(item));
      itemBlock.append(document.createTextNode(item.name));
      itemBlock.addEventListener('click', () => {
        if (character.getInventory().length === 8) {
          warning('inventory is full');
        } else {
          character.addToInventory(item);
          character.unequip(item.type);
          inspect(character);
        }
      });
    } else {
      itemBlock.textContent = `--${itemType}--`;
    }
    equipment.append(itemBlock);
  });
  equipmentWrap.append(equipmentName);
  equipmentWrap.append(equipment);
  changeItemsBlock.append(equipmentWrap);
  const inventoryWrap = createElement('div', 'inventory-wrap', 'items-wrap');
  const inventoryName = createElement('div', 'inventory-name');
  inventoryName.textContent = 'Inventory';
  inventoryWrap.append(inventoryName);
  const inventory = createElement('div', 'inventory', 'items-block block');
  inventoryWrap.append(inventory);
  changeItemsBlock.append(inventoryWrap);
  renderInventory(currentPage, character, inventory);
  const inventoryItems = inventory.children;
  console.log(inventory.children);
  console.log(inventoryItems);
  if (inventoryItems) {
    Array.from(inventoryItems).forEach((itemBlock, index) => {
      itemBlock.setAttribute('name', `${index}, ${character.getInventory()[index + (currentPage - 1) * 4].name}`);
      itemBlock.addEventListener('click', () => {
        const item = character.getInventory()[index + (currentPage - 1) * 4];
        console.log(item.name);
        if (!item.alignment.includes(character.alignment) || !item.class.includes(character.class.name)) {
          warning("can't equip this item");
        } else {
          const preequippedItem = character.equipment.get(item.type);
          character.equip(item);
          character.removeFromInventory(index + (currentPage - 1) * 4);
          if (preequippedItem) {
            character.addToInventory(preequippedItem);
          }
          inspect(character);
        }
      });
    });
    if (character.getInventory().length > 4) {
      const buttonsWrap = createElement('div', '', 'button-wrap');
      const nextButton = createElement('button', 'next', 'button block');
      nextButton.addEventListener('click', () => {
        currentPage = 2;
        inspect(character);
      });
      nextButton.textContent = '→';
      const prevButton = createElement('button', 'next', 'button block');
      prevButton.addEventListener('click', () => {
        currentPage = 1;
        inspect(character);
      });
      prevButton.textContent = '←';
      inventory.append(buttonsWrap);
      buttonsWrap.append(prevButton);
      buttonsWrap.append(nextButton);
    }
  }
  return [basicInfo, secondaryInfo, statsInfo, changeItemsBlock];
};

export default inspect;
