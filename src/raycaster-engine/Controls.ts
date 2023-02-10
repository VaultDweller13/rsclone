export default class Controls {
  private readonly codes: Record<KeyboardKey, KeyboardKeyAlias> = {
    ArrowLeft: 'camera-left',
    ArrowRight: 'camera-right',
    ArrowUp: 'forward',
    ArrowDown: 'backward',
    q: 'camera-left',
    e: 'camera-right',
    w: 'forward',
    s: 'backward',
    a: 'left',
    d: 'right',
  };

  readonly states: Record<KeyboardKeyAlias, boolean> = {
    'camera-left': false,
    'camera-right': false,
    left: false,
    right: false,
    forward: false,
    backward: false,
  };

  constructor(mode: ControlMode) {
    if (mode === 'continuous') {
      document.addEventListener('keydown', (e) => this.onKey(true, e), false);
      document.addEventListener('keyup', (e) => this.onKey(false, e), false);
    } else {
      document.addEventListener('keydown', (e) => this.onKey(true, e), false);
      document.addEventListener('keyup', (e) => this.onKey(false, e), false);
    }
  }

  private onKey = (val: boolean, e: KeyboardEvent) => {
    if (Object.keys(this.codes).includes(e.key)) {
      const state = this.codes[e.key as KeyboardKey];
      this.states[state] = val;
    }
  };
}
