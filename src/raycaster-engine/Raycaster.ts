import GameMap from './GameMap';
import Player from './Player';
import Texture from './Texture';
import { FOV, RANGE_TO_CAST, SHADING_COLOR } from './utils/constants';

export default class Raycaster {
  private readonly range = RANGE_TO_CAST;
  private readonly fov = FOV;

  constructor(
    public width: number,
    public height: number,
    public ctx: CanvasRenderingContext2D,
    public lightRange: number
  ) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.lightRange = lightRange;
  }

  private project = (
    angle: number,
    distance: number
  ): { top: number; height: number } => {
    const z = distance * Math.cos(angle);
    const wallHeight = this.height / z;
    const top = (this.height / 2) * (1 + 1 / z) - wallHeight;
    return {
      top,
      height: wallHeight,
    };
  };

  private drawWallSlice(
    column: number,
    ray: Required<RayOrigin>[],
    angle: number,
    textures: Texture[]
  ): void {
    const left = column;
    let hit = 0;

    while (hit < ray.length && ray[hit].cell <= 0) hit += 1;

    if (hit < ray.length) {
      const step = ray[hit];

      const texture = textures[step.cell > textures.length ? 0 : step.cell - 1];
      const textureX = Math.floor(texture.width * step.offset);
      const wall = this.project(angle, step.distance);

      this.ctx.globalAlpha = 1;
      this.ctx.drawImage(
        texture.img,
        textureX,
        0,
        1,
        texture.height,
        left,
        wall.top,
        1,
        wall.height
      );

      this.ctx.fillStyle = SHADING_COLOR;
      this.ctx.globalAlpha = Math.max(step.distance / this.lightRange, 0);

      this.ctx.fillRect(left, wall.top, 1, wall.height);
    }
  }

  private drawWall = (player: Player, map: GameMap): void => {
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = true;

    for (let col = 0; col < this.width; col += 1) {
      const angle = this.fov * (col / this.width - 0.5);
      const ray = map.cast(
        player.position,
        player.direction + angle,
        this.range
      );
      this.drawWallSlice(col, ray, angle, map.wallTextures);
    }
    this.ctx.restore();
  };

  render = (player: Player, map: GameMap): void => {
    this.drawWall(player, map);
  };
}
