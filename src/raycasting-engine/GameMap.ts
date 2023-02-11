import Texture from './Texture';

export default class GameMap {
  readonly width: number;
  readonly height: number;

  constructor(
    size: number,
    public readonly walls: number[],
    public readonly wallTextures: Texture[]
  ) {
    this.width = size;
    this.height = size;
  }

  get = (x: number, y: number): number => {
    const column = Math.floor(x);
    const row = Math.floor(y);
    if (column < 0 || column >= this.width || row < 0 || row >= this.height)
      return -1;
    return this.walls[row * this.width + column];
  };

  cast = (
    point: Position,
    angle: number,
    range: number
  ): Required<RayOrigin>[] => {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return this.getCollisionPoints(
      {
        x: point.x,
        y: point.y,
        cell: 0,
        distance: 0,
        offset: 0,
        depth: 0,
      },
      sin,
      cos,
      range
    );
  };

  private getCollisionPoints = (
    origin: Required<Ray>,
    sin: number,
    cos: number,
    range: number
  ): Required<Ray>[] => {
    const stepX: Required<RayStep> = this.step(sin, cos, origin.x, origin.y);

    const stepY: Required<RayStep> = this.step(
      cos,
      sin,
      origin.y,
      origin.x,
      true
    );

    const nextRay =
      stepX.depth < stepY.depth
        ? this.inspect(stepX, 1, 0, origin.distance, stepX.y, cos, sin)
        : this.inspect(stepY, 0, 1, origin.distance, stepY.x, cos, sin);

    if (nextRay.distance > range) return [origin];
    return [origin].concat(this.getCollisionPoints(nextRay, sin, cos, range));
  };

  private step = (
    start: number,
    end: number,
    x: number,
    y: number,
    inverted?: boolean
  ): Required<RayStep> => {
    const dx = end > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    const dy = dx * (start / end);

    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      depth: dx * dx + dy * dy,
    };
  };

  private inspect = (
    step: Required<RayStep>,
    shiftX: number,
    shiftY: number,
    nextRayDistance: number,
    stepOffset: number,
    cos: number,
    sin: number
  ): Required<Ray> => {
    const dx = cos < 0 ? shiftX : 0;
    const dy = sin < 0 ? shiftY : 0;
    const index =
      Math.floor(step.y - dy) * this.width + Math.floor(step.x - dx);
    const cell =
      index < 0 || index >= this.walls.length ? -1 : this.walls[index];
    const distance = nextRayDistance + Math.sqrt(step.depth);

    const offset = stepOffset - Math.floor(stepOffset);
    return { ...step, cell, distance, offset };
  };
}
