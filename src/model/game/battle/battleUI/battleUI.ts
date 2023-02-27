import './style.scss';
import MenuWindow from './menuWindow';
import { createElement } from '../../../../types/utils';
import BattleMenu from './battleMenu';
import { party } from '../../../../View/Render/partyInitializer';
import type Party from '../../party';
import ConfirmMenu from './confirmMenu';
import { MonsterGroup } from '../../../../types/types';

export default class BattleUI extends MenuWindow {
  game: HTMLElement;
  #infoBlock: HTMLElement;
  #middleBlock: HTMLElement;
  #enemies: MonsterGroup[];
  menu: BattleMenu;
  confirm: ConfirmMenu;
  party: Party;

  constructor() {
    super('div', 'battleUI invisible');
    this.game = document.querySelector('.game') as HTMLElement;
    this.#infoBlock = createElement('div', 'battleUI_info');
    this.#middleBlock = createElement('div', 'battleUI_middle');
    this.#enemies = [];
    this.menu = new BattleMenu();
    this.confirm = new ConfirmMenu();
    this.party = party;

    this.#init();
  }

  #init() {
    this.el.append(this.#infoBlock, this.#middleBlock, this.confirm.el);
    this.game.append(this.el);
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
    const character = this.party.getParty().find((char) => char.status === 'OK');
    if (!character) return;
    const index = this.party.getParty().indexOf(character);

    this.#middleBlock.innerHTML = '';

    img.classList.add('battleUI_img');
    this.menu.setCharacter(character, index);
    this.#middleBlock.append(img, this.menu.el);
  }

  update() {
    this.setInfoBlock();
    this.setMiddleBlock(this.#enemies[0][0].img);
  }
}
