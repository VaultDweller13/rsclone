import { getParty, warning, createChoice, createElement } from './common';
import {
  getStats,
  getBonus,
  getClasses,
  getCharacter,
} from '../../model/characters/characterCreator';
import die from '../Assets/die.svg';
import classes from '../../model/data/classes';

const chars = new Map();
const newChar = {
  name: '',
  race: '',
  alignment: '' as Alignment,
  class: '',
  bonus: 0,
};
const charStats = {
  strength: 0,
  intelligence: 0,
  piety: 0,
  vitality: 0,
  agility: 0,
  luck: 0,
};
let confirm = () => {};
function selectClass(clas: string) {
  newChar.class = clas;
  if (newChar.bonus === 0) {
    document.getElementById('confirm')?.classList.remove('inactive');
  }
}
const setClasses = (alignment: Alignment, stats: Record<Stat, number>) => {
  const classesEl = document.getElementById('classes') as HTMLElement;
  document.querySelectorAll('.class').forEach((el) => el.remove());
  const classNames = getClasses(alignment, stats);
  classNames.forEach((cl) => {
    const classButton = createElement('div', cl, 'class button');
    if (newChar.bonus > 0) {
      classButton.classList.add('inactive');
    }
    classButton.textContent = cl;
    classesEl.append(classButton);
    classButton.addEventListener('click', () => {
      if (newChar.bonus === 0) {
        selectClass(cl);
        classButton.classList.add('selected');
      }
    });
  });
  if (newChar.class === '' || newChar.bonus > 0) {
    if (!document.getElementById('confirm')?.classList.contains('inactive')) {
      document.getElementById('confirm')?.classList.add('inactive');
    }
  }
};
function reroll(stats: Record<Stat, number>): number {
  Object.keys(stats).forEach((el) => {
    const key = el as Stat;
    charStats[key] = stats[key];
    newChar.class = '';
    (
      document.getElementById(key)?.querySelector('.stat-value') as HTMLElement
    ).textContent = stats[key].toString();
    document.querySelectorAll('.increase').forEach((block) => {
      if (block.classList.contains('inactive')) {
        block.classList.remove('inactive');
      }
    });
    document.querySelectorAll('.decrease').forEach((block) => {
      if (!block.classList.contains('inactive')) {
        block.classList.add('inactive');
      }
    });
  });
  setClasses(newChar.alignment, stats);
  return getBonus();
}
function setStats(bons: number, stats: Record<Stat, number>) {
  newChar.bonus = bons;
  Object.keys(stats).forEach((el) => {
    const stat = el as Stat;
    const line = createElement('div', stat, 'stat-line');
    (document.getElementById('stats-table') as HTMLElement).append(line);
    line.innerHTML += `
      <span class='stat-name'>${stat}</span> 
      <span class="stat-wrap">
        <button class="decrease button inactive">←</button>
        <span class="stat-value">${stats[stat]}</span>
        <button class="increase button">→</button>
      </span>
    `;
    setClasses(newChar.alignment, charStats);
    line.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (
        target.classList.contains('decrease') &&
        charStats[stat] > stats[stat]
      ) {
        charStats[stat] -= 1;
        newChar.bonus += 1;
        newChar.class = '';
        setClasses(newChar.alignment, charStats);
        (
          document
            .getElementById(stat)
            ?.querySelector('.stat-value') as HTMLElement
        ).textContent = charStats[stat].toString();
        (document.getElementById('bonus') as HTMLElement).textContent =
          newChar.bonus.toString();
        document.querySelectorAll('.increase').forEach((block) => {
          if (block.classList.contains('inactive')) {
            block.classList.remove('inactive');
          }
        });
        if (charStats[stat] === stats[stat]) {
          target.classList.add('inactive');
        }
      }
      if (target.classList.contains('increase')) {
        if (newChar.bonus === 0) {
          document.querySelectorAll('.increase').forEach((block) => {
            block.classList.add('inactive');
          });
        }
        if (newChar.bonus > 0) {
          charStats[stat] += 1;
          newChar.bonus -= 1;
          setClasses(newChar.alignment, charStats);
          (
            document
              .getElementById(stat)
              ?.querySelector('.stat-value') as HTMLElement
          ).textContent = charStats[stat].toString();
          (document.getElementById('bonus') as HTMLElement).textContent =
            newChar.bonus.toString();

          if (
            target.previousElementSibling?.previousElementSibling?.classList.contains(
              'inactive'
            )
          ) {
            target.previousElementSibling?.previousElementSibling?.classList.remove(
              'inactive'
            );
          }
        }
      }
    });
  });
  document.getElementById('reroll')?.addEventListener('click', () => {
    newChar.bonus = reroll(stats);
    (document.getElementById('bonus') as HTMLElement).textContent =
      newChar.bonus.toString();
  });
  document.getElementById('confirm')?.addEventListener('click', () => {
    if (newChar.bonus === 0 && newChar.class !== '') {
      chars.set(
        newChar.name,
        getCharacter(
          newChar.name,
          newChar.race as Race,
          charStats,
          Object.values(classes).find(
            (cl) => cl.name === newChar.class
          ) as Class,
          newChar.alignment
        )
      );
      console.log(newChar);
      confirm();
    }
  });
}
function initStats() {
  (document.getElementById('cur-align') as HTMLElement).textContent =
    newChar.alignment.substring(0, 1).toUpperCase();
  document
    .getElementById('current-choice')
    ?.replaceWith(createElement('div', 'stats-class'));
  const stats = getStats(newChar.race as Race) as Record<Stat, number>;
  Object.keys(stats).forEach((el) => {
    const key = el as Stat;
    charStats[key] = stats[key];
  });
  const bonus = getBonus();
  (document.getElementById('stats-class') as HTMLElement).innerHTML = `
    <div id='stats' class="block column">
      <div id="stats-table">
      </div>
      <div class='bonus-cont'>
      Bonus <span id='bonus'>${bonus}</span>
        <div class='block input' id="reroll">
          <img src="${die as string}" alt="reroll">
        </div>
      </div>
    </div>
    <div id ="classes" class="block column">
      <div id="confirm" class="button block inactive" >Confirm</div>
      <style>
        #confirm{
          position:absolute;
          border: 3px #fff solid;
          bottom: 15px;
          right: 15px;
        }
      </style>
    </div>
    <style>
      #stats-class{
        display: flex;
      }
      .column{
        width: 45%;
        position:relative;
      }
      .stat-line{
        display: flex;
        justify-content: space-between;
      }
      .stat-wrap {
        width: 70px;
        display: flex;
        justify-content: space-between;
      }
      #reroll{
        max-height: 34px;
        max-width: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5px;
      }
      #reroll img{
        height: 80%;
        width: 80%;
      }
      #stats .button{
        border:2px #ffffff solid;
        border-radius: 5px
      }
      #classes .button{
        text-align:center;
      }
    </style>
  `;
  setStats(bonus, stats);
}
function setAlignment() {
  document.getElementById('current-choice')?.replaceWith(
    createChoice('current-choice', [
      {
        id: 'good',
        name: 'good',
        func: () => {
          newChar.alignment = 'good';
          initStats();
        },
      },
      {
        id: 'neutral',
        name: 'neutral',
        func: () => {
          newChar.alignment = 'neutral';
          initStats();
        },
      },
      {
        id: 'evil',
        name: 'evil',
        func: () => {
          newChar.alignment = 'evil';
          initStats();
        },
      },
    ])
  );
  (document.getElementById('race') as HTMLElement).textContent = newChar.race
    .substring(0, 3)
    .toUpperCase();
}
function setRace() {
  const view = document.getElementById('view') as HTMLElement;
  view.innerHTML = `
  <div id="location-name" class="block">
  Tavern
  </div>
  <div id="current-char" class="block">
  <div id="cur-name">${newChar.name}</div>
  <div id="lvl">L</div>
  <div id="lvl-val">1</div>
  <div><span id="cur-align">???</span id="cur-class">-<span>???</span></div>
  <div id="race">???</div>
  </div>
  <style>
    #current-char{
      display: flex;
      justify-content: space-between;
    }
  </style>
  `;
  view.append(
    createChoice('current-choice', [
      {
        id: 'human',
        name: 'human',
        func: () => {
          newChar.race = 'human';
          setAlignment();
        },
      },
      {
        id: 'elf',
        name: 'elf',
        func: () => {
          newChar.race = 'elf';
          setAlignment();
        },
      },
      {
        id: 'dwarf',
        name: 'dwarf',
        func: () => {
          newChar.race = 'dwarf';
          setAlignment();
        },
      },
      {
        id: 'gnome',
        name: 'gnome',
        func: () => {
          newChar.race = 'gnome';
          setAlignment();
        },
      },
      {
        id: 'hobbit',
        name: 'hobbit',
        func: () => {
          newChar.race = 'hobbit';
          setAlignment();
        },
      },
    ])
  );
}

function createChar(func: () => void) {
  confirm = () => {
    func();
  };
  getParty().remove();
  const view = document.getElementById('view') as HTMLElement;
  view.style.backgroundImage = '';
  view.innerHTML = `
  <div id="location-name" class="block">
  Tavern
  </div>
  <form class="block pop-up center form" id="enter-name">
    <label for="new-name">Enter name of the new character</label>
    <br>
    <input type="text" id="new-name" class="input">
    <input type="submit" class="input" value="Submit">
  </form>
  `;
  const formBlock = document.getElementById('enter-name') as HTMLFormElement;
  formBlock.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = (formBlock.elements[0] as HTMLInputElement).value;
    if (name.length < 4 || name.length > 15) {
      warning('Name should contain more than 3 and less than 16 symbols');
    } else {
      newChar.name = name;
      setRace();
    }
  });
}

export default createChar;
