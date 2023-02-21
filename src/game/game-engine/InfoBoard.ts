import arrowKeys from './assets/arrow-keys.png';
import qweasdKeys from './assets/keys.png';
import enterKey from './assets/enter.png';
import tabKey from './assets/tab-key.png';

export default class InfoBoard {
  private readonly BACKGROUND_COLOR = 'black';
  private readonly FONT_REGULAR = '20px sans-serif';
  private readonly FONT = '60px sans-serif';
  private readonly FONT_COLOR = 'white';
  private readonly GREETING_DURATION = 150;
  private readonly WIDTH: number;
  private readonly HEIGHT: number;

  private readonly arrowKeys = new Image();
  private readonly qweasdKeys = new Image();
  private readonly enterKey = new Image();
  private readonly tabKey = new Image();

  duration = this.GREETING_DURATION;
  isGreeted = false;
  isTab = false;

  constructor(public ctx: CanvasRenderingContext2D) {
    this.WIDTH = this.ctx.canvas.width;
    this.HEIGHT = this.ctx.canvas.height;

    this.arrowKeys.src = arrowKeys as string;
    this.qweasdKeys.src = qweasdKeys as string;
    this.enterKey.src = enterKey as string;
    this.tabKey.src = tabKey as string;

    document.addEventListener('keydown', (e) => this.onKeys(e), false);
    document.addEventListener('keyup', (e) => this.onKeys(e, false), false);
  }

  private onKeys = (e: KeyboardEvent, state = true) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.code === 'Tab') this.isTab = state;
  };

  showLevel = (levelName: string) => {
    this.duration -= 1;
    this.ctx.globalAlpha = 1 * (this.duration / this.GREETING_DURATION);

    this.ctx.fillStyle = this.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.ctx.font = this.FONT;
    this.ctx.fillStyle = this.FONT_COLOR;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Level ${levelName}`, this.WIDTH / 2, this.HEIGHT / 2);

    this.ctx.stroke();

    this.ctx.drawImage(
      this.tabKey,
      0,
      0,
      this.tabKey.width,
      this.tabKey.height,
      50,
      this.HEIGHT - 50,
      this.tabKey.width / 3,
      this.tabKey.height / 3
    );

    this.ctx.font = this.FONT_REGULAR;
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Press Tab to show keys info`, 100, this.HEIGHT - 25);
    this.ctx.stroke();

    if (this.duration === 0) {
      this.isGreeted = true;
      this.duration = this.GREETING_DURATION;
    }
  };

  showKeyBoardInfo = () => {
    this.isGreeted = true;
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillStyle = this.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(this.arrowKeys, 0, 0, this.arrowKeys.width, this.arrowKeys.height, 50, 50, 100, 100);
    this.ctx.drawImage(this.qweasdKeys, 0, 0, this.arrowKeys.width, this.arrowKeys.height, 50, 120, 100, 100);
    this.ctx.drawImage(
      this.enterKey,
      0,
      0,
      this.arrowKeys.width,
      this.arrowKeys.height,
      70,
      210,
      this.arrowKeys.width / 3,
      this.arrowKeys.height / 3
    );

    this.ctx.font = this.FONT_REGULAR;
    this.ctx.fillStyle = this.FONT_COLOR;
    this.ctx.textAlign = 'left';
    this.ctx.fillText('Left, Q - camera rotation to the left', 170, 80);
    this.ctx.fillText('Right, E - camera rotation to the right', 170, 110);
    this.ctx.fillText('Up, W - forward', 170, 140);
    this.ctx.fillText('Down, S - backward', 170, 170);
    this.ctx.fillText('A - strafe left', 170, 200);
    this.ctx.fillText('D - strafe right', 170, 230);
    this.ctx.fillText('Enter - to submit', 170, 260);
    this.ctx.stroke();
  };

  showOfferToLeave = (toUpward: boolean) => {
    this.ctx.globalAlpha = 1;
    this.ctx.font = this.FONT_REGULAR;
    this.ctx.fillStyle = this.FONT_COLOR;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      `${toUpward ? 'Press Enter to go up?' : 'Press Enter to go down?'}`,
      this.WIDTH / 2,
      this.HEIGHT / 2
    );
    this.ctx.stroke();
  };
}
