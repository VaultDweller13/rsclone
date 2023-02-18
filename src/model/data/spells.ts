import type { Spell } from '../../types/types';

export const mage: Spell[] = [
  // Level 1
  {
    name: 'DUMAPIC',
    level: 1,
    target: 'self',
    description: 'Shows map',
    type: 'maze',
    cast: () => {},
  },
  {
    name: 'HALITO',
    level: 1,
    target: 'monster',
    description: `Causes a fireball to hit a monster for 1-8 points of fire damage`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'KATINO',
    level: 1,
    target: 'group',
    description: `Causes most of the monsters in a group to fall asleep`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MOGREF',
    level: 1,
    target: 'self',
    description: `Reduces the caster's armor class by 2 for the encounter`,
    type: 'battle',
    cast: () => {},
  },
  // Level 2
  {
    name: 'DILTO',
    level: 2,
    target: 'group',
    description: `Causes one group of monsters to be enveloped in darkness, lowering their defense`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'SOPIC',
    level: 2,
    target: 'self',
    description: `Causes the caster to become transparent, thus reducing their armor class by 4`,
    type: 'battle',
    cast: () => {},
  },
  // Level 3
  {
    name: 'MAHALITO',
    level: 3,
    target: 'group',
    description: `Causes an explosion in a monster group, doing 4-24 points of fire damage`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MOLITO',
    level: 3,
    target: 'group',
    description: `Causes sparks to damage half of the monsters in a group for 3-18 points damage`,
    type: 'battle',
    cast: () => {},
  },
  // Level 4
  {
    name: 'DALTO',
    level: 4,
    target: 'group',
    description: `Does 6-36 points of cold damage`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'LAHALITO',
    level: 4,
    target: 'group',
    description: `Does 6-36 points of fire damage`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MORLIS',
    level: 4,
    target: 'group',
    description: `Causes a group of monsters to fear the party`,
    type: 'battle',
    cast: () => {},
  },
  // Level 5
  {
    name: 'MADALTO',
    level: 5,
    target: 'group',
    description: `Causes 8-64 points of cold damage`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MAKANITO',
    level: 5,
    target: 'all',
    description: `Kills low-level monsters`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MAMORLIS',
    level: 5,
    target: 'all',
    description: `Causes all monsters to fear the party`,
    type: 'battle',
    cast: () => {},
  },
  // Level 6
  {
    name: 'HAMAN',
    level: 6,
    target: 'party',
    description: `Not implemented`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'LAKANITO',
    level: 6,
    target: 'group',
    description: `Attempts to kill a group of monsters`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MASOPIC	',
    level: 6,
    target: 'party',
    description: `Reduces the armor class of the entire party by 4`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'ZILWAN	',
    level: 6,
    target: 'monster',
    description: `Will destroy one undead monster`,
    type: 'battle',
    cast: () => {},
  },
  // Level 7
  {
    name: 'MAHAMAN',
    level: 7,
    target: 'party',
    description: `Not implemented`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MALOR',
    level: 7,
    target: 'party',
    description: `Teleports party to the specified location`,
    type: 'any',
    cast: () => {},
  },
  {
    name: 'TILTOWAIT',
    level: 7,
    target: 'all',
    description: `Does 10-100 hit points of damage to all monster`,
    type: 'battle',
    cast: () => {},
  },
];

