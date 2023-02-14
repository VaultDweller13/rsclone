import Controls from './Controls';
import GameMap from './GameMap';

export default class Player {
  private readonly CAMERA_CLOSENESS_RATE = 6;
  private readonly CENTRALIZER_VALUE = 0.5;
  private readonly CIRCLE = Math.PI * 2;
  private readonly CRAB_WALK_ANGLE = Math.PI / 2;
  private readonly DISCRETE_ROTATE_ANGLE_0 = 0;
  private readonly DISCRETE_ROTATE_ANGLE_90 = Math.PI / 2;
  private readonly DISCRETE_ROTATE_ANGLE_180 = Math.PI;
  private readonly DISCRETE_ROTATE_ANGLE_270 = 1.5 * Math.PI;
  private readonly DISCRETE_ROTATE_ANGLE_PER_FRAME = Math.PI / 90;
  private readonly DISCRETE_WALK_DISTANCE_PER_FRAME = 0.1;
  private readonly DISCRETE_WALK_MAX_STEPS = 7;
  private readonly ROTATE_SPEED_RATE = 0.7;
  private readonly WALK_SPEED_RATE = 2;

  private moveId = 0;
  private canMove = true;
  private targetDirection = 0;
  private walkSteps = 0;

  position: Coordinates;
  direction: number;

  private readonly discreteDirections = [
    this.DISCRETE_ROTATE_ANGLE_0,
    this.DISCRETE_ROTATE_ANGLE_90,
    this.DISCRETE_ROTATE_ANGLE_180,
    this.DISCRETE_ROTATE_ANGLE_270,
  ];

  constructor(initialPosition: Required<Position>, public controls: Controls) {
    if (controls.mode === 'discrete') {
      this.position = this.centralizePosition({
        x: initialPosition.x,
        y: initialPosition.y,
      });
      this.direction = 0;
    } else {
      this.position = initialPosition;
      this.direction = initialPosition.direction;
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
      this.walk(this.WALK_SPEED_RATE * frameTime, map);
    if (this.controls.states.backward)
      this.walk(-this.WALK_SPEED_RATE * frameTime, map);
    if (this.controls.states.left)
      this.walk(-this.WALK_SPEED_RATE * frameTime, map, true);
    if (this.controls.states.right)
      this.walk(this.WALK_SPEED_RATE * frameTime, map, true);
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
          callback = this.getWalkCallback(map, false, true);
          predicator = this.getWalkPredicator();
          break;
        }
        case 'left': {
          callback = this.getWalkCallback(map, true, true);
          predicator = this.getWalkPredicator();
          break;
        }
        case 'forward': {
          callback = this.getWalkCallback(map, false);
          predicator = this.getWalkPredicator();
          break;
        }
        case 'backward': {
          callback = this.getWalkCallback(map, true);
          predicator = this.getWalkPredicator();
          break;
        }
        default: {
          callback = null;
          predicator = null;
          break;
        }
      }

      if (callback && predicator) {
        this.executeDiscreteMotion(
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

  private walk = (distance: number, map: GameMap, isCrabWalk = false): void => {
    const dx =
      Math.cos(this.direction + (isCrabWalk ? this.CRAB_WALK_ANGLE : 0)) *
      distance;
    const dy =
      Math.sin(this.direction + (isCrabWalk ? this.CRAB_WALK_ANGLE : 0)) *
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

  private executeDiscreteMotion = (
    callback: () => void,
    predicator: () => boolean,
    stateKey: KeyboardKeyAlias
  ) => {
    const discreteMotion = () => {
      if (predicator()) {
        callback();
        this.moveId = requestAnimationFrame(discreteMotion);
      } else {
        this.direction = this.targetDirection;
        this.position = this.centralizePosition(this.position);
        this.walkSteps = 0;
        this.controls.states[stateKey] = false;
        cancelAnimationFrame(this.moveId);
        this.moveId = 0;
        this.canMove = true;
      }
    };

    if (this.controls.states[stateKey]) requestAnimationFrame(discreteMotion);
  };

  private getRotatePredicator = () => () =>
    Math.abs(this.targetDirection - this.direction) >=
    2 * this.DISCRETE_ROTATE_ANGLE_PER_FRAME;

  private getWalkPredicator = () => () => {
    this.walkSteps += 1;
    return this.walkSteps < this.DISCRETE_WALK_MAX_STEPS;
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

  private getWalkCallback =
    (map: GameMap, isNegative: boolean, isCrabWalk = false) =>
    () =>
      this.walk(
        (isNegative ? -1 : 1) * this.DISCRETE_WALK_DISTANCE_PER_FRAME,
        map,
        isCrabWalk
      );
}
