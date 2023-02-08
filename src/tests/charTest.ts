import Character from '../model/characters/character';
import classes from '../model/data/classes';
// import weapons from '../model/data/weapons';

const stats = (str = 18, int = 18, pie = 18, vit = 18, agi = 18, luc = 18) => ({
  strength: str,
  intelligence: int,
  piety: pie,
  vitality: vit,
  agility: agi,
  luck: luc,
});

const fighter = new Character(
  'Grognak',
  'human',
  stats(),
  classes.fighter,
  'good'
);

console.log(fighter);
// console.log(fighter.equipment);
// console.log(weapons[7]);
// fighter.equip(weapons[7]);
// console.log(fighter.equipment);
// console.log(fighter.equipment.get('weapon')?.damageMax);
// console.log(fighter)
// console.log(fighter.getInventory());
// fighter.addToInventory(weapons[0]);
// fighter.addToInventory(weapons[1]);
// fighter.addToInventory(weapons[2]);
// fighter.addToInventory(weapons[3]);
// fighter.addToInventory(weapons[4]);
// fighter.addToInventory(weapons[5]);
// fighter.addToInventory(weapons[6]);
// fighter.addToInventory(weapons[7]);
// fighter.addToInventory(weapons[8]);
// console.log(fighter.removeFromInventory(7));
// console.log(fighter.getInventory());
