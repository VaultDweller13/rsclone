import BattleUI from './battleUI/battleUI';
import { getFromRange } from '../../../types/utils';
import Monster from '../../characters/monster';
import monsters from '../../data/monsters';
// import { party } from '../../../View/Render/partyInitializer';
// import type Party from '../party';
// import type Character from '../../characters/character';
import EventHandler from './handler';
import { MonsterGroup } from '../../../types/types';

export default class Battle {
  exit: () => void;
  game: HTMLElement;
  UI: BattleUI;
  commands: (() => void)[];
  eventHandler: EventHandler;
  enemies: MonsterGroup[];

  constructor(callback: () => void) {
    this.UI = new BattleUI();
    this.exit = callback;
    this.game = document.querySelector('.game') as HTMLElement;
    this.commands = [];
    this.eventHandler = new EventHandler(
      this.UI,
      this.commands,
      () => this.exit(),
      () => this.#executeCommands()
    );
    this.enemies = [];
  }

  start() {
    this.#showUI();
    this.enemies = this.#getEnemies();
    this.eventHandler.enemies = this.enemies;
  }

  public ifEncounter() {
    const roll = getFromRange(0, 99);
    console.log({ roll });
    return roll < 10;
  }

  #getEnemies() {
    const group = [
      {
        enemy: new Monster(monsters[0]),
        amount: 5,
        isDead: false,
      },
      {
        enemy: new Monster(monsters[1]),
        amount: 4,
        isDead: false,
      },
    ];

    return group;
  }

  #showUI() {
    this.UI.setEnemies(this.enemies);
    this.UI.init();
    this.game.append(this.UI.element);
  }

  #getTarget() {
    return {} as Monster;
  }

  #startRound() {
    this.UI.setEnemies(this.enemies);
  }

  #executeCommands() {
    const promises = this.commands.map(
      (fn, index) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(fn()), 2000 * index);
        })
    );

    Promise.all(promises)
      .then(() => console.log('ok'))
      .catch(() => {});
  }
}
