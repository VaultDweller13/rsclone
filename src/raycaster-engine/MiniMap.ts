import GameMap from './GameMap';
import {
  MINI_MAP_EMPTY_BLOCK_COLOR,
  MINI_MAP_NOT_EMPTY_BLOCK_COLOR,
  MINI_MAP_NOT_PLAYER_COLOR,
} from './utils/constants';

export default class MiniMap {
  cellSize = 4;
  width = 0;
  height = 0;
  target = document.createElement('canvas');
  ctx = this.target.getContext('2d') as CanvasRenderingContext2D;

  constructor(map: GameMap) {
    this.load(map);
  }

  load(map: GameMap) {
    this.width = map.width;
    this.height = map.height;

    this.target.width = this.width * this.cellSize;
    this.target.height = this.height * this.cellSize;

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        if (
          map.walls[
            (this.height - y - 1) * map.width + (this.width - x - 1)
          ] === 0
        ) {
          this.ctx.fillStyle = MINI_MAP_EMPTY_BLOCK_COLOR;
          this.ctx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        } else {
          this.ctx.fillStyle = MINI_MAP_NOT_EMPTY_BLOCK_COLOR;
          this.ctx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, pos: Position, playerPos: Position) {
    const pX = (this.width - Math.floor(playerPos.x) - 1) * this.cellSize;
    const pY = (this.height - Math.floor(playerPos.y) - 1) * this.cellSize;
    ctx.drawImage(
      this.target,
      pos.x,
      pos.y,
      this.target.width,
      this.target.height
    );
    ctx.fillStyle = MINI_MAP_NOT_PLAYER_COLOR;
    ctx.fillRect(pos.x + pX, pos.y + pY, this.cellSize, this.cellSize);
  }
}
