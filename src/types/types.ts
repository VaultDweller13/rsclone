type Stat =
  | 'strength'
  | 'intelligence'
  | 'piety'
  | 'vitality'
  | 'agility'
  | 'luck';

type Status =
  | 'OK'
  | 'AFRAID'
  | 'ASLEEP'
  | 'PLYZE'
  | 'STONED'
  | 'DEAD'
  | 'ASHES'
  | 'LOST';

type Alignment = 'good' | 'neutral' | 'evil';

type Race = 'human' | 'dwarf' | 'elf' | 'gnome' | 'hobbit';

type ClassName =
  | 'fighter'
  | 'priest'
  | 'mage'
  | 'thief'
  | 'bishop'
  | 'samurai'
  | 'lord'
  | 'ninja';

type Class = {
  name: ClassName;
  stats: Partial<Record<Stat, number>>;
  alignment: Alignment[];
  hitDice: number;
};

type ItemTypes =
  | 'weapon'
  | 'shield'
  | 'armor'
  | 'helmet'
  | 'gauntlet'
  | 'accessory'
  | 'expendable';

type Item = {
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
};

type Equipment = Map<ItemTypes, Item | null>;

type KeyItems = {
  name: string;
  type: 'key';
  description: string;
  message: string;
};
