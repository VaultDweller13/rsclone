import Character from './character';
import classes from './classes';
import races from './races';

export default class CharacterCreator {
  public static getRaces(): Race[] {
    return races.map((race) => race.name) as Race[];
  }

  public static getAlignment(): Alignment[] {
    return ['good', 'neutral', 'evil'];
  }

  public static getStats(raceName: Race): Record<Stat, number> | undefined {
    return races.find((race) => race.name === raceName)?.stats;
  }

  public static getBonus(): number {
    let bonus = Math.floor(Math.random() * 5) + 5;
    const chance = () => Math.floor(Math.random() * 11);

    if (chance() === 10) {
      bonus += 10;
      if (chance() === 10) bonus += 10;
    }

    return bonus;
  }

  public static getClasses(alignment: Alignment, stats: Record<Stat, number>) {
    const isQualified = (classStats: Partial<Record<Stat, number>>) =>
      Object.keys(classStats).every((key) => {
        const value = classStats[key as Stat];

        if (!value) return false;
        return stats[key as Stat] >= value;
      });

    return classes
      .filter(
        (charClass) =>
          isQualified(charClass.stats) &&
          charClass.alignment.includes(alignment)
      )
      .map((charClass) => charClass.name);
  }

  public static getCharacter(
    name: string,
    race: Race,
    stats: Record<Stat, number>,
    className: ClassName,
    alignment: Alignment
  ) {
    return new Character(name, race, stats, className, alignment);
  }
}
