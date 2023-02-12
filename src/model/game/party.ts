import Character from '../characters/character';

export default class Party {
  #arr: Character[];
  #size: number;
  #check: boolean;

  constructor(size: number, alignmentCheck: boolean) {
    this.#arr = [];
    this.#size = size;
    this.#check = alignmentCheck;
  }

  public add(character: Character) {
    if (this.#arr.length > this.#size - 1) return;

    if (
      this.#check &&
      this.#arr.some(
        (char) => ![char.alignment, 'neutral'].includes(character.alignment)
      )
    ) {
      return;
    }

    this.#arr.push(character);
  }

  public remove(index: number) {
    if (index >= 0 && index < this.#size) return this.#arr.splice(index, 1)[0];
  }

  public getParty() {
    return this.#arr;
  }
}
