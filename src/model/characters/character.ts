import type { Race, Class, Status, Alignment, Item, Equipment, Stat, ItemTypes } from '../../types/types';
import { getFromRange, clamp } from '../../types/utils';
import levels from '../data/levels';
import type Monster from './monster';

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
  #exp: number;
  #nextExp: number;
  #hp: number;
  #maxHp: number;
  status: Status;
  alignment: Alignment;
  #inventory: Item[];
  equipment: Equipment;
  #message: string;
  #parrying: boolean;

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
    this.#exp = 0;
    this.#nextExp = levels[this.class.name][this.level + 1];

    this.#maxHp = this.#getStartHp();
    this.#hp = this.#maxHp;
    this.status = 'OK';
    this.alignment = alignment;

    this.#inventory = [];
    this.equipment = this.#initEquipment();

    this.#message = '';
    this.#parrying = false;
  }

  public setHp(value = this.#maxHp) {
    this.#hp = clamp(value, 0, this.#maxHp);
    if (!this.#hp) this.status = 'DEAD';
  }

  public getHp() {
    return this.#hp;
  }

  public getMaxHP() {
    return this.#maxHp;
  }

  public getAC() {
    const equipment = [...this.equipment.values()];
    const parryBonus = this.#parrying ? -2 : 0;

    return equipment.reduce((AC, item) => AC - (item?.AC || 0), 10) + parryBonus;
  }

  #rollMaxHp(): void {
    const vitMod = this.#getVitMod();
    let hp = this.#getStartHp();

    for (let i = 0; i < this.level - 1; i += 1) {
      hp += getFromRange(1, this.class.hitDice) + vitMod;
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

  public addToInventory(item: Item) {
    if (this.#inventory.length < 8) this.#inventory.push(item);
  }

  public removeFromInventory(index: number) {
    if (index >= 0 && index < 8) return this.#inventory.splice(index, 1);

    return undefined;
  }

  public getInventory() {
    return this.#inventory;
  }

  public equip(item: Item) {
    if (!this.equipment.has(item.type)) return;
    if (!item.alignment.includes(this.alignment)) return;
    if (!item.class.includes(this.class.name)) return;

    this.equipment.set(item.type, item);
  }

  public unequip(slot: ItemTypes) {
    if (this.equipment.has(slot)) this.equipment.set(slot, null);
  }

  #initEquipment() {
    const slots = ['weapon', 'shield', 'armor', 'helmet', 'gauntlet'] as const;
    const map = new Map<ItemTypes, Item | null>();

    slots.forEach((slot) => {
      map.set(slot, null);
    });

    return map;
  }

  public attack(enemy: Monster) {
    this.#parrying = false;
    const target = enemy;
    const hitChance = (this.#getHitCalcMod() + target.AC + 3) * 5;
    const swings = this.#getSwingsCount();
    let timesHit = 0;
    let totalDamage = 0;

    for (let i = 0; i < swings; i += 1) {
      const hit = clamp(hitChance, 5, 95) > getFromRange(0, 99);

      if (hit) {
        timesHit += 1;
        totalDamage += this.#rollDamage();
      }
    }

    if (!timesHit) {
      this.#message += `${this.name} missed.`;
      return;
    }

    target.HP -= totalDamage;
    target.shake();

    const s = timesHit > 1 ? 's' : '';
    this.#message += `${this.name} attacks ${enemy.name} and hits ${timesHit} time${s} for ${totalDamage}.`;
    if (target.HP <= 0) this.#message += `\n${target.name} is killed.`;
  }

  public parry() {
    this.#parrying = true;
  }

  public run() {
    this.#parrying = false;
    return true;
  }

  public useItem() {
    this.#parrying = false;
  }

  public cast() {
    this.#parrying = false;
  }

  public dispell() {
    this.#parrying = false;
  }

  #rollDamage() {
    let strMod = 0;
    if (this.strength > 15) strMod = this.strength - 15;
    if (this.strength < 6) strMod = 6 - this.strength;

    let damage = 2 * (getFromRange(1, 2) + strMod);

    if (this.equipment.get('weapon')) {
      const weapon = this.equipment.get('weapon') as Item;

      damage = getFromRange(weapon.damageMin, weapon.damageMax) + strMod;
    }

    return damage;
  }

  #getHitCalcMod() {
    const wpnMod = [...this.equipment.values()].reduce((sum, item) => sum + (item?.hitBonus || 0), 0);
    const classMod = ['mage', 'thief', 'bishop'].includes(this.class.name)
      ? Math.floor(this.level / 5)
      : Math.floor(this.level / 3) + 2;

    let strMod = 0;
    if (this.strength > 15) strMod = this.strength - 15;
    if (this.strength < 6) strMod = 6 - this.strength;

    return classMod + strMod + wpnMod;
  }

  #getSwingsCount() {
    if (['fighter', 'lord', 'samurai'].includes(this.class.name)) return Math.floor(this.level / 5) + 1;
    if (this.class.name === 'ninja') return Math.floor(this.level / 5) + 2;

    return 1;
  }

  addExp(value: number) {
    this.#exp += value;
    this.#nextExp -= value;
  }

  get exp() {
    return this.#exp;
  }

  /** Returns the amount of exp needed to the next level */
  get nextExp() {
    return this.#nextExp > 0 ? this.#nextExp : 0;
  }

  #levelUp() {
    this.#message = '';

    if (this.nextExp) {
      this.#message = `You need ${this.nextExp} more EXP to make the next level`;
      return;
    }

    const stats = ['strength', 'intelligence', 'piety', 'vitality', 'agility', 'luck'] as const;
    const oldHp = this.getMaxHP();

    this.#message += `You made the next level!\n\n`;

    this.level += 1;
    stats.forEach((stat) => this.#changeStat(stat));
    this.#rollMaxHp();
    this.#message += `You gained ${this.getMaxHP() - oldHp} Hit Points\n`;
    this.#nextExp += levels[this.class.name][this.level + 1];
  }

  #changeStat(stat: Stat) {
    const d100 = () => getFromRange(0, 99);
    const changeProb = 74;
    const decreaseProb = (this.age / 130) * 100;
    const decreaseSaveProb = (5 / 6) * 100;

    if (d100() > changeProb) return;

    if (d100() < decreaseProb) {
      if (this[stat] === 18 && d100() < decreaseSaveProb) return;

      this[stat] -= 1;
      this.#message += `You lost ${stat}\n`;
      return;
    }

    if (this[stat] < 18) {
      this[stat] += 1;
      this.#message += `You gained ${stat}\n`;
    }
  }

  rest(full = false) {
    if (full) this.setHp();

    this.#levelUp();
    // To do: reset spells
  }

  /** Returns message if last character action provided one */
  get message() {
    const message = this.#message;
    this.#message = '';

    return message;
  }
}
