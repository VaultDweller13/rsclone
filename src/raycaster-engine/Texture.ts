export default class Texture {
  img: HTMLImageElement;
  width: number;
  height: number;

  constructor(src: string, width: number, height: number) {
    this.img = new Image();
    this.width = width;
    this.height = height;
    this.img.src = src;
  }
}
