import Controls from './Controls';
import GameMap from './GameMap';

export default class Camera {
  private readonly CAMERA_CLOSENESS_RATE = 6;
  private readonly CENTRALIZER_VALUE = 0.5;
  private readonly CIRCLE = Math.PI * 2;
  private readonly STRAFE_MOVE_ANGLE = Math.PI / 2;
  private readonly DISCRETE_ROTATE_ANGLE_0 = 0;
  private readonly DISCRETE_ROTATE_ANGLE_90 = Math.PI / 2;
  private readonly DISCRETE_ROTATE_ANGLE_180 = Math.PI;
  private readonly DISCRETE_ROTATE_ANGLE_270 = 1.5 * Math.PI;
  private readonly DISCRETE_ROTATE_ANGLE_PER_FRAME = Math.PI / 90;
  private readonly DISCRETE_MOVE_DISTANCE_PER_FRAME = 0.1;
  private readonly DISCRETE_MOVE_MAX_STEPS = 7;
  private readonly ROTATE_SPEED_RATE = 0.7;
  private readonly MOVE_SPEED_RATE = 2;

  private moveId = 0;
  private canMove = true;
  private targetDirection = 0;
  private moveSteps = 0;

  position: Coordinates;
  direction: number;

  private readonly discreteDirections = [
    this.DISCRETE_ROTATE_ANGLE_0,
    this.DISCRETE_ROTATE_ANGLE_90,
    this.DISCRETE_ROTATE_ANGLE_180,
    this.DISCRETE_ROTATE_ANGLE_270,
  ];

  constructor(startPosition: Required<Position>, public controls: Controls) {
    if (controls.mode === 'discrete') {
      this.position = this.centralizePosition({
        x: startPosition.x,
        y: startPosition.y,
      });
      this.direction = 0;
    } else {
      this.position = startPosition;
      this.direction = startPosition.direction;
    }
  }

  update = (map: GameMap, frameTime: number): void => {
    if (this.controls.mode === 'discrete' && this.canMove) {
      this.updateOnDiscreteMode(map);
    } else this.updateOnContinuesMode(map, frameTime);
  };

  private updateOnContinuesMode = (map: GameMap, frameTime: number) => {
    if (this.controls.states['camera-left'])
      this.rotate(-Math.PI * frameTime * this.ROTATE_SPEED_RATE);
    if (this.controls.states['camera-right'])
      this.rotate(Math.PI * frameTime * this.ROTATE_SPEED_RATE);
    if (this.controls.states.forward)
      this.move(this.MOVE_SPEED_RATE * frameTime, map);
    if (this.controls.states.backward)
      this.move(-this.MOVE_SPEED_RATE * frameTime, map);
    if (this.controls.states.left)
      this.move(-this.MOVE_SPEED_RATE * frameTime, map, true);
    if (this.controls.states.right)
      this.move(this.MOVE_SPEED_RATE * frameTime, map, true);
  };

  private updateOnDiscreteMode = (map: GameMap): void => {
    const stateKey = Object.keys(this.controls.states).find(
      (key) => this.controls.states[key as KeyboardKeyAlias]
    );
    if (stateKey) {
      this.canMove = false;

      let callback: (() => void) | null;
      let predicator: (() => boolean) | null;

      switch (stateKey) {
        case 'camera-left': {
          callback = this.getRotateCallback(true);
          this.defineTargetDirection(true);
          predicator = this.getRotatePredicator();
          break;
        }
        case 'camera-right': {
          callback = this.getRotateCallback(false);
          this.defineTargetDirection(false);
          predicator = this.getRotatePredicator();
          break;
        }
        case 'right': {
          callback = this.getMoveCallback(map, false, true);
          predicator = this.getMovePredicator();
          break;
        }
        case 'left': {
          callback = this.getMoveCallback(map, true, true);
          predicator = this.getMovePredicator();
          break;
        }
        case 'forward': {
          callback = this.getMoveCallback(map, false);
          predicator = this.getMovePredicator();
          break;
        }
        case 'backward': {
          callback = this.getMoveCallback(map, true);
          predicator = this.getMovePredicator();
          break;
        }
        default: {
          callback = null;
          predicator = null;
          break;
        }
      }

      if (callback && predicator) {
        this.executeDiscreteMovement(
          callback,
          predicator,
          stateKey as KeyboardKeyAlias
        );
      }
    }
  };

  private rotate = (angle: number): void => {
    this.direction = (this.direction + angle + this.CIRCLE) % this.CIRCLE;
  };

  private move = (distance: number, map: GameMap, isStrafe = false): void => {
    const dx =
      Math.cos(this.direction + (isStrafe ? this.STRAFE_MOVE_ANGLE : 0)) *
      distance;
    const dy =
      Math.sin(this.direction + (isStrafe ? this.STRAFE_MOVE_ANGLE : 0)) *
      distance;

    if (
      map.get(
        this.position.x + dx * this.CAMERA_CLOSENESS_RATE,
        this.position.y
      ) <= 0
    )
      this.position.x += dx;

    if (
      map.get(
        this.position.x,
        this.position.y + dy * this.CAMERA_CLOSENESS_RATE
      ) <= 0
    )
      this.position.y += dy;
  };

  private executeDiscreteMovement = (
    callback: () => void,
    predicator: () => boolean,
    stateKey: KeyboardKeyAlias
  ) => {
    const discreteMovement = () => {
      if (predicator()) {
        callback();
        this.moveId = requestAnimationFrame(discreteMovement);
      } else {
        this.direction = this.targetDirection;
        this.position = this.centralizePosition(this.position);
        this.moveSteps = 0;
        this.controls.states[stateKey] = false;
        cancelAnimationFrame(this.moveId);
        this.moveId = 0;
        this.canMove = true;
      }
    };

    if (this.controls.states[stateKey]) requestAnimationFrame(discreteMovement);
  };

  private getRotatePredicator = () => () =>
    Math.abs(this.targetDirection - this.direction) >=
    2 * this.DISCRETE_ROTATE_ANGLE_PER_FRAME;

  private getMovePredicator = () => () => {
    this.moveSteps += 1;
    return this.moveSteps < this.DISCRETE_MOVE_MAX_STEPS;
  };

  private getRotateCallback = (isCounterclockwise: boolean) => () =>
    this.rotate(
      (isCounterclockwise ? -1 : 1) * this.DISCRETE_ROTATE_ANGLE_PER_FRAME
    );

  private defineTargetDirection = (isCounterclockwise: boolean) => {
    const index = this.discreteDirections.findIndex(
      (angle: number) => this.direction === angle
    );
    this.targetDirection =
      this.discreteDirections[
        ((isCounterclockwise ? index - 1 : index + 1) +
          this.discreteDirections.length) %
          this.discreteDirections.length
      ];
  };

  private centralizePosition = (position: Coordinates): Coordinates => ({
    x: Math.floor(position.x) + this.CENTRALIZER_VALUE,
    y: Math.floor(position.y) + this.CENTRALIZER_VALUE,
  });

  private getMoveCallback =
    (map: GameMap, isNegative: boolean, isStrafe = false) =>
    () =>
      this.move(
        (isNegative ? -1 : 1) * this.DISCRETE_MOVE_DISTANCE_PER_FRAME,
        map,
        isStrafe
      );
}
