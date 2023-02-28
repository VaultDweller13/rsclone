import Character from '../../model/characters/character';
import classes from '../../model/data/classes';
import Party from '../../model/game/party';
import weapons from '../../model/data/weapons';
import armor from '../../model/data/armor';

const party = new Party(6, true, 0);
const fighter1 = new Character(
  'FIGHTER1',
  'dwarf',
  {
    strength: 16,
    intelligence: 10,
    piety: 10,
    vitality: 16,
    agility: 14,
    luck: 10,
  },
  classes.fighter,
  'good'
);

const fighter2 = new Character(
  'FIGHTER2',
  'human',
  {
    strength: 14,
    intelligence: 12,
    piety: 10,
    vitality: 13,
    agility: 16,
    luck: 10,
  },
  classes.fighter,
  'good'
);

const mage = new Character(
  'MAGE',
  'elf',
  {
    strength: 6,
    intelligence: 17,
    piety: 12,
    vitality: 12,
    agility: 10,
    luck: 10,
  },
  classes.mage,
  'good'
);

const priest = new Character(
  'PRIEST',
  'human',
  {
    strength: 12,
    intelligence: 12,
    piety: 16,
    vitality: 14,
    agility: 10,
    luck: 10,
  },
  classes.priest,
  'good'
);

const thief = new Character(
  'THIEF',
  'hobbit',
  {
    strength: 12,
    intelligence: 12,
    piety: 12,
    vitality: 14,
    agility: 16,
    luck: 17,
  },
  classes.thief,
  'neutral'
);

const bishop = new Character(
  'BISHOP',
  'human',
  {
    strength: 12,
    intelligence: 16,
    piety: 16,
    vitality: 14,
    agility: 13,
    luck: 10,
  },
  classes.bishop,
  'good'
);

fighter1.equip(weapons[0]);
fighter1.equip(armor[1]);

fighter2.equip(weapons[0]);
fighter2.equip(armor[1]);

party.changeGold(1500);

const tavern = new Party(20, false);
tavern.add(fighter1);
tavern.add(fighter2);
tavern.add(mage);
tavern.add(priest);
tavern.add(bishop);
tavern.add(thief);

export { party, tavern };
