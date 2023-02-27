import Character from '../characters/character';

export default class Party {
  #arr: Character[];
  #size: number;
  #check: boolean;
  #gold: number | undefined;

  constructor(size: number, alignmentCheck: boolean, gold?: number) {
    this.#arr = [];
    this.#size = size;
    this.#check = alignmentCheck;
    this.#gold = gold;
  }

  public add(character: Character) {
    if (!this.canBeAdded(character)) return;

    this.#arr.push(character);
  }

  public remove(index = -1) {
    if (index === -1) this.#arr = [];
    if (index >= 0 && index < this.#size) return this.#arr.splice(index, 1)[0];

    return undefined;
  }

  public canBeAdded(character: Character) {
    if (this.#check && this.#arr.some((char) => ![char.alignment, 'neutral'].includes(character.alignment))) {
      return false;
    }

    return this.#arr.length < this.#size;
  }

  public getParty() {
    return this.#arr;
  }

  public changeGold(value: number) {
    if (this.#gold === undefined) return;

    const newAmount = this.#gold + value;
    this.#gold = newAmount < 0 ? this.#gold : newAmount;
  }

  public getGold() {
    return this.#gold;
  }

  /** Splits experience points between active party members */
  public splitExp(value: number) {
    const characters = this.getParty().filter((char) => char.status === 'OK');
    const expPerChar = Math.ceil(value / characters.length);

    characters.forEach((char) => char.addExp(expPerChar));
  }
}
