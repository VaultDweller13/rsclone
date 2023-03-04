import { getFromRange } from '../../types/utils';
import monsters from './monsters';
import Monster from '../characters/monster';
import { MonsterData } from '../../types/types';

const slime = monsters.find((monster) => monster.name === 'Bubbly Slime');
const orc = monsters.find((monster) => monster.name === 'Orc');
const kobold = monsters.find((monster) => monster.name === 'Kobold');
const undeadKobold = monsters.find((monster) => monster.name === 'Undead Kobold');
const rogue = monsters.find((monster) => monster.name === 'Rogue');
const bushwacker = monsters.find((monster) => monster.name === 'Bushwacker');
const highwayman = monsters.find((monster) => monster.name === 'Highwayman');

const enemies = [
  {
    monster: slime,
    qty: () => getFromRange(2, 4),
  },
  {
    monster: orc,
    qty: () => getFromRange(3, 5),
  },
  {
    monster: kobold,
    qty: () => getFromRange(3, 5),
  },
  {
    monster: undeadKobold,
    qty: () => getFromRange(2, 5),
  },
  {
    monster: rogue,
    qty: () => getFromRange(2, 5),
  },
  {
    monster: bushwacker,
    qty: () => getFromRange(2, 5),
  },
  {
    monster: highwayman,
    qty: () => getFromRange(2, 5),
  },
];

export default function getEnemies() {
  const arr = [];
  const roll = getFromRange(0, 99);
  let monster;

  if (roll < 75) {
    monster = enemies[getFromRange(0, 3)];
  } else if (roll < 93) {
    monster = enemies[getFromRange(1, 5)];
  } else {
    monster = enemies[getFromRange(4, 6)];
  }

  const group: Monster[] = [];
  group.length = monster.qty();
  for (let i = 0; i < group.length; i += 1) {
    group[i] = new Monster(monster.monster as MonsterData);
  }

  arr.push(group);
  return arr;
}
