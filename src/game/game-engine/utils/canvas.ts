import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
};

export const ctx = createCanvas().getContext('2d') as CanvasRenderingContext2D;

export const injectCanvasToDocument = () => {
  const viewHtml = document.getElementById('view');
  if (viewHtml) viewHtml.append(ctx.canvas);
};
