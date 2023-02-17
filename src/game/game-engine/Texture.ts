export default class Texture {
  readonly img = new Image();

  constructor(src: string, public readonly width: number, public readonly height: number) {
    this.img.src = src;
  }
}
