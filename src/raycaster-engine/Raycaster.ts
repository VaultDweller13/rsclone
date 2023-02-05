import GameMap from './GameMap';
import Player from './Player';
import Texture from './Texture';

export default class Raycaster {
  width: number;
  height: number;
  resolution: number;
  ctx: CanvasRenderingContext2D;
  lightRange: number;
  spacing: number;
  textureSmoothing = false;
  range = 14;
  fov = Math.PI / 3;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D, lightRange: number) {
    this.width = width;
    this.height = height;
    this.resolution = width;
    this.ctx = ctx;
    this.lightRange = lightRange;
    this.spacing = this.width / this.resolution;
  }

  private project(height: number, angle: number, distance: number) {
    const z = distance * Math.cos(angle);
    const wallHeight = this.height * height / z;
    const bottom = this.height / 2 * (1 + 1 / z);
    return {
      top: bottom - wallHeight,
      height: wallHeight
    };
  }

  private drawColumn(column: number, ray: Step[], angle: number, textures: Texture[]) {
    const left = Math.floor(column * this.spacing);
    const width = Math.ceil(this.spacing);
    let hit = 0;

    while (hit < ray.length && (ray[hit].cell as number) <= 0) hit += 1;

    let texture;
    let textureX = 0;

    if (hit < ray.length) {
      const step = ray[hit];
      
      texture = textures[step.cell as number > textures.length ? 0 : (step.cell as number) - 1];
      textureX = Math.floor(texture.width * (step.offset as number));
      const wall = this.project(1, angle, step.distance as number);

      this.ctx.globalAlpha = 1;
      this.ctx.drawImage(texture.img, textureX, 0, 1, texture.height, left, wall.top, width, wall.height);

      this.ctx.fillStyle = '#000000';
      this.ctx.globalAlpha = Math.max((step.distance as number) / this.lightRange, 0);

      if (this.textureSmoothing) this.ctx.fillRect(left, wall.top, width, wall.height)
      else this.ctx.fillRect(left || 0, wall.top || 0, width, wall.height + 1);
    }
  }

  private drawColumns(player: Player, map: GameMap) {
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = this.textureSmoothing;

    for (let col = 0; col < this.resolution; col += 1) {
      const angle = this.fov * (col / this.resolution - 0.5);
      const ray = map.cast(player.position, player.direction + angle, this.range);
      this.drawColumn(col, ray, angle, map.wallTextures);
    }
    this.ctx.restore();
  }

  render(player: Player, map: GameMap) {
    this.drawColumns(player, map);
  }
}
