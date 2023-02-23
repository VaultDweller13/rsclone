import Character from '../../model/characters/character';
import classes from '../../model/data/classes';
import Party from '../../model/game/party';
import weapons from '../../model/data/weapons';
import armor from '../../model/data/armor';

const party = new Party(6, true, 0);
const testGrognak = new Character(
  'Grognak',
  'human',
  {
    strength: 11,
    intelligence: 10,
    piety: 10,
    vitality: 10,
    agility: 10,
    luck: 10,
  },
  classes.fighter,
  'good'
);
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
const tavern = new Party(20, false);

// added for testing purpose

for (let i = 0; i < 15; i += 1) {
  tavern.add(
    new Character(
      `Gognak${i}`,
      'human',
      {
        strength: 18,
        intelligence: 18,
        piety: 18,
        vitality: 18,
        agility: 18,
        luck: 18,
      },
      classes.fighter,
      'good'
    )
  );
}

export { party, tavern };
