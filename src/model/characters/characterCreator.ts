import Character from './character';
import classes from '../data/classes';
import races from '../data/races';
import type { Race, Alignment, Stat, Class } from '../../types/types';

export function getRaces(): Race[] {
  return races.map((race) => race.name) as Race[];
}

export function getAlignment(): Alignment[] {
  return ['good', 'neutral', 'evil'];
}

export function getStats(raceName: Race): Record<Stat, number> | undefined {
  return races.find((race) => race.name === raceName)?.stats;
}

export function getBonus(): number {
  let bonus = Math.floor(Math.random() * 5) + 5;
  const chance = () => Math.floor(Math.random() * 11);

  if (chance() === 10) {
    bonus += 10;
    if (chance() === 10) bonus += 10;
  }

  return bonus;
}

export function getClasses(alignment: Alignment, stats: Record<Stat, number>) {
  const isQualified = (classStats: Partial<Record<Stat, number>>) =>
    Object.keys(classStats).every((key) => {
      const value = classStats[key as Stat];

      if (!value) return false;
      return stats[key as Stat] >= value;
    });

  return Object.values(classes)
    .filter(
      (charClass) =>
        isQualified(charClass.stats) && charClass.alignment.includes(alignment)
    )
    .map((charClass) => charClass.name);
}

export function getCharacter(
  name: string,
  race: Race,
  stats: Record<Stat, number>,
  className: Class,
  alignment: Alignment
) {
  return new Character(name, race, stats, className, alignment);
}
