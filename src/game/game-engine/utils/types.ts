type Position = {
  x: number;
  y: number;
  direction?: number;
};

type Coordinates = Required<Pick<Position, 'x' | 'y'>>;

type Axis = 'x' | 'y' | 'both';

type Ray = {
  x?: number;
  y?: number;
  deltaDistance?: number;
  cell?: number;
  distance?: number;
  offset?: number;
  axis?: Axis;
  onAxis?: Axis;
};

type RayStep = Pick<Ray, 'x' | 'y' | 'deltaDistance' | 'axis'>;
type RayOrigin = Pick<Ray, 'offset' | 'distance' | 'cell' | 'axis' | 'onAxis'>;

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

type KeyboardKeyAlias = 'left' | 'right' | 'forward' | 'backward' | 'camera-left' | 'camera-right';

type ControlMode = 'continuous' | 'discrete';

type TextureName = 'wall' | 'entry' | 'exit' | 'closedDoor' | 'openDoorVertical' | 'openDoorHorizontal';

type TextureAlias = 1 | 2 | 3 | 4 | 5 | 6;
