import Texture from '../Texture';

export type Position = {
  x: number;
  y: number;
  direction?: number;
};

export type Coordinates = Required<Pick<Position, 'x' | 'y'>>;

export type Axis = 'x' | 'y' | 'both';

export type Ray = {
  x?: number;
  y?: number;
  deltaDistance?: number;
  cell?: number;
  distance?: number;
  offset?: number;
  axis?: Axis;
  onAxis?: Axis;
};

export type RayStep = Pick<Ray, 'x' | 'y' | 'deltaDistance' | 'axis'>;
export type RayOrigin = Pick<Ray, 'offset' | 'distance' | 'cell' | 'axis' | 'onAxis'>;

export type KeyboardKeyCode =
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'KeyA'
  | 'KeyD'
  | 'KeyQ'
  | 'KeyE'
  | 'KeyW'
  | 'KeyS';

export type KeyboardKeyAlias = 'left' | 'right' | 'forward' | 'backward' | 'camera-left' | 'camera-right';

export type ControlMode = 'continuous' | 'discrete';

export type TextureName = 'wall' | 'entry' | 'exit' | 'closedDoor' | 'openDoorVertical' | 'openDoorHorizontal';

export type TextureAlias = 1 | 2 | 3 | 4 | 5 | 6;

export type Level = {
  id: number;
  name: string;
  map: number[];
  startPosition: Required<Position>;
  lightRange: number;
  textures: Record<TextureName, Texture>;
};
