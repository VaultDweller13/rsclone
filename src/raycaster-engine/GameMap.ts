import Texture from "./Texture";

export default class GameMap {
  width: number;
  height: number;
  walls: number[];
  wallTextures: Texture[];

  constructor(size: number, walls: number[], wallTextures: Texture[]) {
    this.width = size;
    this.height = size;
    this.walls = walls;
    this.wallTextures = wallTextures;
  }

  get(x: number, y: number) {
    const column = Math.floor(x);
    const raw = Math.floor(y);
    if (column < 0 || column >= this.width || raw < 0 || raw >= this.height) return -1;
    return this.walls[raw * this.width + column];
  }

  cast(point: Position, angle: number, range: number, fullRange = false) {
    const cells: Step[] = [];
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    let stepX: Step; 
    let stepY: Step; 
    let nextStep: Step;
    nextStep = { x: point.x, y: point.y, cell: 0, distance: 0 };

    do {
      cells.push(nextStep);
      if (!fullRange && nextStep.cell && nextStep.cell > 0) break;

      stepX = this.step(sin, cos, nextStep.x as number, nextStep.y as number);
      stepY = this.step(cos, sin, nextStep.y as number, nextStep.x as number, true);

      nextStep = (stepX.depth  as number) < (stepY.depth as number)
        ? this.inspect(stepX, 1, 0, nextStep.distance as number, stepX.y as number, cos, sin)
        : this.inspect(stepY, 0, 1, nextStep.distance  as number, stepY.x as number, cos, sin);
    } while (nextStep.distance && nextStep.distance <= range);

    return cells;
  }

  private step(rise: number, run: number, x: number, y: number, inverted?: boolean): Step {
    if (run === 0) return { depth: Infinity };
    const dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    const dy = dx * rise / run;

    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      depth: dx * dx + dy * dy
    };
  }

  private inspect(step: Step, shiftX: number, shiftY: number, nextStepDistance: number, stepOffset: number, cos: number, sin: number) {
    const dx = cos < 0 ? shiftX : 0;
    const dy = sin < 0 ? shiftY : 0;
    const index = (Math.floor(step.y as number - dy) * this.width) + Math.floor(step.x as number - dx);
    const cell = (index < 0 || index >= this.walls.length) ? -1 : this.walls[index];
    const distance = nextStepDistance + Math.sqrt(step.depth as number);

    const offset = stepOffset - Math.floor(stepOffset);
    return { ...step, cell, distance, offset };
  }
}
