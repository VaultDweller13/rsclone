import Character from '../model/characters/character';
import classes from '../model/data/classes';
import weapons from '../model/data/weapons';

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
console.log(fighter.equipment);
console.log(weapons[7]);
fighter.equip(weapons[7]);
console.log(fighter.equipment);
console.log(fighter.equipment.get('weapon')?.damageMax);
