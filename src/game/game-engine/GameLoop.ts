import GameMap from './GameMap';
import MiniMap from './MiniMap';
import Player from './Camera';
import Raycaster from './Raycaster';
import Battle from './Battle';

export default class GameLoop {
  private lastTime = 0;
  private loopId = 0;
  private callback: ((seconds: number) => void) | null = null;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private raycaster: Raycaster,
    private map: GameMap,
    private miniMap: MiniMap,
    private player: Player,
    private battle: Battle
  ) {}

  start = () => {
    this.callback = (seconds) => {
      this.player.update(this.map, seconds);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      if (this.battle.enemies.length === 0) {
        this.raycaster.render(this.player, this.map);
        this.miniMap.render(this.ctx, this.player.position);
      } else this.battle.render();
    };
    this.loopId = requestAnimationFrame(this.frame);
  };

  private frame = (time: number) => {
    const seconds = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (seconds < 0.2 && this.callback) this.callback(seconds);
    requestAnimationFrame(this.frame);
  };

  stop = () => {
    cancelAnimationFrame(this.loopId);
    this.loopId = 0;
  };
}
