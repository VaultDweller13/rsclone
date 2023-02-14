import GameMap from './GameMap';
import Player from './Player';

export default class Raycaster {
  private readonly RANGE_TO_CAST = 10;
  private readonly FOV = Math.PI / 3;
  private readonly PERSPECTIVE_RATIO = 0.75;
  private readonly SHADING_COLOR = 'black';

  constructor(
    public width: number,
    public height: number,
    public ctx: CanvasRenderingContext2D,
    public lightRange: number
  ) {}

  private project = (
    angle: number,
    distance: number
  ): { top: number; height: number } => {
    const z = this.PERSPECTIVE_RATIO * distance * Math.cos(angle);
    const wallHeight = this.height / z;
    const top = (this.height / 2) * (1 + 1 / z) - wallHeight;
    return {
      top,
      height: wallHeight,
    };
  };

  private drawClipping(
    column: number,
    ray: Required<RayOrigin>[],
    angle: number,
    map: GameMap
  ): void {
    const left = column;
    let hit = 0;

    while (hit < ray.length && ray[hit].cell <= 0) hit += 1;

    if (hit < ray.length) {
      const step = ray[hit];
      let textureAlias = step.cell;

      if (
        !Object.keys(map.textureMapping).find(
          (alias) => +alias === textureAlias
        ) ||
        (step.cell === 5 && step.axis !== step.onAxis) ||
        (step.cell === 6 && step.axis !== step.onAxis)
      ) {
        textureAlias = 1;
      }

      const texture =
        map.textures[map.textureMapping[textureAlias as TextureAlias]];

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

      this.ctx.fillStyle = this.SHADING_COLOR;
      this.ctx.globalAlpha = Math.max(step.distance / this.lightRange, 0);

      this.ctx.fillRect(left, wall.top, 1, wall.height);
    }
  }

  private drawTexture = (player: Player, map: GameMap): void => {
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = true;

    for (let col = 0; col < this.width; col += 1) {
      const angle = this.FOV * (col / this.width - 0.5);
      const ray = map.cast(
        player.position,
        player.direction + angle,
        this.RANGE_TO_CAST
      );
      this.drawClipping(col, ray, angle, map);
    }
    this.ctx.restore();
  };

  render = (player: Player, map: GameMap): void => {
    this.drawTexture(player, map);
  };
}
