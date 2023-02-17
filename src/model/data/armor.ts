import type { Item } from '../../types/types';

const armor: Item[] = [
  {
    name: 'Robes',
    cost: 15,
    AC: 1,
    effect: '',
    class: [
      'fighter',
      'priest',
      'thief',
      'mage',
      'bishop',
      'samurai',
      'lord',
      'ninja',
    ],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Leather Armor',
    cost: 50,
    AC: 2,
    effect: '',
    class: ['fighter', 'priest', 'thief', 'bishop', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Chain Mail',
    cost: 90,
    AC: 3,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Breast Plate',
    cost: 200,
    AC: 4,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Plate Mail',
    cost: 750,
    AC: 5,
    effect: '',
    class: ['fighter', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Shiny Chain',
    cost: 1500,
    AC: 4,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Padded Leather',
    cost: 1500,
    AC: 3,
    effect: '',
    class: ['fighter', 'priest', 'thief', 'bishop', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Sturdy Plate',
    cost: 1500,
    AC: 6,
    effect: '',
    class: ['fighter', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Body Armor',
    cost: 1500,
    AC: 5,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Treated Leather',
    cost: 6000,
    AC: 4,
    effect: '',
    class: ['fighter', 'priest', 'thief', 'bishop', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Elven Chain',
    cost: 6000,
    AC: 5,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: '1st Class Plate',
    cost: 6000,
    AC: 7,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Chain of Evil',
    cost: 8000,
    AC: 5,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Neutral Plate',
    cost: 8000,
    AC: 7,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['neutral'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Breastplate of Boons',
    cost: 10000,
    AC: 6,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Armor of Heroes',
    cost: 100000,
    AC: 7,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Armor of Freon',
    cost: 150000,
    AC: 6,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Armor of Evil',
    cost: 150000,
    AC: 9,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Armor of Lords',
    cost: 1000000,
    AC: 10,
    effect: 'Prot: Mythical. Dragon; Regeneration (1); Vs: Were. Demon. Undead',
    class: ['lord'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Leather -1',
    cost: 1500,
    AC: 1,
    effect: '',
    class: ['fighter', 'priest', 'thief'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Rotten Leather',
    AC: 1,
    cost: 1500,
    effect: '',
    class: ['fighter', 'priest', 'thief'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Chain -1',
    AC: 2,
    cost: 1500,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Corroded Chain',
    AC: 2,
    cost: 1500,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Breastplate -1',
    AC: 3,
    cost: 1500,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Broken Breastplate',
    AC: 3,
    cost: 1500,
    effect: '',
    class: ['fighter', 'priest', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Leather of Loss',
    AC: 0,
    cost: 8000,
    effect: '',
    class: ['fighter', 'priest', 'thief', 'bishop', 'samurai', 'lord', 'ninja'],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Cursed Robe',
    AC: -2,
    cost: 8000,
    effect: '',
    class: [
      'fighter',
      'priest',
      'thief',
      'mage',
      'bishop',
      'samurai',
      'lord',
      'ninja',
    ],
    type: 'armor',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
];

export default armor;
