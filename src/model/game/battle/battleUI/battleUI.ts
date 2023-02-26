import './style.scss';
// import type Monster from '../../../characters/monster';
import { createElement } from '../../../../types/utils';
import BattleMenu from './battleMenu';
import { party } from '../../../../View/Render/partyInitializer';
import type Party from '../../party';
import ConfirmMenu from './confirmMenu';
import { MonsterGroup } from '../../../../types/types';

export default class BattleUI {
  game: HTMLElement;
  element: HTMLElement;
  #infoBlock: HTMLElement;
  #middleBlock: HTMLElement;
  #enemies: MonsterGroup[];
  menu: BattleMenu;
  confirm: ConfirmMenu;
  party: Party;

  constructor() {
    this.game = document.querySelector('.game') as HTMLElement;
    this.element = createElement('div', 'battleUI');
    this.#infoBlock = createElement('div', 'battleUI_info');
    this.#middleBlock = createElement('div', 'battleUI_middle');
    this.#enemies = [];
    this.menu = new BattleMenu();
    this.confirm = new ConfirmMenu();
    this.party = party;
  }

  init() {
    this.update();

    this.element.append(this.#infoBlock, this.#middleBlock, this.confirm.el);
    this.game.append(this.element);
  }

  showMessage(message: string) {
    this.#infoBlock.innerHTML = '';
    const p = createElement('p', 'battleUI_message', message);
    this.#infoBlock.append(p);
  }

  setEnemies(enemies: MonsterGroup[]) {
    this.#enemies = enemies;
  }

  setInfoBlock() {
    this.#infoBlock.innerHTML = '';

    this.#infoBlock.append(
      ...this.#enemies.map((group) => createElement('p', 'enemy-group', `${group.length} ${group[0].name}`))
    );
  }

  setMiddleBlock(img: HTMLImageElement) {
    this.#middleBlock.innerHTML = '';

    img.classList.add('battleUI_img');
    this.menu.setCharacter(this.party.getParty()[0], 0);
    this.#middleBlock.append(img, this.menu.el);
  }

  update() {
    this.setInfoBlock();
    this.setMiddleBlock(this.#enemies[0][0].img);
  }
}
