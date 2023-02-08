import GameMap from './GameMap';
import {
  CIRCLE,
  FOV,
  ROTATE_SPEED_RATE,
  WALK_SPEED_RATE,
} from './utils/constants';

export default class Player {
  position: Pick<Position, 'x' | 'y'>;
  direction: number;

  constructor(initialPosition: Position) {
    this.position = initialPosition;
    this.direction = initialPosition.direction ?? FOV;
  }

  private rotate = (angle: number): void => {
    this.direction = (this.direction + angle + CIRCLE) % CIRCLE;
  };

  private walk = (distance: number, map: GameMap): void => {
    const dx = Math.cos(this.direction) * distance;
    const dy = Math.sin(this.direction) * distance;
    console.log(dx, dy);
    if (map.get(this.position.x + dx, this.position.y) <= 0)
      this.position.x += dx;
    if (map.get(this.position.x, this.position.y + dy) <= 0)
      this.position.y += dy;
  };

  private shift(distance: number, map: GameMap): void {
    const dx = Math.cos(this.direction + Math.PI / 2) * distance;
    const dy = Math.sin(this.direction + Math.PI / 2) * distance;
    if (map.get(this.position.x + dx, this.position.y) <= 0)
      this.position.x += dx;
    if (map.get(this.position.x, this.position.y + dy) <= 0)
      this.position.y += dy;
  }

  update = (
    controls: Record<KeyboardKeyAlias, boolean>,
    map: GameMap,
    frameTime: number
  ): void => {
    console.log(this.direction);

    if (controls['camera-left'])
      this.rotate(-Math.PI * frameTime * ROTATE_SPEED_RATE);
    if (controls['camera-right'])
      this.rotate(Math.PI * frameTime * ROTATE_SPEED_RATE);
    if (controls.forward) this.walk(WALK_SPEED_RATE * frameTime, map);
    if (controls.backward) this.walk(-WALK_SPEED_RATE * frameTime, map);
    if (controls.left) this.shift(-WALK_SPEED_RATE * frameTime, map);
    if (controls.right) this.shift(WALK_SPEED_RATE * frameTime, map);
  };
}
