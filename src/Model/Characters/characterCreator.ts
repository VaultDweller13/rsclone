export default class CharacterCreator {
  public static getBonus() {
    let bonus = Math.floor(Math.random() * 5) + 6;
    const chance = () => Math.floor(Math.random() * 11);

    if (chance() === 10) {
      bonus += 10;
      if (bonus < 20 && chance() === 10) bonus += 10;
    }

    return bonus;
  }
}
