import Battle from '../../game/game-engine/Battle';
import getFromRange from '../../types/utils';
import Monster from '../characters/monster';
import monsters from '../data/monsters';

export default class Logic {
  battle: Battle;

  constructor(battle: Battle) {
    this.battle = battle;
  }

  private ifEncounter() {
    const roll = getFromRange(0, 100);
    console.log({ roll });
    return roll < 10;
  }

  private startBattle() {
    const group = {
      enemy: new Monster(monsters[0]),
      amount: 5,
      isDead: false,
    };

    this.battle.defineEnemies([group]);
    this.battle.render();
  }

  events() {
    if (this.ifEncounter()) this.startBattle();
  }
}
