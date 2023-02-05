import classes from './classes';

export default class CharacterCreator {
  public static getBonus() {
    let bonus = Math.floor(Math.random() * 5) + 5;
    const chance = () => Math.floor(Math.random() * 11);

    if (chance() === 10) {
      bonus += 10;
      if (chance() === 10) bonus += 10;
    }

    return bonus;
  }

  public static getClasses(alignment: Alignment, stats: Record<Stats, number>) {
    const isQualified = (classStats: Partial<Record<Stats, number>>) =>
      Object.keys(classStats).every((key) => {
        const value = classStats[key as Stats];

        if (!value) return false;
        return stats[key as Stats] >= value;
      });

    return classes
      .filter(
        (charClass) =>
          isQualified(charClass.stats) &&
          charClass.alignment.includes(alignment)
      )
      .map((charClass) => charClass.name);
  }
}
