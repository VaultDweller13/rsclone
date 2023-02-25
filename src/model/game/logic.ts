import { getFromRange } from '../../types/utils';
import Monster from '../characters/monster';
import monsters from '../data/monsters';

export default class Logic {
  public ifEncounter() {
    const roll = getFromRange(0, 100);
    console.log({ roll });
    return roll < 10;
  }

  public getEnemies() {
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
}
