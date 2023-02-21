import GameMap from './GameMap';
import { Coordinates } from './utils/types';

export default class MiniMap {
  private readonly MINI_MAP_CELL_WIDTH = 4;
  private readonly MINI_MAP_EMPTY_BLOCK_COLOR = 'white';
  private readonly MINI_MAP_NOT_EMPTY_BLOCK_COLOR = 'black';
  private readonly MINI_MAP_PLAYER_COLOR = 'red';
  private readonly MINI_MAP_DOOR_COLOR = 'green';
  private readonly MINI_MAP_ENTRY_COLOR = 'yellow';
  private readonly target = document.createElement('canvas');
  private readonly ctx = this.target.getContext('2d') as CanvasRenderingContext2D;

  private width: number;
  private height: number;
  readonly layoutPosition = { x: 5, y: 5 };

  constructor(map: GameMap) {
    this.width = map.width;
    this.height = map.height;
    this.load(map);
  }

  load = (map: GameMap): void => {
    this.target.width = this.width * this.MINI_MAP_CELL_WIDTH;
    this.target.height = this.height * this.MINI_MAP_CELL_WIDTH;

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const mapValue = map.mapArr[(this.height - y - 1) * map.width + (this.width - x - 1)];
        if (mapValue === 0) this.drawBlock(x, y, this.MINI_MAP_EMPTY_BLOCK_COLOR);
        else if (mapValue === 4) this.drawBlock(x, y, this.MINI_MAP_DOOR_COLOR);
        else if (mapValue === 2) this.drawBlock(x, y, this.MINI_MAP_ENTRY_COLOR);
        else this.drawBlock(x, y, this.MINI_MAP_NOT_EMPTY_BLOCK_COLOR);
      }
    }
  };

  drawBlock = (x: number, y: number, color: string) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.MINI_MAP_CELL_WIDTH,
      y * this.MINI_MAP_CELL_WIDTH,
      this.MINI_MAP_CELL_WIDTH,
      this.MINI_MAP_CELL_WIDTH
    );
  };

  render = (ctx: CanvasRenderingContext2D, playerPos: Coordinates): void => {
    const pX = (this.width - Math.floor(playerPos.x) - 1) * this.MINI_MAP_CELL_WIDTH;
    const pY = (this.height - Math.floor(playerPos.y) - 1) * this.MINI_MAP_CELL_WIDTH;
    ctx.drawImage(this.target, this.layoutPosition.x, this.layoutPosition.y, this.target.width, this.target.height);
    ctx.fillStyle = this.MINI_MAP_PLAYER_COLOR;
    ctx.fillRect(
      this.layoutPosition.x + pX,
      this.layoutPosition.y + pY,
      this.MINI_MAP_CELL_WIDTH,
      this.MINI_MAP_CELL_WIDTH
    );
  };
}
