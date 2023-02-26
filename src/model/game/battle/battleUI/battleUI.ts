import './style.scss';
import type Monster from '../../../characters/monster';
import { createElement } from '../../../../types/utils';
import BattleMenu from './battleMenu';
import { party } from '../../../../View/Render/partyInitializer';
import type Party from '../../party';
import ConfirmMenu from './confirmMenu';
import { MonsterGroup } from '../../../../types/types';

export default class BattleUI {
  element: HTMLElement;
  #infoBlock: HTMLElement;
  #enemies: { enemy: Monster; amount: number; isDead: boolean }[];
  menu: BattleMenu;
  confirm: ConfirmMenu;
  party: Party;
  charIndex: number;
  #stack: (() => void)[];
  inBattle: boolean;

  constructor() {
    this.element = createElement('div', 'battleUI');
    this.#infoBlock = createElement('div', 'battleUI_info');
    this.#enemies = [];
    this.menu = new BattleMenu();
    this.confirm = new ConfirmMenu();
    this.party = party;
    this.charIndex = 0;
    this.#stack = [];
    this.inBattle = true;
  }

  init() {
    this.menu.setCharacter(this.party.getParty()[this.charIndex], this.charIndex);

    this.#infoBlock.append(
      ...this.#enemies.map((group) => createElement('p', 'enemy-group', `${group.amount} ${group.enemy.name}`))
    );

    const { img } = this.#enemies[0].enemy;
    img.classList.add('battleUI_img');

    const container = createElement('div', 'battleUI_middle');
    container.append(img, this.menu.el);

    this.element.append(this.#infoBlock, container, this.confirm.el);
  }

  showMessage(message: string) {
    this.#infoBlock.innerHTML = '';
    const p = createElement('p', 'battleUI_message', message);
    this.#infoBlock.append(p);
  }

  setEnemies(enemies: MonsterGroup[]) {
    this.#enemies = enemies;
  }
}
