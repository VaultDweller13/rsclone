type Position = {
  x: number;
  y: number;
  direction?: number;
};

type Coordinates = Required<Pick<Position, 'x' | 'y'>>;

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

type KeyboardKeyCode =
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'q'
  | 'e'
  | 'w'
  | 's'
  | 'a'
  | 'd'
  | 'й'
  | 'ц'
  | 'у'
  | 'ф'
  | 'ы'
  | 'в';

type KeyboardKeyAlias =
  | 'left'
  | 'right'
  | 'forward'
  | 'backward'
  | 'camera-left'
  | 'camera-right';

type ControlMode = 'continuous' | 'discrete';
