export default class Texture {
  readonly img = new Image();

  constructor(src: string, public width: number, public height: number) {
    this.width = width;
    this.height = height;
    this.img.src = src;
  }
}
