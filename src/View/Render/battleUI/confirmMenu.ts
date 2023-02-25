import MenuWindow from './menuWindow';
import { createElement } from '../../../types/utils';

export default class ConfirmMenu extends MenuWindow {
  constructor() {
    super('div', 'battleUI_confirm invisible');
    this.#init();
  }

  #init() {
    const title = createElement('div', 'confirm_title', 'Is this OK?');
    const fight = createElement('div', 'confirm_fight', 'Fight');
    fight.dataset.type = 'clickable';
    const back = createElement('div', 'confirm_back', 'Take Back');
    back.dataset.type = 'clickable';

    this.el.append(title, fight, back);
  }
}
