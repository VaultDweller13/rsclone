import getFromRange from '../../types/utils';

export function ifEncounter() {
  const roll = getFromRange(0, 100);
  console.log({ roll });
  return roll < 5;
}

export function startBattle() {
  console.log('battle!');
}
