import type { MonsterData, Status } from '../../types/types';
import getFromRange from '../../types/utils';
import Character from './character';

export default class Monster {
  name: string;
  AC: number;
  HP: number;
  damageMin: number;
  damageMax: number;
  attacks: number;
  resistances: string[];
  abilities: string[];
  exp: number;
  img: string;
  status: Status;

  constructor(monster: MonsterData) {
    this.name = monster.name;
    this.AC = monster.AC;
    this.HP = getFromRange(monster.HPMin, monster.HPMax);
    this.damageMin = monster.damageMin;
    this.damageMax = monster.damageMax;
    this.attacks = monster.attacks;
    this.resistances = monster.resistances;
    this.abilities = monster.abilities;
    this.exp = monster.exp;
    this.img = monster.img;
    this.status = 'OK';
  }

  // attack(target: Character) {
  //   if (['DEAD', 'ASHES', 'LOST'].includes(target.status)) return;
  //   if (['ASLEEP', 'STONED', 'PLYZE', 'AFRAID'].includes(this.status)) return;

  //   const damage = getFromRange(this.damageMin, this.damageMax);

  //   target.
  // }
}
