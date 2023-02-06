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
  class: ClassName;
  level: number;
  exp: number;
  hp: number;
  status: Status;
  alignment: Alignment;

  constructor(
    name: string,
    race: Race,
    stats: Record<Stat, number>,
    charClass: ClassName,
    alignment: Alignment,
    level = 1
  ) {
    this.name = name;
    this.age = 14 + Math.floor(Math.random() * 3);
    this.race = race;

    this.strength = stats.strength;
    this.intelligence = stats.intelligence;
    this.piety = stats.piety;
    this.vitality = stats.vitality;
    this.agility = stats.agility;
    this.luck = stats.luck;

    this.class = charClass;
    this.level = level;
    this.exp = 0;

    this.hp = 10;
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
