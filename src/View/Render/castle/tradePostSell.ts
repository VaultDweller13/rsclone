import Character from '../../../model/characters/character';
import { createChoice, createElement } from '../common';
import { party } from '../partyInitializer';
import { confirm } from './characterCreator';

export default function createSellBlock(character: Character): null | HTMLElement {
  const inventoryArr = character.getInventory().map((item, index) => ({
    id: item.name,
    name: `${item.name} [${item.cost} Gold]`,
    func: () => {
      party.changeGold(+item.cost);
      character.removeFromInventory(index);
      createSellBlock(character);
    },
  }));
  const sellBlock = createChoice('sell-choice', [
    ...inventoryArr,
    {
      id: 'cancel',
      name: 'Leave',
      func: () => {
        confirm.func();
      },
    },
  ]);
  sellBlock.classList.add('pop-up');
  const currentGold = createElement('div', 'cur-gold');
  const goldValue = party.getGold();
  if (goldValue) {
    currentGold.textContent = `Gold: ${goldValue}`;
  }
  sellBlock.firstChild?.before(currentGold);
  if (document.getElementById('sell-choice')){
    document.getElementById('sell-choice')?.replaceWith(sellBlock)
    return null;
  }
  return sellBlock;
}
