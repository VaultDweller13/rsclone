import { getFromRange } from '../../types/utils';
import monsters from './monsters';
import Monster from '../characters/monster';
import { MonsterData } from '../../types/types';

const zombie = monsters.find((monster) => monster.name === 'Zombie');
const creepingCrud = monsters.find((monster) => monster.name === 'Creeping Crud');
const gasCloud = monsters.find((monster) => monster.name === 'Gas Cloud');
const lvl1Mage = monsters.find((monster) => monster.name === 'Mage, Lvl 1');
const lvl1Priest = monsters.find((monster) => monster.name === 'Priest, Lvl 1');
const creepingCoin = monsters.find((monster) => monster.name === 'Creeping Coin');
const lvl1Ninja = monsters.find((monster) => monster.name === 'Ninja, lvl 1');
const vorpalBunny = monsters.find((monster) => monster.name === 'Vorpal Bunny');

const enemies = [
  {
    monster: zombie,
    qty: () => getFromRange(2, 6),
  },
  {
    monster: creepingCrud,
    qty: () => getFromRange(2, 6),
  },
  {
    monster: gasCloud,
    qty: () => getFromRange(2, 6),
  },
  {
    monster: lvl1Mage,
    qty: () => getFromRange(1, 1),
  },
  {
    monster: lvl1Priest,
    qty: () => getFromRange(2, 5),
  },
  {
    monster: creepingCoin,
    qty: () => getFromRange(9, 9),
  },
  {
    monster: lvl1Ninja,
    qty: () => getFromRange(2, 6),
  },
  {
    monster: vorpalBunny,
    qty: () => getFromRange(4, 6),
  },
];

function getGroup() {
  let monster;
  const roll = getFromRange(0, 99);

  if (roll < 75) {
    monster = enemies[getFromRange(0, 4)];
  } else if (roll < 93) {
    monster = enemies[getFromRange(1, 5)];
  } else {
    monster = enemies[getFromRange(3, 7)];
  }

  const group: Monster[] = [];
  group.length = monster.qty();
  group.fill(new Monster(monster.monster as MonsterData));

  return group;
}

export default function getEnemies() {
  const arr = [];
  const groups = getFromRange(0, 99) > 20 ? 1 : 2;

  for (let i = 0; i < groups; i += 1) {
    arr.push(getGroup());
  }

  return arr;
}
