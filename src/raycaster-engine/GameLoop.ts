export default class GameLoop {
  lastTime = 0;
  callback: ((seconds: number) => void) | null;
  loopId = 0;
  
  constructor() {
    this.callback = null;
  }
  
  start(callback: (seconds: number) => void) {
    this.callback = callback;
    this.loopId = requestAnimationFrame(this.frame);
  }

  frame = (time: number) => {
    const seconds = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (seconds < 0.2 && this.callback) this.callback(seconds);
    requestAnimationFrame(this.frame);
  };

  stop = () => {
    cancelAnimationFrame(this.loopId);
  }
}
