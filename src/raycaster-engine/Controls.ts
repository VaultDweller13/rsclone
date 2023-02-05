export default class Controls {
  codes: KeyboardKeys = { 'ArrowLeft': 'left', 'ArrowRight': 'right', 'ArrowUp': 'forward', 'ArrowDown': 'backward' };
  states: States = { left: false, right: false, forward: false, backward: false };

  constructor() {
    document.addEventListener('keydown', this.onKey.bind(this, true), false);
    document.addEventListener('keyup', this.onKey.bind(this, false), false);
  }
  
  onKey(val: boolean, e: KeyboardEvent) {
    if (Object.keys(this.codes).includes(e.key)) {
      const state = this.codes[e.key];
      this.states[state] = val;
    }
  }
}