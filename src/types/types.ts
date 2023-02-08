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

type ItemTypes = 'weapon' | 'shield' | 'armor' | 'helmet' | 'gauntlet';

type Item = {
  name: string;
  cost: number;
  // type: ItemTypes;
  effect: string;
  class: ClassName[];
  alignment: Alignment[];
  cursed: boolean;
};

type Weapon = Item & {
  damageMin: number;
  damageMax: number;
};

type Armor = Item & {
  AC: number;
};

type Helmet = Armor;
type Shield = Armor;
type Gauntlets = Armor;

type Equipment = {
  head: Helmet | null;
  body: Armor | null;
  hands: Gauntlets | null;
  weapon: Weapon | null;
  shield: Shield | null;
};
