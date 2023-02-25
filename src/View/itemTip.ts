import { Item } from '../types/types';
import { createElement } from './Render/common';

// export type Item = {
//   name: string;
//   type: ItemTypes;
//   cost: number;
//   effect: string;
//   class: ClassName[];
//   alignment: Alignment[];
//   cursed: boolean;
//   damageMin: number;
//   damageMax: number;
//   AC: number;
// };

export default function createItemTip(item: Item): HTMLElement {
  const toolTip = createElement('div', '', 'block pop-up tooltip');
  toolTip.innerHTML = `
  Type: ${item.type} <br>
  Cost: ${item.cost} <br>
  ${item.effect === '' ? '' : `Effect: ${item.effect}<br>`}
  ${item.cursed ? 'Cursed<br>' : ''}
  ${item.AC > 0 ? `AC: ${item.AC}<br>` : ''}
  ${item.damageMax > 0 ? `Damage: ${item.damageMin} - ${item.damageMax} <br>` : ''}
  ${item.class.length === 8 ? 'Class: all <br>' : `Class: ${item.class.join(', ')} <br>`}
  ${item.alignment.length === 3 ? 'Alignment: all <br>' : `Alignment: ${item.alignment.join(', ')} <br>`}
  `;
  return toolTip;
}
