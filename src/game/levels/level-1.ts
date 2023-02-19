import Logic from '../../model/game/logic';
import {
  Raycaster,
  GameMap,
  Camera,
  MiniMap,
  Controls,
  GameLoop,
  Battle,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  // Choose one of the texture options
  // option1,
  // option2,
  option3,
} from '../game-engine';

// import sprites from '../../model/data/monsterSprites';

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
  const mapArr = [
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
  const map = new GameMap(mapArr, option3);
  const miniMap = new MiniMap(map);
  const controls = new Controls('discrete');
  const battle = new Battle(ctx);

  const logic = new Logic();
  const player = new Camera(startPosition, controls);

  const game = new GameLoop(ctx, raycaster, map, miniMap, player, battle, logic);

  game.start();

  return game;
}

// controls.changeAccessibility(false);
// battle.defineEnemies([
//   { enemy: sprites.attackDog, name: 'Attack Dog', amount: 2, isDead: false },
//   { enemy: sprites.bishop, name: 'Bishop', amount: 3, isDead: true },
//   { enemy: sprites.chimera, name: 'Chimera', amount: 3, isDead: false },
//   { enemy: sprites.bleeb, name: 'Bleeb', amount: 3, isDead: false },
// ]);

// const walls1 = `
//   WsWWWWWWWWWWWWWWWW
//   W................W
//   W.W...WHDHHDHDW..W
//   W.W...W...W...W..W
//   W.W...W...W....W.W
//   W.WWW.W.WWW.WWWW.W
//   W.W...W...W.W....W
//   W.....WWWWW.W....W
//   W.WWW.....W.WHDHWW
//   W.V..W..W...W....W
//   W.D..W..W...W....W
//   W.V..W......WWHDHW
//   W.WWWWW..W..W....W
//   W.W...W.W...V....W
//   W.W...W.....D....W
//   W.W...WWHDHWV....W
//   W.W...W.....VWWWWW
//   W.W...W.....D....W
//   W.WHDHWWWWWWV....W
//   W.V...W.....W....W
//   W.D...W..........W
//   WWVWWWWWWFWWWWWWWW
// `;
