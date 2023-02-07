import Character from '../model/characters/character';
import classes from '../model/data/classes';

const getStats = (vitality: number) => {
  return {
    strength: 18,
    intelligence: 18,
    piety: 18,
    vitality: vitality,
    agility: 18,
    luck: 18,
  };
};

describe('character hp should depend on class hitDice', () => {
  test(`starting hp should be ${classes.fighter.hitDice} + vitality mod for a fighter`, () => {
    const fighter = new Character(
      'Grognak',
      'human',
      getStats(18),
      classes.fighter,
      'good'
    );

    expect(fighter.getHp()).toEqual(classes.fighter.hitDice + 3);
  });
});
