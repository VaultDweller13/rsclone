import type Character from '../model/characters/character';
import type Monster from '../model/characters/monster';

export type Stat = 'strength' | 'intelligence' | 'piety' | 'vitality' | 'agility' | 'luck';

export type Status = 'OK' | 'AFRAID' | 'ASLEEP' | 'PLYZE' | 'STONED' | 'DEAD' | 'ASHES' | 'LOST' | 'MUTED';

export type Alignment = 'good' | 'neutral' | 'evil';

export type Race = 'human' | 'dwarf' | 'elf' | 'gnome' | 'hobbit';

export type ClassName = 'fighter' | 'priest' | 'mage' | 'thief' | 'bishop' | 'samurai' | 'lord' | 'ninja';

export type Class = {
  name: ClassName;
  stats: Partial<Record<Stat, number>>;
  alignment: Alignment[];
  hitDice: number;
};

export type ItemTypes = 'weapon' | 'shield' | 'armor' | 'helmet' | 'gauntlet' | 'accessory' | 'expendable';

export type Item = {
  name: string;
  type: ItemTypes;
  cost: number;
  effect: string;
  class: ClassName[];
  alignment: Alignment[];
  cursed: boolean;
  damageMin: number;
  damageMax: number;
  AC: number;
  hitBonus: number;
};

export type Equipment = Map<ItemTypes, Item | null>;

export type KeyItems = {
  name: string;
  type: 'key';
  description: string;
  message: string;
};

export type MonsterData = {
  name: string;
  unidentified: string;
  AC: number;
  HPMin: number;
  HPMax: number;
  damageMin: number;
  damageMax: number;
  attacks: number;
  resistances: string[];
  abilities: string[];
  exp: number;
  img: string;
  level: number;
};

export type Spell = {
  name: string;
  level: number;
  target: 'monster' | 'group' | 'all' | 'self' | 'party' | 'character';
  description: string;
  type: 'battle' | 'maze' | 'any';
  cast: (target?: MonsterData[] | Character) => void;
};

// export type MonsterGroup = { enemy: Monster; amount: number; isDead: boolean };
// export type MonsterGroup = { enemy: Monster[]; amount: number; isDead: boolean };
export type MonsterGroup = Monster[];
