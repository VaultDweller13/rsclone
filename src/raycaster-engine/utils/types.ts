type Position = {
  x: number;
  y: number;
  direction?: number;
}

type KeyboardKeys = {
  [key: string]: string;
}

type States = {
  [key: string]: boolean
}

type Step = {
  x?: number;
  y?: number;
  depth?: number;
  cell?: number;
  distance?: number;
  offset?: number;
}