export default class Controls {
  codes: Record<KeyboardKey, KeyboardKeyAlias> = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'forward',
    ArrowDown: 'backward',
  };

  states: Record<KeyboardKeyAlias, boolean> = {
    left: false,
    right: false,
    forward: false,
    backward: false,
  };

  constructor() {
    document.addEventListener('keydown', (e) => this.onKey(true, e), false);
    document.addEventListener('keyup', (e) => this.onKey(false, e), false);
  }

  private onKey = (val: boolean, e: KeyboardEvent) => {
    if (Object.keys(this.codes).includes(e.key)) {
      const state = this.codes[e.key as KeyboardKey];
      this.states[state] = val;
    }
  };
}
