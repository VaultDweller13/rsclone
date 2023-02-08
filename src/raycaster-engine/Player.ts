import GameMap from './GameMap';
import { CIRCLE } from './utils/constants';

export default class Player {
  position: Position;
  direction: number;

  constructor(initialPosition: Position) {
    const { x, y } = initialPosition;
    this.position = { x, y };
    this.direction = initialPosition.direction as number;
  }

  private rotate = (angle: number): void => {
    this.direction = (this.direction + angle + CIRCLE) % CIRCLE;
  };

  private walk = (distance: number, map: GameMap): void => {
    const dx = Math.cos(this.direction) * distance;
    const dy = Math.sin(this.direction) * distance;
    if (map.get(this.position.x + dx, this.position.y) <= 0)
      this.position.x += dx;
    if (map.get(this.position.x, this.position.y + dy) <= 0)
      this.position.y += dy;
  };

  update = (controls: States, map: GameMap, frameTime: number): void => {
    if (controls.left) this.rotate((-Math.PI * frameTime) / 2);
    if (controls.right) this.rotate((Math.PI * frameTime) / 2);
    if (controls.forward) this.walk(2 * frameTime, map);
    if (controls.backward) this.walk(-2 * frameTime, map);
  };
}