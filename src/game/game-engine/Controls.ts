export default class Controls {
  private readonly codes: Record<KeyboardKeyCode, KeyboardKeyAlias> = {
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
    й: 'camera-left',
    у: 'camera-right',
    ц: 'forward',
    ы: 'backward',
    ф: 'left',
    в: 'right',
  };

  readonly states: Record<KeyboardKeyAlias, boolean> = {
    'camera-left': false,
    'camera-right': false,
    left: false,
    right: false,
    forward: false,
    backward: false,
  };

  hasAccess = false;

  constructor(public readonly mode: ControlMode) {
    if (mode === 'discrete') {
      document.addEventListener(
        'keydown',
        (e) => this.handleKeysOnDiscreteMode(e),
        false
      );
    } else {
      document.addEventListener(
        'keydown',
        (e) => this.handleKeysOnContinuousMode(true, e),
        false
      );
      document.addEventListener(
        'keyup',
        (e) => this.handleKeysOnContinuousMode(false, e),
        false
      );
    }
  }

  changeAccessibility = (isAccessible: boolean) => {
    this.hasAccess = isAccessible;
  };

  private handleKeysOnContinuousMode = (val: boolean, e: KeyboardEvent) => {
    if (!this.hasAccess && Object.keys(this.codes).includes(e.key)) {
      const state = this.codes[e.key as KeyboardKeyCode];
      this.states[state] = val;
    }
  };

  private handleKeysOnDiscreteMode = (e: KeyboardEvent) => {
    if (
      !this.hasAccess &&
      Object.keys(this.codes).includes(e.key) &&
      Object.values(this.states).every((value: boolean) => !value)
    ) {
      const state = this.codes[e.key as KeyboardKeyCode];
      this.states[state] = true;
    }
  };
}
