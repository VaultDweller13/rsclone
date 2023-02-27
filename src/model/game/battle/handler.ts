import type Character from '../../characters/character';
import type BattleUI from './battleUI/battleUI';
import { party } from '../../../View/Render/partyInitializer';
import type { MonsterGroup } from '../../../types/types';
import { getFromRange } from '../../../types/utils';

export default class EventHandler {
  UI: BattleUI;
  commands: (() => void)[];
  #exit: () => void;
  #startRound: () => void;
  #party: Character[];
  #charIndex: number;
  #enemies: MonsterGroup[];

  constructor(UI: BattleUI, commands: (() => void)[], exit: () => void, startRound: () => void) {
    this.UI = UI;
    this.commands = commands;
    this.#exit = exit;
    this.#startRound = startRound;
    this.#party = party.getParty();
    this.#charIndex = 0;
    this.#enemies = [];

    this.reset();
    this.#initMenuListener();
    this.#initConfirmListner();
  }

  #initMenuListener() {
    const { menu, confirm } = this.UI;
    const showMessage = (message: string) => this.UI.showMessage(message);

    menu.el.addEventListener('click', (e: MouseEvent) => {
      const { target } = e;
      const { fight, parry, cast, item, run, dispell, back } = menu.options;
      if (!(target instanceof HTMLElement)) return;
      if (![fight, parry, cast, item, run, dispell, back].includes(target)) return;

      const { character } = this;
      let command;

      if (target === fight) {
        command = () => {
          if (this.currentEnemy) {
            character.attack(this.currentEnemy);
            const { message } = character;
            if (message) showMessage(message);
          }
        };
      }

      if (target === parry) command = () => this.character.parry();
      if (target === item) command = () => this.character.useItem();
      if (target === cast) command = () => this.character.cast();
      if (target === dispell) command = () => this.character.dispell();
      if (command) this.commands.push(command);

      if (target === run) {
        if (this.character.run()) {
          this.UI.hide();
          this.#exit();
        }
        return;
      }

      if (target === back) {
        this.commands.pop();
        this.#charIndex -= 1;
        menu.setCharacter(this.character, this.#charIndex);

        return;
      }

      if (this.#charIndex + 1 < this.#party.length) {
        this.#charIndex += 1;
        menu.setCharacter(this.character, this.#charIndex);
      } else {
        menu.hide();
        confirm.show();
      }
    });
  }

  #initConfirmListner() {
    const { confirm, menu } = this.UI;

    confirm.el.addEventListener('click', (e: Event) => {
      const { target } = e;
      const { fight, back } = confirm;
      if (!(target instanceof HTMLElement)) return;

      if (target === back) {
        this.commands.pop();
        confirm.hide();
        menu.setCharacter(this.character, this.#charIndex);
        menu.show();
      }
      if (target === fight) {
        this.#enemyPhase();
        confirm.hide();
        this.#startRound();
      }
    });
  }

  get character() {
    return this.#party[this.#charIndex];
  }

  get enemies() {
    return this.#enemies;
  }

  set enemies(enemies: MonsterGroup[]) {
    this.#enemies = enemies;
  }

  get currentEnemy() {
    return this.#enemies[0].find((enemy) => enemy.HP > 0);
  }

  reset() {
    this.#party = this.#party.filter((char) => char.status === 'OK');
    this.#charIndex = 0;
  }

  #enemyPhase() {
    const showMessage = (message: string) => this.UI.showMessage(message);
    const getTarget = () => this.#party[getFromRange(0, this.#party.length - 1)];
    const monsters = this.enemies.flat().filter((monster) => monster.HP > 0);

    monsters.forEach((monster) =>
      this.commands.push(() => {
        monster.attack(getTarget());
        const { message } = monster;
        if (message) showMessage(message);
      })
    );
  }
}
