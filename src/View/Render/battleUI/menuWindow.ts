import { createElement } from '../../../types/utils';

export default class MenuWindow {
  el: HTMLElement;

  constructor(tag: string, classList: string) {
    this.el = createElement(tag, classList);
  }

  show() {
    this.el.classList.remove('invisible');
  }

  hide() {
    this.el.classList.add('invisible');
  }
}
