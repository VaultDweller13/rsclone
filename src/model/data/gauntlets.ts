import type { Item } from '../../types/types';

const gauntlets: Item[] = [
  {
    name: 'Copper Gloves',
    cost: 6000,
    AC: 1,
    effect: '',
    class: ['fighter', 'samurai', 'lord', 'ninja'],
    type: 'gauntlet',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Silver Gloves',
    cost: 60000,
    AC: 3,
    effect: '',
    class: ['fighter', 'samurai', 'lord', 'ninja'],
    type: 'gauntlet',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
];

export default gauntlets;
