import BattleUI from './battleUI/battleUI';
import { getFromRange } from '../../../types/utils';
import Monster from '../../characters/monster';
import monsters from '../../data/monsters';
import EventHandler from './handler';
import { MonsterGroup } from '../../../types/types';

export default class Battle {
  exit: () => void;
  UI: BattleUI;
  commands: (() => void)[];
  eventHandler: EventHandler;
  #enemies: MonsterGroup[];

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
  }

  start() {
    this.enemies = this.#getEnemies();
    this.UI.update();
    this.UI.show();
  }

  finish() {
    this.UI.hide();
    this.exit();
  }

  public ifEncounter() {
    return getFromRange(0, 99) < 10;
  }

  #getEnemies() {
    const group1 = [];
    const group2 = [];
    for (let i = 0; i < 1; i += 1) {
      group1.push(new Monster(monsters[0]));
      group2.push(new Monster(monsters[1]));
    }

    return [group1, group2];
  }

  #startRound() {
    this.commands.length = 0;
    this.eventHandler.reset();
    this.enemies = this.enemies.map((group) => group.filter((enemy) => enemy.HP > 0)).filter((group) => group.length);
    if (!this.enemies.length) {
      this.finish();
      return;
    }
    this.eventHandler.enemies = this.enemies;
    this.UI.setEnemies(this.enemies);
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
