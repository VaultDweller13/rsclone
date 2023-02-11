import GameMap from './GameMap';
import MiniMap from './MiniMap';
import Player from './Player';
import Raycaster from './Raycaster';

export default class GameLoop {
  private lastTime = 0;
  private callback: ((seconds: number) => void) | null = null;
  private loopId = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private raycaster: Raycaster,
    private map: GameMap,
    private miniMap: MiniMap,
    private player: Player
  ) {}

  start = () => {
    this.callback = (seconds) => {
      this.player.update(this.map, seconds);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.raycaster.render(this.player, this.map);
      this.miniMap.render(
        this.ctx,
        this.miniMap.miniLayoutPosition,
        this.player.position
      );
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
