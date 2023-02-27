import type { MonsterData, Status } from '../../types/types';
import { getFromRange, clamp } from '../../types/utils';
import type Character from './character';

export default class Monster {
  name: string;
  level: number;
  AC: number;
  #HP: number;
  damageMin: number;
  damageMax: number;
  attacks: number;
  resistances: string[];
  abilities: string[];
  exp: number;
  img: HTMLImageElement;
  status: Status;
  #message: '';

  constructor(monster: MonsterData) {
    this.name = monster.name;
    this.level = monster.level;
    this.AC = monster.AC;
    this.#HP = getFromRange(monster.HPMin, monster.HPMax);
    this.damageMin = monster.damageMin;
    this.damageMax = monster.damageMax;
    this.attacks = monster.attacks;
    this.resistances = monster.resistances;
    this.abilities = monster.abilities;
    this.exp = monster.exp;
    this.img = new Image();
    this.img.src = monster.img;
    this.status = 'OK';
    this.#message = '';
  }

  attack(target: Character) {
    if (['DEAD', 'ASHES', 'LOST'].includes(target.status)) return;
    if (['ASLEEP', 'STONED', 'PLYZE', 'AFRAID'].includes(this.status)) return;
    if (this.HP <= 0) return;

    const hitChance = (this.level + target.getAC()) * 5;
    let totalDamage = 0;
    let timesHit = 0;

    for (let i = 0; i < this.attacks; i += 1) {
      const hit = clamp(hitChance, 5, 95) > getFromRange(0, 99);

      if (hit) {
        timesHit += 1;
        totalDamage += this.#rollDamage();
      }
    }

    if (!timesHit) {
      this.#message += `${this.name} attempts to attack ${target.name} and misses.`;
      return;
    }

    const s = this.attacks > 1 ? 's' : '';
    this.#message += `${this.name} attempts to attack ${target.name} and hits ${timesHit} time${s} for ${totalDamage}.`;

    target.setHp(target.getHp() - totalDamage);
  }

  #rollDamage() {
    return getFromRange(this.damageMin, this.damageMax);
  }

  get message() {
    const message = this.#message;
    this.#message = '';
    return message;
  }

  get HP() {
    return this.#HP;
  }

  set HP(value: number) {
    this.#HP = value;
    if (this.#HP <= 0) this.status = 'DEAD';
  }
}
