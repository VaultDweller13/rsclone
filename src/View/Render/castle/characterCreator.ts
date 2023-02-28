import { getParty, warning, createChoice, createElement } from '../common';
import { getStats, getBonus, getClasses, getAlignment, getRaces } from '../../../model/characters/characterCreator';
import classes from '../../../model/data/classes';
import {
  nameExists,
  removeClassInactive,
  setLineHtml,
  setNameHtml,
  setRaceHtml,
  setStatClassHtml,
} from './characterCreatorTools';
import ChoiceButton from '../choice';
import { tavern } from '../partyInitializer';
import Character from '../../../model/characters/character';
import type { Alignment, Stat, Race, Class } from '../../../types/types';

let newCharacter = {
  name: '',
  race: '',
  alignment: 'good' as Alignment,
  class: '',
  bonus: 0,
  stats: {
    strength: 0,
    intelligence: 0,
    piety: 0,
    vitality: 0,
    agility: 0,
    luck: 0,
  } as Record<Stat, number>,
};

const confirm = {
  func: () => {},
  setFunc(func: () => void) {
    this.func = func;
  },
};

function selectClass(clas: string) {
  newCharacter.class = clas;
  if (newCharacter.bonus === 0) {
    document.getElementById('confirm')?.classList.remove('inactive');
  }
}

const statDescription = {
  strength: 'Strength affects your skill in combat',
  piety: 'Piety influence your ability to cast priest spells.',
  luck: 'Luck comes to your aid in many mysterious ways.',
  intelligence: 'Intelligence influence your ability to cast mage spells.',
  vitality: 'Vitality affects your ability to withstand damage',
  agility: 'Agility helps you avoid attacks and open treasure chests',
};

const raceDescription = {
  human: 'Humans excel at nothing, but have no particular weaknesses, except for a decided lack of piety',
  dwarf: 'Dwarves are strong and hardy. They love fine weapons and armor and delight in a good fight.',
  elf: 'Elves are intelligent and pious, but not very robust. They excel at intellectual pursuits, and are excellent spell-casters.',
  gnome:
    'Gnomes are pious and agile, probably from praying underground during earthquakes. Due to their ascetic traditions, they make excellent priests.',
  hobbit:
    'Hobbits are agile and very, very lucky. They are a happy-go-lucky people, and, with the right training, become superb thieves.',
};

function setClasses(alignment: Alignment, stats: Record<Stat, number>) {
  const classesEl = document.getElementById('classes') as HTMLElement;
  document.querySelectorAll('.class').forEach((el) => el.remove());
  const classNames = getClasses(alignment, stats);
  classNames.forEach((cl) => {
    const classButton = createElement('div', cl, 'class button');
    if (newCharacter.bonus > 0) {
      classButton.classList.add('inactive');
    }
    classButton.textContent = cl;
    classesEl.append(classButton);
    classButton.addEventListener('click', () => {
      if (newCharacter.bonus === 0) {
        selectClass(cl);
        classButton.classList.add('selected');
      }
    });
  });
  if (newCharacter.class === '' || newCharacter.bonus > 0) {
    if (!document.getElementById('confirm')?.classList.contains('inactive')) {
      document.getElementById('confirm')?.classList.add('inactive');
    }
  }
}

function reroll(stats: Record<Stat, number>): number {
  Object.keys(stats).forEach((el) => {
    const key = el as Stat;
    newCharacter.stats[key] = stats[key];
    newCharacter.class = '';
    (document.getElementById(key)?.querySelector('.stat-value') as HTMLElement).textContent = stats[key].toString();
    removeClassInactive('increase');
    document.querySelectorAll('.decrease').forEach((block) => {
      if (!block.classList.contains('inactive')) {
        block.classList.add('inactive');
      }
    });
  });
  setClasses(newCharacter.alignment, stats);
  return getBonus();
}

function setStats(bons: number, stats: Record<Stat, number>) {
  newCharacter.bonus = bons;
  Object.keys(stats).forEach((el) => {
    const stat = el as Stat;
    const line = createElement('div', stat, 'stat-line');
    const lineTip = createElement('div', '', 'block pop-up tooltip');
    // PUT YOUR TEXT HERE
    lineTip.innerHTML = statDescription[stat];
    line.append(lineTip);
    (document.getElementById('stats-table') as HTMLElement).append(line);
    line.innerHTML += setLineHtml(stat, stats[stat]);
    setClasses(newCharacter.alignment, newCharacter.stats);
    line.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('decrease') && newCharacter.stats[stat] > stats[stat]) {
        newCharacter.stats[stat] -= 1;
        newCharacter.bonus += 1;
        newCharacter.class = '';
        setClasses(newCharacter.alignment, newCharacter.stats);
        (document.getElementById(stat)?.querySelector('.stat-value') as HTMLElement).textContent =
          newCharacter.stats[stat].toString();
        (document.getElementById('bonus') as HTMLElement).textContent = newCharacter.bonus.toString();
        removeClassInactive('increase');
        if (newCharacter.stats[stat] === stats[stat]) {
          target.classList.add('inactive');
        }
      }
      if (target.classList.contains('increase')) {
        if (newCharacter.bonus > 0) {
          newCharacter.stats[stat] += 1;
          newCharacter.bonus -= 1;
          if (newCharacter.bonus === 0) {
            document.querySelectorAll('.increase').forEach((block) => {
              block.classList.add('inactive');
            });
          }
          setClasses(newCharacter.alignment, newCharacter.stats);
          (document.getElementById(stat)?.querySelector('.stat-value') as HTMLElement).textContent =
            newCharacter.stats[stat].toString();
          (document.getElementById('bonus') as HTMLElement).textContent = newCharacter.bonus.toString();
          target.parentElement?.querySelector('.decrease')?.classList.remove('inactive');
        }
      }
    });
  });
  document.getElementById('reroll')?.addEventListener('click', () => {
    newCharacter.bonus = reroll(stats);
    (document.getElementById('bonus') as HTMLElement).textContent = newCharacter.bonus.toString();
  });
  document.getElementById('confirm')?.addEventListener('click', () => {
    if (newCharacter.bonus === 0 && newCharacter.class !== '') {
      tavern.add(
        new Character(
          newCharacter.name,
          newCharacter.race as Race,
          newCharacter.stats,
          Object.values(classes).find((cl) => cl.name === newCharacter.class) as Class,
          newCharacter.alignment
        )
      );
      console.log(tavern.getParty());
      confirm.func();
    }
  });
  document.getElementById('leave')?.addEventListener('click', () => {
    newCharacter = {
      name: '',
      race: '',
      alignment: '' as Alignment,
      class: '',
      bonus: 0,
      stats: {
        strength: 0,
        intelligence: 0,
        piety: 0,
        vitality: 0,
        agility: 0,
        luck: 0,
      } as Record<Stat, number>,
    };
    confirm.func();
  });
}

