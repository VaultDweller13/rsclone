import Character from '../../model/characters/character';
import classes from '../../model/data/classes';
import Party from '../../model/game/party';
import weapons from '../../model/data/weapons';
import armor from '../../model/data/armor';

const party = new Party(6, true, 0);
const testGrognak = new Character(
  'FIGHTER',
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

const testMage = new Character(
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

const testPriest = new Character(
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
  classes.mage,
  'good'
);

testGrognak.status = 'AFRAID';

testGrognak.addToInventory(weapons[7]);
testGrognak.addToInventory(weapons[8]);
testGrognak.addToInventory(weapons[9]);
testGrognak.addToInventory(weapons[10]);
testGrognak.addToInventory(weapons[11]);
testGrognak.addToInventory(weapons[12]);
testGrognak.addToInventory(weapons[13]);
testGrognak.addToInventory(armor[14]);
testGrognak.equip(weapons[2]);
testGrognak.addExp(1000);
party.add(testGrognak);
party.changeGold(2345);
party.add(testMage);

const tavern = new Party(20, false);

export { party, tavern };
