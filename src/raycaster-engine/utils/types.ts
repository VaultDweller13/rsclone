type Position = {
  x: number;
  y: number;
  direction?: number;
};

type Ray = {
  x?: number;
  y?: number;
  depth?: number;
  cell?: number;
  distance?: number;
  offset?: number;
};
type RayStep = Pick<Ray, 'x' | 'y' | 'depth'>;
type RayOrigin = Pick<Ray, 'offset' | 'distance' | 'cell'>;

type KeyboardKey =
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'q'
  | 'e'
  | 'w'
  | 's'
  | 'a'
  | 'd';
type KeyboardKeyAlias =
  | 'left'
  | 'right'
  | 'forward'
  | 'backward'
  | 'camera-left'
  | 'camera-right';
type ControlMode = 'continuous' | 'discrete';
