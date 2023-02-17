import {
  Raycaster,
  GameMap,
  Camera,
  MiniMap,
  Controls,
  GameLoop,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  // Choose one of the texture options
  // option1,
  // option2,
  option3,
} from '../game-engine';

import sprites from '../../model/data/monsterSprites';
import Battle from '../game-engine/Battle';

export default function initGame() {
  const canvas = document.createElement('canvas');
  const viewHtml = document.getElementById('view');
  canvas.id = 'canvas';
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  if (viewHtml) {
    viewHtml.append(canvas);
  }
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
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 5, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 
    1, 0, 1, 0, 0, 4, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 
    1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 
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

  const startPosition: Required<Position> = {
    x: 1,
    y: 1,
    direction: Math.PI / 3,
  };

  const raycaster = new Raycaster(ctx, 6);
  const map = new GameMap(walls, option3);
  const miniMap = new MiniMap(map);
  const controls = new Controls('discrete');
  const player = new Camera(startPosition, controls);
  const battle = new Battle(ctx);
  const game = new GameLoop(ctx, raycaster, map, miniMap, player, battle);

  game.start();

  controls.changeAccessibility(false);
  battle.defineEnemies([
    { enemy: sprites.attackDog, name: 'Attack Dog', amount: 2, isDead: false },
    { enemy: sprites.bishop, name: 'Bishop', amount: 3, isDead: true },
    { enemy: sprites.chimera, name: 'Chimera', amount: 3, isDead: false },
    { enemy: sprites.bleeb, name: 'Bleeb', amount: 3, isDead: false },
  ]);

  return { game, battle, controls };
}
