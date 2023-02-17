import Character from '../model/characters/character';
import classes from '../model/data/classes';
// import Party from '../model/game/party';
// import weapons from '../model/data/weapons';
import monsters from '../model/data/monsters';

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
// console.log(fighter.getAC());

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
// const party = new Party(6, true, 100);
// party.add(fighter);
// console.log(party.getParty());
// console.log(party.getGold());
// party.changeGold(200);
// console.log(party.getGold());
// party.changeGold(-300);
// console.log(party.getGold());
// console.log(party.remove(0));
// console.log(party.getParty());
// fighter.equip(armor as Item);
// fighter.equip(helm as Item);
// console.log(fighter.equipment);
// console.log(fighter.getAC());

function showMonster(monster: Monster) {
  const container = document.createElement('div');
  const name = document.createElement('p');
  name.classList.add('.name');
  name.textContent = monster.name;
  const img = document.createElement('img');
  img.src = monster.img;
  img.classList.add('monster');

  container.append(name, img);

  return container;
}

export default function setMonstersBlock() {
  const block = document.createElement('div');
  monsters.forEach((monster) => block.append(showMonster(monster)));

  document.body.append(block);
}
