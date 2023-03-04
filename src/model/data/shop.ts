import weapons from './weapons';
import helmets from './helmets';
import armor from './armor';
import gauntlets from './gauntlets';
import shields from './shields';

const shop = [
  ...weapons.slice(0, 5),
  ...helmets.slice(0, 5),
  ...armor.slice(0, 5),
  ...gauntlets.slice(0, 5),
  ...shields.slice(0, 5),
];

export default shop;
