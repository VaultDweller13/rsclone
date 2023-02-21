import Texture from './Texture';
import { Axis, Position, Ray, RayOrigin, RayStep, TextureAlias, TextureName } from './utils/types';

export default class GameMap {
  readonly textureMapping: Record<TextureAlias, TextureName> = {
    1: 'wall',
    2: 'entry',
    3: 'exit',
    4: 'closedDoor',
    5: 'openDoorVertical',
    6: 'openDoorHorizontal',
  };
  readonly width: number;
  readonly height: number;

  constructor(public readonly mapArr: number[], public readonly textures: Record<TextureName, Texture>) {
    const size = Math.sqrt(mapArr.length);
    this.width = size;
    this.height = size;
  }

  getMapValue = (x: number, y: number): number => {
    const { column, row } = this.getRowColumn(x, y);
    if (column < 0 || column >= this.width || row < 0 || row >= this.height) return -1;
    return this.mapArr[this.getIndex({ column, row })];
  };

  private getIndex = ({ column, row }: { column: number; row: number }): number => row * this.width + column;

  private getRowColumn = (x: number, y: number): { column: number; row: number } => ({
    column: Math.floor(x),
    row: Math.floor(y),
  });

  cast = (point: Position, angle: number, range: number): Required<RayOrigin>[] => {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return this.getCollisionPoints(
      {
        x: point.x,
        y: point.y,
        cell: 0,
        distance: 0,
        offset: 0,
        deltaDistance: 0,
        axis: 'both',
        onAxis: 'both',
      },
      sin,
      cos,
      range
    );
  };

  private getCollisionPoints = (origin: Required<Ray>, sin: number, cos: number, range: number): Required<Ray>[] => {
    const stepX: Required<RayStep> = this.step(sin, cos, origin.x, origin.y);

    const stepY: Required<RayStep> = this.step(cos, sin, origin.y, origin.x, true);

    const nextRay =
      stepX.deltaDistance < stepY.deltaDistance
        ? this.inspect(stepX, 1, 0, origin.distance, stepX.y, cos, sin)
        : this.inspect(stepY, 0, 1, origin.distance, stepY.x, cos, sin);

    if (nextRay.distance > range) return [origin];
    return [origin].concat(this.getCollisionPoints(nextRay, sin, cos, range));
  };

  private step = (start: number, end: number, x: number, y: number, inverted?: boolean): Required<RayStep> => {
    const dx = end > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    const dy = dx * (start / end);

    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      deltaDistance: dx * dx + dy * dy,
      axis: inverted ? 'y' : 'x',
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
    const index = Math.floor(step.y - dy) * this.width + Math.floor(step.x - dx);
    const cell = index < 0 || index >= this.mapArr.length ? -1 : this.mapArr[index];

    let onAxis: Axis = 'both';
    if (cell === 5) {
      onAxis = 'y';
    }
    if (cell === 6) {
      onAxis = 'x';
    }
    const distance = nextRayDistance + Math.sqrt(step.deltaDistance);

    const offset = stepOffset - Math.floor(stepOffset);
    return { ...step, cell, distance, offset, onAxis };
  };

  changeMapValue = (x: number, y: number, newValue: number) =>
    this.mapArr.splice(this.getIndex(this.getRowColumn(x, y)), 1, newValue);
}
