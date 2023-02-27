import { getFromRange } from '../../types/utils';
import monsters from './monsters';
import Monster from '../characters/monster';
import { MonsterData } from '../../types/types';

const vorpalBunny = monsters.find((monster) => monster.name === 'Vorpal Bunny');
const capybara = monsters.find((monster) => monster.name === 'Capybara');
const giantToad = monsters.find((monster) => monster.name === 'Giant Toad');
const coyote = monsters.find((monster) => monster.name === 'Coyote');
const lvl3Samurai = monsters.find((monster) => monster.name === 'Samurai, Lvl 3');
const lvl3Priest = monsters.find((monster) => monster.name === 'Priest, Lvl 3');
const lvl3Ninja = monsters.find((monster) => monster.name === 'Ninja, Lvl 3');
const wereBear = monsters.find((monster) => monster.name === 'Were Bear');
const dragonFly = monsters.find((monster) => monster.name === 'Dragon Fly');
const rottingCorpse = monsters.find((monster) => monster.name === 'Rotting Corpse');
const ogre = monsters.find((monster) => monster.name === 'Ogre');
const hugeSpider = monsters.find((monster) => monster.name === 'Spider, Huge');
const wereRat = monsters.find((monster) => monster.name === 'Wererat');
const boringBeetle = monsters.find((monster) => monster.name === 'Boring Beetle');
const gasDragon = monsters.find((monster) => monster.name === 'Gas Dragon');
const priestess = monsters.find((monster) => monster.name === 'Priestess');

const enemies = [
  {
    monster: vorpalBunny,
    qty: () => getFromRange(3, 7),
  },
  {
    monster: capybara,
    qty: () => getFromRange(3, 7),
  },
  {
    monster: giantToad,
    qty: () => getFromRange(6, 7),
  },
  {
    monster: coyote,
    qty: () => getFromRange(4, 7),
  },
  {
    monster: lvl3Samurai,
    qty: () => getFromRange(4, 7),
  },
  {
    monster: lvl3Priest,
    qty: () => getFromRange(5, 7),
  },
  {
    monster: lvl3Ninja,
    qty: () => getFromRange(4, 7),
  },
  {
    monster: wereBear,
    qty: () => getFromRange(4, 7),
  },
  {
    monster: dragonFly,
    qty: () => getFromRange(2, 4),
  },
  {
    monster: rottingCorpse,
    qty: () => getFromRange(1, 5),
  },
  {
    monster: ogre,
    qty: () => getFromRange(1, 7),
  },
  {
    monster: hugeSpider,
    qty: () => getFromRange(1, 7),
  },
  {
    monster: wereRat,
    qty: () => getFromRange(1, 4),
  },
  {
    monster: boringBeetle,
    qty: () => getFromRange(1, 7),
  },
  {
    monster: gasDragon,
    qty: () => getFromRange(1, 4),
  },
  {
    monster: priestess,
    qty: () => getFromRange(1, 6),
  },
];

function getGroup() {
  let monster;
  const roll = getFromRange(0, 99);

  if (roll < 75) {
    monster = enemies[getFromRange(1, 10)];
  } else if (roll < 93) {
    monster = enemies[getFromRange(0, 9)];
  } else {
    monster = enemies[getFromRange(6, 15)];
  }

  const group: Monster[] = [];
  group.length = monster.qty();
  group.fill(new Monster(monster.monster as MonsterData));

  return group;
}

export default function getEnemies() {
  const arr = [];
  const roll = getFromRange(0, 99);
  let groups = 1;
  if (roll > 49) groups = 2;
  if (roll > 89) groups = 3;

  for (let i = 0; i < groups; i += 1) {
    arr.push(getGroup());
  }

  return arr;
}
