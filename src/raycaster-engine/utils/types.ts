type Position = {
  x: number;
  y: number;
  direction?: number;
};

type States = {
  [key: string]: boolean;
};

type Step = {
  x?: number;
  y?: number;
  depth?: number;
  cell?: number;
  distance?: number;
  offset?: number;
};

type KeyboardKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';

type KeyboardKeyAlias = 'left' | 'right' | 'forward' | 'backward';
