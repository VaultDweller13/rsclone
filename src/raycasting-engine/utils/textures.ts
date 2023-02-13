import Texture from '../Texture';

import wall1 from '../assets/option-1/wall-1.jpg';
import entry1 from '../assets/option-1/entry-door-1.png';
import exit1 from '../assets/option-1/exit-door-1.png';
import closedDoor1 from '../assets/option-1/closed-door-1.png';
import openDoorVertical1 from '../assets/option-1/open-door-1-vertical.png';
import openDoorHorizontal1 from '../assets/option-1/open-door-1-horizontal.png';

import wall2 from '../assets/option-2/wall-2.jpg';
import entry2 from '../assets/option-2/entry-door-2.png';
import exit2 from '../assets/option-2/exit-door-2.png';
import closedDoor2 from '../assets/option-2/closed-door-2.png';
import openDoorVertical2 from '../assets/option-2/open-door-2-vertical.png';
import openDoorHorizontal2 from '../assets/option-2/open-door-2-horizontal.png';

import wall3 from '../assets/option-3/wall-3.png';
import entry3 from '../assets/option-3/entry-door-3.png';
import exit3 from '../assets/option-3/exit-door-3.png';
import closedDoor3 from '../assets/option-3/closed-door-3.png';
import openDoorVertical3 from '../assets/option-3/open-door-3-vertical.png';
import openDoorHorizontal3 from '../assets/option-3/open-door-3-horizontal.png';

export const option1: Record<TextureName, Texture> = {
  wall: new Texture(wall1 as string, 512, 512),
  entry: new Texture(entry1 as string, 512, 512),
  exit: new Texture(exit1 as string, 512, 512),
  closedDoor: new Texture(closedDoor1 as string, 512, 512),
  openDoorVertical: new Texture(openDoorVertical1 as string, 512, 512),
  openDoorHorizontal: new Texture(openDoorHorizontal1 as string, 512, 512),
};

export const option2: Record<TextureName, Texture> = {
  wall: new Texture(wall2 as string, 512, 512),
  entry: new Texture(entry2 as string, 512, 512),
  exit: new Texture(exit2 as string, 512, 512),
  closedDoor: new Texture(closedDoor2 as string, 512, 512),
  openDoorVertical: new Texture(openDoorVertical2 as string, 512, 512),
  openDoorHorizontal: new Texture(openDoorHorizontal2 as string, 512, 512),
};

export const option3: Record<TextureName, Texture> = {
  wall: new Texture(wall3 as string, 512, 512),
  entry: new Texture(entry3 as string, 512, 512),
  exit: new Texture(exit3 as string, 512, 512),
  closedDoor: new Texture(closedDoor3 as string, 512, 512),
  openDoorVertical: new Texture(openDoorVertical3 as string, 512, 512),
  openDoorHorizontal: new Texture(openDoorHorizontal3 as string, 512, 512),
};
