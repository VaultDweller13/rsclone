import MenuWindow from './menuWindow';
import { createElement } from '../../../../types/utils';

export default class ConfirmMenu extends MenuWindow {
  fight: HTMLElement;
  back: HTMLElement;

  constructor() {
    super('div', 'battleUI_confirm invisible');
    this.fight = createElement('div', 'confirm_fight', 'Fight');
    this.back = createElement('div', 'confirm_back', 'Take Back');

    const title = createElement('div', 'confirm_title', 'Is this OK?');
    this.el.append(title, this.fight, this.back);
  }
}
