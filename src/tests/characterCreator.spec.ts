import {
  getBonus,
  getAlignment,
  getCharacter,
  getClasses,
  getRaces,
  getStats,
} from '../model/characters/characterCreator';
import classes from '../model/data/classes';
import races from '../model/data/races';
import type { Stat } from '../types/types';

describe('getBonus()', () => {
  it('should return 5 - 9 || 15 - 19 || 25 - 29', () => {
    const values = [5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29];
    const bonusArr = [];

    for (let i = 0; i < 100000; i++) {
      bonusArr.push(getBonus());
    }

    // calculateProbability(bonusArr);
    expect(bonusArr.every((num) => values.includes(num))).toBeTruthy();
  });
});

describe('getClasses()', () => {
  const stats = [
    'strength',
    'intelligence',
    'piety',
    'vitality',
    'agility',
    'luck',
  ];

  const classNames = Object.values(classes).map((item) => item.name);
  const good = Object.values(classes)
    .filter((item) => item.alignment.includes('good'))
    .map((item) => item.name)
    .sort();
  const evil = Object.values(classes)
    .filter((item) => item.alignment.includes('evil'))
    .map((item) => item.name)
    .sort();
  const neutral = Object.values(classes)
    .filter((item) => item.alignment.includes('neutral'))
    .map((item) => item.name)
    .sort();

  const maxStats = Object.fromEntries(
    stats.map((stat) => [stat, 18])
  ) as Record<Stat, number>;
  const minStats = Object.fromEntries(stats.map((stat) => [stat, 8])) as Record<
    Stat,
    number
  >;
  const oneStat = (stat: Stat, value: number) => {
    const obj = Object.fromEntries(stats.map((stat) => [stat, 8])) as Record<
      Stat,
      number
    >;
    obj[stat as Stat] = value;

    return obj;
  };

  describe('should return empty array if no classes qualify', () => {
    test('if stats are low', () => {
      expect(getClasses('good', minStats)).toEqual([]);
    });
    test('if alignment prevents from taking class', () => {
      expect(getClasses('neutral', oneStat('piety', 11))).toEqual([]);
    });
  });

  describe('should return all classes when stats are maxed', () => {
    test('if alignment is "good" ', () => {
      expect(getClasses('good', maxStats).sort()).toEqual(good);
    });
    test('if alignment is "neutral" ', () => {
      expect(getClasses('neutral', maxStats).sort()).toEqual(neutral);
    });
    test('if alignment is "evil" ', () => {
      expect(getClasses('evil', maxStats).sort()).toEqual(evil);
    });
  });

  describe('should return one class:', () => {
    test('fighter, if strength is 11', () => {
      expect(getClasses('neutral', oneStat('strength', 11))).toEqual([
        'fighter',
      ]);
    });
    test('mage, if intelligence is 11', () => {
      expect(getClasses('neutral', oneStat('intelligence', 11))).toEqual([
        'mage',
      ]);
    });
    test('thief, if agility is 11', () => {
      expect(getClasses('neutral', oneStat('agility', 11))).toEqual(['thief']);
    });
  });
});

describe('getRaces()', () => {
  const raceNames = races.map((race) => race.name).sort();

  it('should return all races', () => {
    expect(getRaces().sort()).toEqual(raceNames);
  });
});

describe('getStats()', () => {
  it('should return stats for given race', () => {
    expect(getStats('elf')).toEqual({
      strength: 7,
      intelligence: 10,
      piety: 10,
      vitality: 6,
      agility: 9,
      luck: 6,
    });
  });
});

function calculateProbabilities(arr: number[]) {
  const obj: { [index: string]: { appearances: number; prob: number } } = {};

  arr.forEach((num) => {
    const index = `${num}`;

    if (obj[index]) {
      obj[index].appearances++;
    } else {
      obj[index] = { appearances: 1, prob: 0 };
    }

    obj[index].prob = obj[index].appearances / arr.length;
  });

  console.table(obj);
}
