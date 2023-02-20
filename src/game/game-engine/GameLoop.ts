import GameMap from './GameMap';
import MiniMap from './MiniMap';
import Raycaster from './Raycaster';
import Battle from './Battle';
import Logic from '../../model/game/logic';
import { ControlMode, Level } from './utils/types';
import Controls from './Controls';
import Camera from './Camera';

export default class GameLoop {
  raycaster: Raycaster;
  map: GameMap;
  miniMap: MiniMap;
  controls: Controls;
  battle: Battle;
  player: Camera;
  logic: Logic;

  private lastTime = 0;
  private loopId: number | null = null;
  private isPaused = false;
  private callback: ((seconds: number) => void) | null = null;

  constructor(
    public ctx: CanvasRenderingContext2D,
    public levels: Level[],
    public controlMode: ControlMode,
    whichLevel: number
  ) {
    const level = levels[whichLevel - 1];
    this.raycaster = new Raycaster(ctx, level.lightRange);
    this.map = new GameMap(level.map, level.textures);
    this.miniMap = new MiniMap(this.map);
    this.controls = new Controls(controlMode);
    this.battle = new Battle(ctx);
    this.player = new Camera(level.startPosition, this.controls);
    this.logic = new Logic();

    this.init();
  }

  init = () => {
    this.callback = (seconds) => {
      this.player.update(this.map, seconds);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.raycaster.render(this.player, this.map);
      this.miniMap.render(this.ctx, this.player.position);
      // if (this.player.isMoved) {
      //   this.player.changeMoveState(false);
      //   console.log('moved');
      //   if (this.logic.ifEncounter()) {
      //     this.pause();
      //     this.battle.defineEnemies(this.logic.getEnemies());
      //     this.battle.render();
      //   }
      // }
    };
  };

  start = () => {
    if (this.isPaused) {
      this.isPaused = !this.isPaused;
      this.lastTime = Date.now();
      this.player.controls.changeAccessibility(true);
    }
    this.loopId = requestAnimationFrame(this.frame);
  };

  private frame = (time: number) => {
    const seconds = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (seconds < 0.2 && this.callback) this.callback(seconds);
    if (!this.isPaused) this.loopId = requestAnimationFrame(this.frame);
  };

  stop = () => {
    if (this.loopId) cancelAnimationFrame(this.loopId);
    this.loopId = null;
  };

  pause = () => {
    this.isPaused = !this.isPaused;
    this.player.controls.changeAccessibility(false);
    this.stop();
  };
}
