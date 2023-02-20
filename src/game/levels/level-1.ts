import Logic from '../../model/game/logic';
import {
  Raycaster,
  GameMap,
  Camera,
  MiniMap,
  Controls,
  GameLoop,
  Battle,
  option3,
  ctx,
  injectCanvasToDocument,
} from '../game-engine';

export default function initFirstLevel() {
  if (!document.querySelector('#canvas')) injectCanvasToDocument();

  // prettier-ignore
  const mapArr = [
    1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 1, 1, 1, 5, 1, 0, 1, 6, 4, 6, 4, 6, 1,
    1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 
    1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 
    1, 1, 1, 6, 4, 6, 1, 1, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1,
    2, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 
    1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 
    1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 5, 1, 1, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 5, 0, 1, 1, 
    3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
  ];

  const startPosition: Required<Position> = {
    x: 1,
    y: 7,
    direction: Math.PI / 3,
  };

  const raycaster = new Raycaster(ctx, 9);
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

// const walls1 = `
//   WSWWWWWWWWWWWWWWWW
//   W                W
//   W W   WHDHHDHDW  W
//   W W   W   W   W  W
//   W W   W   W   W  W
//   W WWW W WWW WWWW W
//   W W   W   W W    W
//   W     WWWWW W    W
//   W WWW     W WHDHWW
//   W V  W  W   W    W
//   W D  W  W   W    W
//   W V  W      WWHDHW
//   W WWWWW  W  W    W
//   W W   W W   V    W
//   W W   W     D    W
//   W W   WWHDHWV    W
//   W W   W     VWWWWW
//   W W   W     D    W
//   W WHDHWWWWWWV    W
//   W V   W     W    W
//   W D   W          W
//   WWVWWWWWWFWWWWWWWW
// `;
