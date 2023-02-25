import type { Class } from '../../types/types';

export default {
  fighter: {
    name: 'fighter',
    stats: {
      strength: 11,
    },
    alignment: ['good', 'neutral', 'evil'],
    hitDice: 10,
  } as Class,
  mage: {
    name: 'mage',
    stats: {
      intelligence: 11,
    },
    alignment: ['good', 'neutral', 'evil'],
    hitDice: 4,
  } as Class,
  priest: {
    name: 'priest',
    stats: {
      piety: 11,
    },
    alignment: ['good', 'evil'],
    hitDice: 8,
  },
  thief: {
    name: 'thief',
    stats: {
      agility: 11,
    },
    alignment: ['neutral', 'evil'],
    hitDice: 6,
  },
  bishop: {
    name: 'bishop',
    stats: {
      intelligence: 12,
      piety: 12,
    },
    alignment: ['good', 'evil'],
    hitDice: 6,
  },
  samurai: {
    name: 'samurai',
    stats: {
      strength: 15,
      intelligence: 11,
      piety: 10,
      vitality: 14,
      agility: 10,
    },
    alignment: ['good', 'neutral'],
    hitDice: 8,
  },
  lord: {
    name: 'lord',
    stats: {
      strength: 15,
      intelligence: 12,
      piety: 12,
      vitality: 15,
      agility: 14,
      luck: 15,
    },
    alignment: ['good'],
    hitDice: 10,
  },
  ninja: {
    name: 'ninja',
    stats: {
      strength: 17,
      intelligence: 17,
      piety: 17,
      vitality: 17,
      agility: 17,
      luck: 17,
    },
    alignment: ['evil'],
    hitDice: 6,
  },
};
