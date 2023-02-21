import Controls from './Controls';
import GameMap from './GameMap';
import { Coordinates, KeyboardKeyAlias, Position } from './utils/types';

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
  private readonly DISTANCE_TO_BLOCK = 0.7;

  private moveId = 0;
  private canMove = true;
  private targetDirection = 0;
  private moveSteps = 0;
  private isPossibleToMove = true;
  private stateKey: null | KeyboardKeyAlias = null;
  private isMoving = false;
  isMoved = false;
  inFront = 0;

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
    if (this.controls.states['camera-left']) this.rotate(-Math.PI * frameTime * this.ROTATE_SPEED_RATE, map);
    if (this.controls.states['camera-right']) this.rotate(Math.PI * frameTime * this.ROTATE_SPEED_RATE, map);
    if (this.controls.states.forward) this.move(this.MOVE_SPEED_RATE * frameTime, map);
    if (this.controls.states.backward) this.move(-this.MOVE_SPEED_RATE * frameTime, map);
    if (this.controls.states.left) this.move(-this.MOVE_SPEED_RATE * frameTime, map, true);
    if (this.controls.states.right) this.move(this.MOVE_SPEED_RATE * frameTime, map, true);
  };

  private updateOnDiscreteMode = (map: GameMap): void => {
    this.stateKey =
      (Object.keys(this.controls.states).find(
        (key) => this.controls.states[key as KeyboardKeyAlias]
      ) as KeyboardKeyAlias) ?? null;
    if (this.stateKey) {
      this.canMove = false;

      let callback: (() => void) | null = null;
      let predicator: (() => boolean) | null = null;

      switch (this.stateKey) {
        case 'camera-left':
          callback = this.getRotateCallback(true, map);
          this.defineTargetDirection(true);
          predicator = this.getRotatePredicator();
          break;
        case 'camera-right':
          callback = this.getRotateCallback(false, map);
          this.defineTargetDirection(false);
          predicator = this.getRotatePredicator();
          break;
        case 'right':
          callback = this.getMoveCallback(map, false, true);
          predicator = this.getMovePredicator();
          break;
        case 'left':
          callback = this.getMoveCallback(map, true, true);
          predicator = this.getMovePredicator();
          break;
        case 'forward':
          callback = this.getMoveCallback(map, false);
          predicator = this.getMovePredicator();
          break;
        case 'backward':
          callback = this.getMoveCallback(map, true);
          predicator = this.getMovePredicator();
          break;
        default:
          this.canMove = true;
      }

      if (callback && predicator) this.executeDiscreteMovement(callback, predicator, map);
    }
  };

  private rotate = (angle: number, map: GameMap): void => {
    this.isMoving = true;
    this.direction = (this.direction + angle + this.CIRCLE) % this.CIRCLE;
    this.inFront = this.getBlock(this.DISTANCE_TO_BLOCK, map).possibleBlock;
  };

  private move = (distance: number, map: GameMap, isStrafe = false): void => {
    const { possibleBlock } = this.getBlock(distance, map, isStrafe);

    if (possibleBlock === 0) {
      this.isMoving = true;
      const dx = Math.cos(this.direction + (isStrafe ? this.STRAFE_MOVE_ANGLE : 0)) * distance;
      const dy = Math.sin(this.direction + (isStrafe ? this.STRAFE_MOVE_ANGLE : 0)) * distance;

      if (map.getMapValue(this.position.x + dx * this.CAMERA_CLOSENESS_RATE, this.position.y) <= 0)
        this.position.x += dx;
      if (map.getMapValue(this.position.x, this.position.y + dy * this.CAMERA_CLOSENESS_RATE) <= 0)
        this.position.y += dy;
    } else if (possibleBlock === 4) {
      this.isPossibleToMove = false;
      this.openDoor(map);
    } else {
      this.isPossibleToMove = false;
    }
  };

  private openDoor = (map: GameMap): void => {
    const dx = Math.cos(this.direction) * this.DISTANCE_TO_BLOCK;
    const dy = Math.sin(this.direction) * this.DISTANCE_TO_BLOCK;

    if (map.getMapValue(this.position.x + dx, this.position.y) === 4)
      map.changeMapValue(this.position.x + dx, this.position.y, 0);

    if (map.getMapValue(this.position.x, this.position.y + dy) === 4)
      map.changeMapValue(this.position.x, this.position.y + dy, 0);
  };

  private getBlock = (distance: number, map: GameMap, isStrafe = false) => {
    const dx =
      Math.cos(this.direction + (isStrafe ? this.STRAFE_MOVE_ANGLE : 0)) *
      this.DISTANCE_TO_BLOCK *
      (distance / Math.abs(distance));
    const dy =
      Math.sin(this.direction + (isStrafe ? this.STRAFE_MOVE_ANGLE : 0)) *
      this.DISTANCE_TO_BLOCK *
      (distance / Math.abs(distance));

    const onX = map.getMapValue(this.position.x + dx, this.position.y);
    const onY = map.getMapValue(this.position.x, this.position.y + dy);

    return onX > onY
      ? { possibleBlock: onX, x: this.position.x + dx, y: this.position.y }
      : { possibleBlock: onY, x: this.position.x, y: this.position.y + dy };
  };

  private executeDiscreteMovement = (callback: () => void, predicator: () => boolean, map: GameMap) => {
    const discreteMovement = () => {
      if (predicator()) {
        callback();
        this.moveId = requestAnimationFrame(discreteMovement);
      } else {
        this.direction = this.targetDirection;
        this.position = this.centralizePosition(this.position);
        cancelAnimationFrame(this.moveId);
        this.finishMovement();
        this.inFront = this.getBlock(this.DISTANCE_TO_BLOCK, map).possibleBlock;
      }
    };

    if (this.stateKey && this.controls.states[this.stateKey]) requestAnimationFrame(discreteMovement);
  };

  private finishMovement = () => {
    if (this.stateKey) this.controls.states[this.stateKey] = false;
    this.moveSteps = 0;
    this.canMove = true;
    this.moveId = 0;
    this.stateKey = null;
    this.isPossibleToMove = true;
    if (this.isMoving) this.changeMoveState(true);
    this.isMoving = false;
  };

  changeMoveState = (isMoved: boolean) => {
    this.isMoved = isMoved;
  };

  private getRotatePredicator = () => () =>
    Math.abs(this.targetDirection - this.direction) >= 2 * this.DISCRETE_ROTATE_ANGLE_PER_FRAME;

  private getMovePredicator = () => () => {
    this.moveSteps += 1;
    return this.moveSteps < this.DISCRETE_MOVE_MAX_STEPS && this.isPossibleToMove;
  };

  private defineTargetDirection = (isCounterclockwise: boolean) => {
    const index = this.discreteDirections.findIndex((angle: number) => this.direction === angle);
    this.targetDirection =
      this.discreteDirections[
        ((isCounterclockwise ? index - 1 : index + 1) + this.discreteDirections.length) % this.discreteDirections.length
      ];
  };

  private centralizePosition = (position: Coordinates): Coordinates => ({
    x: Math.floor(position.x) + this.CENTRALIZER_VALUE,
    y: Math.floor(position.y) + this.CENTRALIZER_VALUE,
  });

  private getRotateCallback = (isCounterclockwise: boolean, map: GameMap) => () =>
    this.rotate((isCounterclockwise ? -1 : 1) * this.DISCRETE_ROTATE_ANGLE_PER_FRAME, map);

  private getMoveCallback =
    (map: GameMap, isNegative: boolean, isStrafe = false) =>
    () =>
      this.move((isNegative ? -1 : 1) * this.DISCRETE_MOVE_DISTANCE_PER_FRAME, map, isStrafe);
}
