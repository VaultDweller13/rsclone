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

type Class =
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
  class: Class[];
};

type Weapon = Item & {
  damageMin: number;
  damageMax: number;
};
