import type Character from '../../../characters/character';
import { createElement } from '../../../../types/utils';
import MenuWindow from './menuWindow';

export default class BattleMenu extends MenuWindow {
  options: {
    name: HTMLElement;
    fight: HTMLElement;
    parry: HTMLElement;
    item: HTMLElement;
    cast: HTMLElement;
    dispell: HTMLElement;
    run: HTMLElement;
    back: HTMLElement;
  };

  constructor() {
    super('div', 'battleUI_menu');
    this.options = this.#init();
  }

  #init() {
    const name = createElement('div', 'menu_name');
    const fight = createElement('div', 'menu_fight', 'Fight');
    const parry = createElement('div', 'menu_parry', 'Parry');
    const item = createElement('div', 'menu_item', 'Item');
    const cast = createElement('div', 'menu_cast', 'Cast');
    const dispell = createElement('div', 'menu_dispell', 'dispell');
    const run = createElement('div', 'menu_run', 'Run');
    const back = createElement('div', 'menu_back', 'Back');

    [fight, parry, item, cast, dispell, run, back].forEach((el) => {
      const element = el;
      element.dataset.type = 'clickable';
    });

    return { name, fight, parry, item, cast, dispell, run, back };
  }

  setCharacter(character: Character, index: number) {
    this.el.innerHTML = '';
    const options = [];

    // const canCast = ['mage', 'priest', 'bishop', 'lord', 'samurai', 'ninja'].includes(character.class.name);
    // const canDispell = ['priest', 'lord'].includes(character.class.name);

    this.options.name.textContent = character.name;
    options.push(this.options.name);

    // if (index < 3) options.push(this.options.fight);

    options.push(this.options.fight, this.options.parry /* this.options.item */);

    // if (canCast) options.push(this.options.cast);
    // if (canDispell) options.push(this.options.dispell);

    options.push(this.options.run);

    if (index !== 0) options.push(this.options.back);

    this.el.append(...options);
    this.show();
  }
}
