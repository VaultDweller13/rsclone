import { ControlMode, KeyboardKeyAlias, KeyboardKeyCode } from './utils/types';

export default class Controls {
  private readonly codes: Record<KeyboardKeyCode, KeyboardKeyAlias> = {
    ArrowLeft: 'camera-left',
    ArrowRight: 'camera-right',
    ArrowUp: 'forward',
    ArrowDown: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    KeyQ: 'camera-left',
    KeyE: 'camera-right',
    KeyW: 'forward',
    KeyS: 'backward',
  };

  readonly states: Record<KeyboardKeyAlias, boolean> = {
    'camera-left': false,
    'camera-right': false,
    left: false,
    right: false,
    forward: false,
    backward: false,
  };

  hasAccess = true;

  constructor(public readonly mode: ControlMode) {
    if (mode === 'discrete') {
      document.addEventListener('keydown', (e) => this.handleKeysOnDiscreteMode(e), false);
    } else {
      document.addEventListener('keydown', (e) => this.handleKeysOnContinuousMode(true, e), false);
      document.addEventListener('keyup', (e) => this.handleKeysOnContinuousMode(false, e), false);
    }
  }

  changeAccessibility = (hasAccess: boolean) => {
    this.hasAccess = hasAccess;
  };

  private handleKeysOnContinuousMode = (val: boolean, e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.hasAccess && Object.keys(this.codes).includes(e.code)) {
      const state = this.codes[e.key as KeyboardKeyCode];
      this.states[state] = val;
    }
  };

  private handleKeysOnDiscreteMode = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      this.hasAccess &&
      Object.keys(this.codes).includes(e.code) &&
      Object.values(this.states).every((value: boolean) => !value)
    ) {
      const state = this.codes[e.code as KeyboardKeyCode];
      this.states[state] = true;
    }
  };
}
