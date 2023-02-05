type Stats =
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

type ItemTypes = 'weapon' | 'shield' | 'armor' | 'helmet' | 'gauntlet';

type Item = {
  name: string;
  cost: number;
  // type: ItemTypes;
  effect: string;
  class: ClassName[];
};

type Weapon = Item & {
  damageMin: number;
  damageMax: number;
};
