import Monster from '../../model/characters/monster';

export default class Battle {
  private readonly CORNER_RADIUS = 5;
  private readonly BACKGROUND_COLOR = 'black';
  private readonly MARGIN = 10;
  private readonly PADDING = 5;
  private readonly STROKE_COLOR = 'white';
  private readonly STROKE_WIDTH = 3;
  private readonly FONT = '30px sans-serif';
  private readonly FONT_COLOR = 'white';
  private readonly DEAD_X_COLOR = 'red';

  private readonly WIDTH: number;
  private readonly HEIGHT: number;
  private readonly TARGET_SIZE: number;
  private readonly INFO_BOX_WIDTH: number;
  private readonly INFO_BOX_HEIGHT: number;
  private readonly REST_SIZE: number;

  target: {
    enemy: Monster;
    amount: number;
    isDead: boolean;
  } | null = null;
  enemies: {
    enemy: Monster;
    amount: number;
    isDead: boolean;
  }[] = [];

  constructor(public ctx: CanvasRenderingContext2D) {
    this.WIDTH = this.ctx.canvas.width;
    this.HEIGHT = this.ctx.canvas.height;
    this.TARGET_SIZE = (this.WIDTH - this.MARGIN * 3) * 0.35;
    this.INFO_BOX_WIDTH = (this.WIDTH - this.MARGIN * 3) * 0.65;
    this.INFO_BOX_HEIGHT = (this.TARGET_SIZE - 10) / 2;
    this.REST_SIZE = this.WIDTH * 0.15;
  }

  defineEnemies = (
    enemies: {
      enemy: Monster;
      amount: number;
      isDead: boolean;
    }[]
  ) => {
    this.enemies = enemies;
    [this.target] = this.enemies;
  };

  render = () => {
    this.ctx.fillStyle = this.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.drawTarget();
    this.drawInfoBox();
    this.drawRest();
  };

  private drawTarget = () => {
    if (!this.target) return;

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.STROKE_COLOR;
    this.ctx.lineWidth = this.STROKE_WIDTH;
    this.ctx.roundRect(this.MARGIN, this.MARGIN, this.TARGET_SIZE, this.TARGET_SIZE, this.CORNER_RADIUS);

    this.drawMonster(
      this.target.enemy.img,
      this.MARGIN + this.PADDING,
      this.MARGIN + this.PADDING,
      this.TARGET_SIZE - this.PADDING * 2,
      this.TARGET_SIZE - this.PADDING * 2
    );
    this.ctx.stroke();
  };

  private drawInfoBox = () => {
    const x = this.TARGET_SIZE + this.MARGIN * 2;
    let y = this.MARGIN;

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.STROKE_COLOR;
    this.ctx.lineWidth = this.STROKE_WIDTH;
    this.ctx.roundRect(x, y, this.INFO_BOX_WIDTH, this.INFO_BOX_HEIGHT, this.CORNER_RADIUS);

    const textX = this.TARGET_SIZE + this.MARGIN * 5;
    let textY = this.INFO_BOX_HEIGHT / 2 + this.MARGIN * 2;

    this.ctx.font = this.FONT;
    this.ctx.fillStyle = this.FONT_COLOR;
    this.ctx.fillText(this.target?.enemy.name as string, textX, textY);

    y = this.MARGIN * 2 + this.INFO_BOX_HEIGHT;

    this.ctx.roundRect(x, y, this.INFO_BOX_WIDTH, this.INFO_BOX_HEIGHT, this.CORNER_RADIUS);

    textY = this.INFO_BOX_HEIGHT * 1.5 + this.MARGIN * 3;
    this.ctx.fillText(`Remain: ${this.target?.amount as number}`, textX, textY);
    this.ctx.stroke();
  };

  private drawRest = () => {
    for (let i = 0; i < this.enemies.length; i += 1) {
      const x = this.MARGIN + (this.REST_SIZE + this.MARGIN) * i;
      const y =
        (this.HEIGHT - (this.TARGET_SIZE + this.MARGIN) - this.REST_SIZE) / 2 + (this.TARGET_SIZE + this.MARGIN);

      this.ctx.beginPath();
      this.ctx.strokeStyle = this.STROKE_COLOR;
      this.ctx.lineWidth = this.STROKE_WIDTH;
      this.ctx.roundRect(x, y, this.REST_SIZE, this.REST_SIZE, this.CORNER_RADIUS);
      this.ctx.stroke();

      this.drawMonster(
        this.enemies[i].enemy.img,
        x + this.PADDING,
        y + this.PADDING,
        this.REST_SIZE - this.PADDING * 2,
        this.REST_SIZE - this.PADDING * 2
      );

      if (this.enemies[i].isDead) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.DEAD_X_COLOR;
        this.ctx.lineWidth = this.STROKE_WIDTH;

        this.ctx.moveTo(x + this.PADDING, y + this.PADDING);
        this.ctx.lineTo(x + this.REST_SIZE - this.PADDING, y + this.REST_SIZE - this.PADDING);

        this.ctx.moveTo(x + this.REST_SIZE - this.PADDING, y + this.PADDING);
        this.ctx.lineTo(x + this.PADDING, y + this.REST_SIZE - this.PADDING);
        this.ctx.stroke();
      }
    }
  };

  private drawMonster(img: HTMLImageElement, dx: number, dy: number, dw: number, dh: number) {
    img.addEventListener('load', () => this.ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, dw, dh));
  }
}
