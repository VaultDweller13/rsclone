import Character from '../../model/characters/character';
import { createElement, getParty } from './common';
import { confirm } from './castle/characterCreator';

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
  const changeItemsBlock = createElement('div', 'change-items')
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
  console.log(character.name);
}

export default inspect;
