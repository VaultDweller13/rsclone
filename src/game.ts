import {
  Raycaster,
  GameMap,
  Player,
  MiniMap,
  Controls,
  GameLoop,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  // Choose one of the texture options
  // option1,
  // option2,
  option3,
} from './raycasting-engine';

import { getMain } from './View/Render/common';

export default function initGame() {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  getMain().append(canvas);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  /**
   *    Map width and height should be equal, so array length === width * height
   *    1: 'wall'
   *    2: 'entry'
   *    3: 'exit'
   *    4: 'closedDoor'
   *    5: 'openDoorVertical'
   *    6: 'openDoorHorizontal'
   */
  // prettier-ignore
  const walls = [
    1, 2, 1, 6, 0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    3, 0, 0, 0, 0, 5, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 
    1, 0, 1, 0, 0, 5, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 
    1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 
    1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 
    1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 
    1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
    1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 
    1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 
    1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 
    1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 
    1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 
    1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1,
  ];

  const initialPosition: Required<Position> = {
    x: 2,
    y: 2,
    direction: Math.PI / 3,
  };

  const miniLayoutPosition: Coordinates = { x: 5, y: 5 };

  const raycaster = new Raycaster(CANVAS_WIDTH, CANVAS_HEIGHT, ctx, 6);
  const map = new GameMap(Math.sqrt(walls.length), walls, option3);
  const controls = new Controls('discrete');
  const player = new Player(initialPosition, controls);
  const miniMap = new MiniMap(map, miniLayoutPosition);

  const game = new GameLoop(ctx, raycaster, map, miniMap, player);
  game.start();
}
