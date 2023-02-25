import './style.scss';
import type Monster from '../../../model/characters/monster';
import { createElement } from '../../../types/utils';
import BattleMenu from './battleMenu';
// import type Character from '../../../model/characters/character';
import { party } from '../partyInitializer';
import type Party from '../../../model/game/party';
import ConfirmMenu from './confirmMenu';

export default class BattleUI {
  element: HTMLElement;
  enemies: { enemy: Monster; amount: number; isDead: boolean }[];
  menu: BattleMenu;
  confirm: ConfirmMenu;
  party: Party;
  charIndex: number;
  #stack: (() => void)[];
  inBattle: boolean;
  callback: () => void;

  constructor(enemies: { enemy: Monster; amount: number; isDead: boolean }[], callback: () => void) {
    this.element = createElement('div', 'battleUI');
    this.enemies = enemies;
    this.menu = new BattleMenu();
    this.confirm = new ConfirmMenu();
    this.party = party;
    this.charIndex = 0;
    this.#setListeners();
    this.#stack = [];
    this.inBattle = true;
    this.callback = callback;

    this.#init();
  }

  #init() {
    const enemyWindow = createElement('div', 'battleUI_enemy');
    this.menu.setCharacter(this.party.getParty()[this.charIndex], this.charIndex);

    enemyWindow.append(
      ...this.enemies.map((group) => {
        const p = createElement('p', 'enemy-group', `${group.amount} ${group.enemy.name}`);

        return p;
      })
    );

    const { img } = this.enemies[0].enemy;
    img.classList.add('battleUI_img');

    const container = createElement('div', 'battleUI_middle');
    container.append(img, this.menu.el);

    this.element.append(enemyWindow, container, this.confirm.el);
  }

  #setListeners() {
    this.menu.el.addEventListener('click', (e: Event) => {
      const { target } = e;
      if (!(target instanceof HTMLElement)) return;
      if (target.dataset.type !== 'clickable') return;

      this.#handleOptions(target);

      if (target.classList.contains('menu_run')) {
        if (this.#getCurrentChar().run()) this.#endBattle();
        return;
      }

      if (target.classList.contains('menu_back')) {
        this.charIndex -= 1;
        this.menu.setCharacter(this.#getCurrentChar(), this.charIndex);
        return;
      }

      this.charIndex += 1;
      if (this.charIndex < this.party.getParty().length) {
        this.menu.setCharacter(this.#getCurrentChar(), this.charIndex);
      } else {
        this.menu.hide();
        this.confirm.show();
      }
    });

    this.confirm.el.addEventListener('click', (e: Event) => {
      const { target } = e;
      if (!(target instanceof HTMLElement)) return;

      if (target.dataset.type !== 'clickable') return;

      if (target.classList.contains('confirm_back')) {
        this.charIndex -= 1;
        this.confirm.hide();
        this.menu.setCharacter(this.#getCurrentChar(), this.charIndex);
        this.menu.show();
      }

      if (target.classList.contains('confirm_fight')) {
        this.confirm.hide();
        this.#startBattle();
      }
    });
  }

  #getCurrentChar() {
    return this.party.getParty()[this.charIndex];
  }

  #handleOptions(option: HTMLElement) {
    const character = this.#getCurrentChar();

    if (option.classList.contains('menu_fight')) {
      this.#stack.push(() => character.attack(this.enemies[0].enemy));
    }

    if (option.classList.contains('menu_parry')) {
      this.#stack.push(() => character.parry());
    }

    if (option.classList.contains('menu_item')) {
      this.#stack.push(() => character.useItem());
    }

    if (option.classList.contains('menu_cast')) {
      this.#stack.push(() => character.cast());
    }

    if (option.classList.contains('menu_dispell')) {
      this.#stack.push(() => character.dispell());
    }
  }

  #startBattle() {
    this.#stack.forEach((f) => f());
  }

  #endBattle() {
    this.callback();
    this.element.remove();
  }
}
