import { GameLoop, ctx, injectCanvasToDocument, levels } from './game-engine';

export default function initGame() {
  if (!document.querySelector('#canvas')) injectCanvasToDocument();

  const game = new GameLoop(ctx, levels, 'discrete', 1);

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
