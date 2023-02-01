export default class Character {
  name: string;
  age: number;
  race: Race;
  strength: number;
  intelligence: number;
  piety: number;
  vitality: number;
  agility: number;
  luck: number;
  level: number;
  exp: number;
  hp: number;
  status: Status;
  alignment: Alignment;

  constructor(
    name: string,
    race: Race,
    strength: number,
    intelligence: number,
    piety: number,
    vitality: number,
    agility: number,
    luck: number,
    hp: number,
    alignment: Alignment,
    level = 1
  ) {
    this.name = name;
    this.age = 14 + Math.floor(Math.random() * 3);
    this.race = race;

    this.strength = strength;
    this.intelligence = intelligence;
    this.piety = piety;
    this.vitality = vitality;
    this.agility = agility;
    this.luck = luck;

    this.level = level;
    this.exp = 0;

    this.hp = hp;
    this.status = 'OK';
    this.alignment = alignment;
  }

  attack() {
    // attacks target
  }

  parry() {
    // defends
  }

  run() {
    // runs from battle
  }
}
