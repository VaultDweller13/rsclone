import GameMap from './GameMap';
import Player from './Player';
import Texture from './Texture';
import { SHADING_COLOR } from './utils/constants';

export default class Raycaster {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  lightRange: number;
  range = 14;
  fov = Math.PI / 3;

  constructor(
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    lightRange: number
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
    rays: Step[],
    angle: number,
    textures: Texture[]
  ): void {
    const left = column;
    let hit = 0;

    while (hit < rays.length && (rays[hit].cell as number) <= 0) hit += 1;

    let texture;
    let textureX;

    if (hit < rays.length) {
      const step = rays[hit];

      texture =
        textures[
          (step.cell as number) > textures.length
            ? 0
            : (step.cell as number) - 1
        ];
      textureX = Math.floor(texture.width * (step.offset as number));
      const wall = this.project(angle, step.distance as number);

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
      this.ctx.globalAlpha = Math.max(
        (step.distance as number) / this.lightRange,
        0
      );

      this.ctx.fillRect(left, wall.top, 1, wall.height);
    }
  }

  private drawWall = (player: Player, map: GameMap): void => {
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = true;

    for (let col = 0; col < this.width; col += 1) {
      const angle = this.fov * (col / this.width - 0.5);
      const rays = map.cast(
        player.position,
        player.direction + angle,
        this.range
      );
      this.drawWallSlice(col, rays, angle, map.wallTextures);
    }
    this.ctx.restore();
  };

  render = (player: Player, map: GameMap): void => {
    this.drawWall(player, map);
  };
}
