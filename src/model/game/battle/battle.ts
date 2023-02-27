import BattleUI from './battleUI/battleUI';
import { getFromRange } from '../../../types/utils';
import EventHandler from './handler';
import { MonsterGroup } from '../../../types/types';
import { renderParty } from '../../../View/Render/common';
import type Party from '../party';
import { party } from '../../../View/Render/partyInitializer';
import { confirm } from '../../../View/Render/castle/characterCreator';
import type { Level } from '../../../game/game-engine/utils/types';
import { monsters } from '../../data/tables';

export default class Battle {
  exit: () => void;
  UI: BattleUI;
  commands: (() => void)[];
  eventHandler: EventHandler;
  #enemies: MonsterGroup[];
  #startingEnemies: MonsterGroup[];
  #party: Party;

  constructor(callback: () => void) {
    this.UI = new BattleUI();
    this.exit = callback;
    this.commands = [];
    this.eventHandler = new EventHandler(
      this.UI,
      this.commands,
      () => this.exit(),
      () => this.#executeCommands()
    );
    this.#enemies = [];
    this.#startingEnemies = [];
    this.#party = party;
  }

  start(level: Level) {
    this.enemies = this.#getEnemies(level);
    this.#startingEnemies = this.enemies;
    this.UI.update();
    this.UI.show();
  }

  finish() {
    const exp = this.#startingEnemies
      .flat(2)
      .filter((monster) => monster.status === 'DEAD')
      .reduce((sum, monster) => sum + monster.exp, 0);
    this.#party.splitExp(exp);
    new Promise((resolve) => {
      setTimeout(() => resolve(this.UI.showMessage(`Party got ${exp} experience points`)), 2000);
    })
      .then(() =>
        setTimeout(() => {
          this.UI.hide();
          this.exit();
        }, 2000)
      )
      .catch(() => {});
  }

  public ifEncounter() {
    return getFromRange(0, 99) < 10;
  }

  #getEnemies(level: Level) {
    return monsters[level.id - 1].default();
  }

  #startRound() {
    renderParty();
    this.commands.length = 0;
    this.eventHandler.reset();
    this.enemies = this.enemies.map((group) => group.filter((enemy) => enemy.HP > 0)).filter((group) => group.length);

    if (!this.enemies.length) {
      this.finish();
      return;
    }

    if (!this.#party.getParty().filter((char) => char.getHp()).length) {
      confirm.func();
      this.#party.remove(-1);
      renderParty();
      return;
    }

    this.UI.update();
  }

  #executeCommands() {
    const promises = this.commands.map(
      (fn, index) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(fn()), 2000 * index);
        })
    );

    Promise.all(promises)
      .then(() => setTimeout(() => this.#startRound(), 2000))
      .catch(() => {});
  }

  set enemies(enemies: MonsterGroup[]) {
    this.#enemies = enemies;
    this.eventHandler.enemies = enemies;
    this.UI.setEnemies(enemies);
  }

  get enemies() {
    return this.#enemies;
  }
}
