export default class GameLoop {
  private lastTime = 0;
  private callback: ((seconds: number) => void) | null = null;
  private loopId = 0;

  start = (callback: (seconds: number) => void) => {
    this.callback = callback;
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