export const priest: Spell[] = [
  // Level 1
  {
    name: 'badios',
    level: 1,
    target: 'monster',
    description: 'Causes 1-8 points of damage to a monster',
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'dios',
    level: 1,
    target: 'character',
    description: 'Restores 1-8 points of health to a party member',
    type: 'any',
    cast: () => {},
  },
  {
    name: 'KALKI',
    level: 1,
    target: 'party',
    description: `Reduces the armor class of all party members by 1 during combat`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MILWA',
    level: 1,
    target: 'party',
    description: `Summons a softly glowing light that increases vision and reveals secret doors`,
    type: 'maze',
    cast: () => {},
  },
  {
    name: 'PORFIC',
    level: 1,
    target: 'self',
    description: 'Lowers the armor class of the caster by 4 during combat',
    type: 'battle',
    cast: () => {},
  },
  // Level 2
  {
    name: 'CALFO',
    level: 2,
    target: 'self',
    description: 'Reveals the trap on a treasure chest',
    type: 'maze',
    cast: () => {},
  },
  {
    name: 'MANIFO',
    level: 2,
    target: 'group',
    description: 'Causes some of the monsters to become temporarily paralyzed',
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MATU',
    level: 2,
    target: 'party',
    description: 'Lowers armor class of all party members by 2 during combat',
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MONTINO',
    level: 2,
    target: 'group',
    description: `Silences the air around a group of monsters, making it impossible for them to cast spells`,
    type: 'battle',
    cast: () => {},
  },
  // Level 3
  {
    name: 'BAMATU',
    level: 3,
    target: 'party',
    description: `Lowers the party's armor class by 4 in combat`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'DIALKO',
    level: 3,
    target: 'character',
    description: 'Cures paralysis, and cures the effects of MANIFO and KATINO',
    type: 'any',
    cast: () => {},
  },
  {
    name: 'LATUMAPIC',
    level: 3,
    target: 'group',
    description: 'Identifies unknown monsters',
    type: 'maze',
    cast: () => {},
  },
  {
    name: 'LOMILWA',
    level: 3,
    target: 'party',
    description: `Extends field of vision and reveals secret doors. Lasts until leaving the maze or entering a dark area.`,
    type: 'maze',
    cast: () => {},
  },
  // Level 4
  {
    name: 'BADIAL',
    level: 4,
    target: 'monster',
    description: `Causes 2-16 points of damage`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'DIALKO',
    level: 4,
    target: 'character',
    description: 'Restores 2-16 points of health',
    type: 'any',
    cast: () => {},
  },
  {
    name: 'LATUMOFIS	',
    level: 4,
    target: 'character',
    description: 'Removes the effects of poison',
    type: 'any',
    cast: () => {},
  },
  {
    name: 'MAPORFIC	',
    level: 4,
    target: 'party',
    description: `Lowers the party's armor class by 2, and lasts for the entire expedition`,
    type: 'maze',
    cast: () => {},
  },
  // Level 5
  {
    name: 'BADI',
    level: 5,
    target: 'monster',
    description: `Attempt to kill one monster`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'BADIALMA',
    level: 5,
    target: 'monster',
    description: 'Causes 3-24 points of damage',
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'DI	',
    level: 5,
    target: 'character',
    description: 'Causes a dead person to be resurrected. ',
    type: 'any',
    cast: () => {},
  },
  {
    name: 'DIALMA	',
    level: 5,
    target: 'character',
    description: `Restores 3-24 points of health`,
    type: 'any',
    cast: () => {},
  },
  {
    name: 'KANDI	',
    level: 5,
    target: 'self',
    description: `Gives the direction of the person the party is attempting to locate, relative to the position of the caster`,
    type: 'maze',
    cast: () => {},
  },
  {
    name: 'LITOKAN',
    level: 5,
    target: 'group',
    description: `Causes a pillar of flame to strike a group of monsters, doing 3-24 points of damage`,
    type: 'battle',
    cast: () => {},
  },
  // Level 6
  {
    name: 'LOKTOFEIT',
    level: 6,
    target: 'party',
    description: `Causes all party members to be transported back to the castle, minus all of their equipment and most of their gold`,
    type: 'maze',
    cast: () => {},
  },
  {
    name: 'LORTO',
    level: 6,
    target: 'group',
    description: `Causes sharp blades to slice through a group, causing 6-36 points of damage`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MABADI',
    level: 6,
    target: 'monster',
    description: `Causes all but 1-8 hit points to be removed from a target`,
    type: 'battle',
    cast: () => {},
  },
  {
    name: 'MADI',
    level: 6,
    target: 'character',
    description: `Causes all hit points to be restored and cures any condition except death`,
    type: 'any',
    cast: () => {},
  },
  // Level 7
  {
    name: 'KADORTO',
    level: 7,
    target: 'character',
    description: `Restores the dead to life, and restores all hit points, even if the character is ashes. However, if the spell fails, the character is permanently lost.`,
    type: 'any',
    cast: () => {},
  },
  {
    name: 'MALIKTO',
    level: 7,
    target: 'all',
    description: `Causes 12-72 hit points of damage to all monsters`,
    type: 'battle',
    cast: () => {},
  },
];