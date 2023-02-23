import type { MonsterData, Status } from '../../types/types';
import { getFromRange, clamp } from '../../types/utils';
import type Character from './character';

export default class Monster {
  name: string;
  level: number;
  AC: number;
  HP: number;
  damageMin: number;
  damageMax: number;
  attacks: number;
  resistances: string[];
  abilities: string[];
  exp: number;
  img: HTMLImageElement;
  status: Status;

  constructor(monster: MonsterData) {
    this.name = monster.name;
    this.level = monster.level;
    this.AC = monster.AC;
    this.HP = getFromRange(monster.HPMin, monster.HPMax);
    this.damageMin = monster.damageMin;
    this.damageMax = monster.damageMax;
    this.attacks = monster.attacks;
    this.resistances = monster.resistances;
    this.abilities = monster.abilities;
    this.exp = monster.exp;
    this.img = new Image();
    this.img.src = monster.img;
    this.status = 'OK';
  }

  attack(target: Character) {
    if (['DEAD', 'ASHES', 'LOST'].includes(target.status)) return;
    if (['ASLEEP', 'STONED', 'PLYZE', 'AFRAID'].includes(this.status)) return;

    const damage = getFromRange(this.damageMin, this.damageMax);
    const hitChance = (this.level + target.getAC()) * 5;
    const hit = clamp(hitChance, 5, 95) > getFromRange(0, 99);

    if (!hit) return;

    target.setHp(target.getHp() - damage);
  }
}
