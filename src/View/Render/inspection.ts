import Character from '../../model/characters/character';
import { createElement, getParty } from './common';
import { confirm } from './castle/characterCreator';


function renderInventory(page: number, character: Character, inventoryBlock: HTMLElement){
  const inventory = character.getInventory();
  if (Math.ceil(inventory.length / 5) >= page && page > 0){
    inventory.slice((page-1) * 5, page * 5).forEach((item) => {
      const itemBlock = createElement('div', item.name, 'item');
      itemBlock.classList.add('button');
      itemBlock.textContent = item.name;
      inventoryBlock?.append(itemBlock);
    });
  }
}

function charInfo(character: Character): HTMLElement[] {
  const basicInfo = createElement('div', '', 'flex-around');
  basicInfo.style.display = 'flex';
  basicInfo.style.justifyContent = 'space-between';
  basicInfo.innerHTML = `
  <div class='basic-content'>${character.name}</div>
  <div class='basic-content'>Level ${character.level}</div>
  <div class='basic-content'>${String(
    character.alignment
  ).toUpperCase()}-${String(character.class.name).toUpperCase()}</div>
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
      itemBlock.textContent = item.name;
    } else {
      itemBlock.textContent = `--${itemType}--`;
    }
    equipment.append(itemBlock);
  });
  equipmentWrap.append(equipmentName);
  equipmentWrap.append(equipment);
  changeItemsBlock.append(equipmentWrap);
  const inventoryWrap = createElement('div', 'equipment', 'items-wrap');
  const inventoryName = createElement('div', 'inventory-name');
  inventoryName.textContent = 'Inventory';
  inventoryWrap.append(inventoryName);
  const inventory = createElement('div', 'inventory', 'items-block block');
  inventoryWrap.append(inventory);
  changeItemsBlock.append(inventoryWrap);
  renderInventory(1, character, inventory);
  console.log(character.getInventory(), character.equipment);
  return [basicInfo, secondaryInfo, statsInfo, changeItemsBlock];
}


function inspect(character: Character) {
  getParty().remove();
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

export default inspect;
