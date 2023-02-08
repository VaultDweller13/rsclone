export default class Character {
  public name: string;
  public age: number;
  public race: Race;
  strength: number;
  intelligence: number;
  piety: number;
  vitality: number;
  agility: number;
  luck: number;
  class: Class;
  level: number;
  exp: number;
  #hp: number;
  #maxHp: number;
  status: Status;
  alignment: Alignment;

  constructor(
    name: string,
    race: Race,
    stats: Record<Stat, number>,
    charClass: Class,
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

    this.#maxHp = this.#getStartHp();
    this.#hp = this.#maxHp;
    this.status = 'OK';
    this.alignment = alignment;
  }

  public setHp(value = this.#maxHp) {
    this.#hp = value > this.#maxHp ? this.#maxHp : value;
  }

  public getHp() {
    return this.#hp;
  }

  #rollMaxHp(): void {
    const vitMod = this.#getVitMod();
    let hp = this.#getStartHp();

    for (let i = 0; i < this.level - 1; i += 1) {
      hp += Math.floor(Math.random() * this.class.hitDice + 1) + vitMod;
    }

    this.#maxHp = this.#maxHp >= hp ? (this.#maxHp += 1) : hp;
  }

  #getVitMod(): number {
    let vitMod = 0;

    if (this.vitality > 15) vitMod = this.vitality - 15;
    if (this.vitality < 6) vitMod = -1;
    if (this.vitality === 3) vitMod = -2;

    return vitMod;
  }

  #getStartHp(): number {
    const vitMod = this.#getVitMod();
    const samMod = this.class.name === 'samurai' ? 2 : 1;
    return samMod * this.class.hitDice + vitMod;
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