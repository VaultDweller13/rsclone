import GameMap from './GameMap';
import Player from './Camera';
import { RayOrigin, TextureAlias } from './utils/types';

export default class Raycaster {
  private readonly RANGE_TO_CAST = 10;
  private readonly FOV = Math.PI / 3;
  private readonly PERSPECTIVE_RATIO = 0.75;
  private readonly SHADING_COLOR = 'black';

  constructor(public ctx: CanvasRenderingContext2D, public lightRange: number) {}

  render = (player: Player, map: GameMap): void => {
    this.drawTexture(player, map);
  };

  private drawTexture = (player: Player, map: GameMap): void => {
    const { width } = this.ctx.canvas;
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = true;

    for (let col = 0; col < width; col += 1) {
      const angle = this.FOV * (col / width - 0.5);
      const ray = map.cast(player.position, player.direction + angle, this.RANGE_TO_CAST);
      this.drawTextureStripe(col, ray, angle, map /* , player.direction + angle */);
    }
    this.ctx.restore();
  };

  private drawTextureStripe(
    column: number,
    ray: Required<RayOrigin>[],
    angle: number,
    map: GameMap
    // absoluteAngle: number
  ): void {
    const left = column;
    let hit = 0;

    while (hit < ray.length && ray[hit].cell <= 0) hit += 1;

    if (hit < ray.length) {
      const step = ray[hit];
      let textureAlias = step.cell;
      // if (step.cell === 5 && absoluteAngle < 1.5 * Math.PI && absoluteAngle > Math.PI / 2) textureAlias = 6;
      // if (step.cell === 6 && absoluteAngle > 0 && absoluteAngle < Math.PI) textureAlias = 5;

      if (
        !Object.keys(map.textureMapping).find((alias) => +alias === textureAlias) ||
        (step.cell === 5 && step.axis !== step.onAxis) ||
        (step.cell === 6 && step.axis !== step.onAxis)
      ) {
        textureAlias = 1;
      }

      const texture = map.textures[map.textureMapping[textureAlias as TextureAlias]];

      const textureX = Math.floor(texture.width * step.offset);
      const wall = this.project(angle, step.distance);

      this.ctx.globalAlpha = 1;
      this.ctx.drawImage(texture.img, textureX, 0, 1, texture.height, left, wall.top, 1, wall.height);

      this.ctx.fillStyle = this.SHADING_COLOR;
      this.ctx.globalAlpha = Math.max(step.distance / this.lightRange, 0);

      this.ctx.fillRect(left, wall.top, 1, wall.height);
    }
  }

  private project = (angle: number, distance: number): { top: number; height: number } => {
    const { height } = this.ctx.canvas;
    const z = this.PERSPECTIVE_RATIO * distance * Math.cos(angle);
    const wallHeight = height / z;
    const top = (height / 2) * (1 + 1 / z) - wallHeight;
    return {
      top,
      height: wallHeight,
    };
  };
}
