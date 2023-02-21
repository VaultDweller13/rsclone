import GameMap from './GameMap';
import MiniMap from './MiniMap';
import Raycaster from './Raycaster';
import Battle from './Battle';
import Logic from '../../model/game/logic';
import { ControlMode, Level } from './utils/types';
import Controls from './Controls';
import Camera from './Camera';
import InfoBoard from './InfoBoard';

export default class GameLoop {
  raycaster: Raycaster;
  map: GameMap;
  miniMap: MiniMap;
  controls: Controls;
  battle: Battle;
  player: Camera;
  logic: Logic;
  infoBoard: InfoBoard;
  level: Level;

  private lastTime = 0;
  private loopId: number | null = null;
  private isPaused = false;
  private loop: ((seconds: number) => void) | null = null;

  constructor(
    public ctx: CanvasRenderingContext2D,
    public levels: Level[],
    public controlMode: ControlMode,
    levelId: number
  ) {
    this.level = levels.find((level) => level.id === levelId) ?? levels[0];
    this.raycaster = new Raycaster(ctx, this.level.lightRange);
    this.map = new GameMap(this.level.map, this.level.textures);
    this.miniMap = new MiniMap(this.map);
    this.controls = new Controls(controlMode);
    this.battle = new Battle(ctx);
    this.player = new Camera(this.level.startPosition, this.controls);
    this.logic = new Logic();
    this.infoBoard = new InfoBoard(ctx);

    document.addEventListener('keydown', (e) => this.onKeys(e), false);
    this.init();
  }

  init = () => {
    this.loop = (seconds) => {
      this.player.update(this.map, seconds);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.raycaster.render(this.player, this.map);
      this.miniMap.render(this.ctx, this.player.position);
      if (this.infoBoard.isTab) this.infoBoard.showKeyBoardInfo();
      if (!this.infoBoard.isGreeted) this.infoBoard.showLevel(this.level.name);
      if (this.player.inFront === 2) this.infoBoard.showOfferToLeave(true);
      else if (this.player.inFront === 3) this.infoBoard.showOfferToLeave(false);
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

  private onKeys = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.code === 'Enter') {
      if (this.player.inFront === 2) this.updateGameParameters(this.level.id - 1);
      else if (this.player.inFront === 3) this.updateGameParameters(this.level.id + 1);
    }
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
    if (seconds < 0.2 && this.loop) this.loop(seconds);
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

  updateGameParameters = (newLevelId: number) => {
    this.stop();
    const newLevel = this.levels.find((level) => level.id === newLevelId);
    if (newLevel) {
      this.level = newLevel;
      this.raycaster = new Raycaster(this.ctx, this.level.lightRange);
      this.map = new GameMap(this.level.map, this.level.textures);
      this.miniMap = new MiniMap(this.map);
      this.player = new Camera(this.level.startPosition, this.controls);
      this.start();
    } else {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  };
}