function initStats() {
  (document.getElementById('cur-align') as HTMLElement).textContent = newCharacter.alignment
    .substring(0, 1)
    .toUpperCase();
  document.getElementById('current-choice')?.replaceWith(createElement('div', 'stats-class'));
  const stats = getStats(newCharacter.race as Race) as Record<Stat, number>;
  Object.keys(stats).forEach((el) => {
    const key = el as Stat;
    newCharacter.stats[key] = stats[key];
  });
  const bonus = getBonus();
  (document.getElementById('stats-class') as HTMLElement).innerHTML = setStatClassHtml(bonus);
  setStats(bonus, stats);
  document.getElementById('leave')?.addEventListener('click', () => {
    newCharacter = {
      name: '',
      race: '',
      alignment: '' as Alignment,
      class: '',
      bonus: 0,
      stats: {
        strength: 0,
        intelligence: 0,
        piety: 0,
        vitality: 0,
        agility: 0,
        luck: 0,
      } as Record<Stat, number>,
    };
    confirm.func();
  });
}

function setAlignment() {
  document.getElementById('current-choice')?.replaceWith(
    createChoice(
      'current-choice',
      getAlignment().map(
        (al): ChoiceButton => ({
          id: al,
          name: al,
          func: () => {
            newCharacter.alignment = al;
            initStats();
          },
        })
      )
    )
  );
  (document.getElementById('race') as HTMLElement).textContent = newCharacter.race.substring(0, 3).toUpperCase();
  document.getElementById('leave')?.addEventListener('click', () => {
    newCharacter = {
      name: '',
      race: '',
      alignment: '' as Alignment,
      class: '',
      bonus: 0,
      stats: {
        strength: 0,
        intelligence: 0,
        piety: 0,
        vitality: 0,
        agility: 0,
        luck: 0,
      } as Record<Stat, number>,
    };
    confirm.func();
  });
}

function setRace() {
  const view = document.getElementById('view') as HTMLElement;
  view.innerHTML += setRaceHtml(newCharacter.name);
  view.append(
    createChoice(
      'current-choice',
      getRaces().map(
        (race): ChoiceButton => ({
          id: race,
          name: race,
          func: () => {
            newCharacter.race = race;
            setAlignment();
          },
        })
      )
    )
  );
  getRaces().forEach((race) => {
    const raceTip = createElement('div', '', 'block pop-up tooltip');
    // PUT YOUR TEXT HERE
    raceTip.innerHTML = raceDescription[race];
    document.getElementById(race)?.append(raceTip);
  });
  document.getElementById('leave')?.addEventListener('click', () => {
    newCharacter = {
      name: '',
      race: '',
      alignment: '' as Alignment,
      class: '',
      bonus: 0,
      stats: {
        strength: 0,
        intelligence: 0,
        piety: 0,
        vitality: 0,
        agility: 0,
        luck: 0,
      } as Record<Stat, number>,
    };
    confirm.func();
  });
}

function createCharacter() {
  getParty().remove();
  const view = document.getElementById('view') as HTMLElement;
  view.style.backgroundImage = '';
  view.innerHTML = setNameHtml();
  const leave = createElement('div', 'leave', 'block button');
  leave.addEventListener('click', () => {
    newCharacter = {
      name: '',
      race: '',
      alignment: '' as Alignment,
      class: '',
      bonus: 0,
      stats: {
        strength: 0,
        intelligence: 0,
        piety: 0,
        vitality: 0,
        agility: 0,
        luck: 0,
      } as Record<Stat, number>,
    };
    confirm.func();
  });
  leave.textContent = 'leave';
  view.append(leave);
  const formBlock = document.getElementById('enter-name') as HTMLFormElement;
  formBlock.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = (formBlock.elements[0] as HTMLInputElement).value;
    if (name.length < 4 || name.length > 15) {
      warning('Name should contain more than 3 and less than 16 symbols');
    } else if (nameExists(name)) {
      warning('Character with this name already exists');
    } else {
      newCharacter.name = (formBlock.elements[0] as HTMLInputElement).value;
      formBlock.remove();
      setRace();
      console.log(formBlock);
    }
  });
}

export { createCharacter, confirm };
