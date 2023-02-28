import { GameLoop, ctx, injectCanvasToDocument, levels } from './game-engine';

export default function initGame() {
  if (!document.querySelector('#canvas')) injectCanvasToDocument();

  const game = new GameLoop(ctx, levels, 'discrete', 1);

  game.start();

  return game;
}
