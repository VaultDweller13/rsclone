import Character from '../../model/characters/character';
import classes from '../../model/data/classes';
import Party from '../../model/game/party';
import weapons from '../../model/data/weapons';
import armor from '../../model/data/armor';
import { Item, Status } from '../../types/types';

const party = new Party(6, true, 0);
const tavern = new Party(20, false);

function getSavedChar(character: Character): {
  char: Character;
  inventory: Item[];
  equipment: {
    weapon: Item | null | undefined;
    shield: Item | null | undefined;
    armor: Item | null | undefined;
    helmet: Item | null | undefined;
    gauntlet: Item | null | undefined;
    accessory: Item | null | undefined;
    expendable: Item | null | undefined;
  };
  exp: number;
  status: Status;
  hp: number;
} {
  return {
    char: character,
    inventory: character.getInventory(),
    equipment: {
      weapon: character.equipment.get('weapon'),
      shield: character.equipment.get('shield'),
      armor: character.equipment.get('armor'),
      helmet: character.equipment.get('helmet'),
      gauntlet: character.equipment.get('gauntlet'),
      accessory: character.equipment.get('accessory'),
      expendable: character.equipment.get('expendable'),
    },
    exp: character.exp,
    status: character.status,
    hp: character.getHp(),
  };
}

function setTavern() {
  const fighter1 = new Character(
    'FIGHTER1',
    'dwarf',
    {
      strength: 16,
      intelligence: 10,
      piety: 10,
      vitality: 16,
      agility: 14,
      luck: 10,
    },
    classes.fighter,
    'good'
  );

  const fighter2 = new Character(
    'FIGHTER2',
    'human',
    {
      strength: 14,
      intelligence: 12,
      piety: 10,
      vitality: 13,
      agility: 16,
      luck: 10,
    },
    classes.fighter,
    'good'
  );

  const mage = new Character(
    'MAGE',
    'elf',
    {
      strength: 6,
      intelligence: 17,
      piety: 12,
      vitality: 12,
      agility: 10,
      luck: 10,
    },
    classes.mage,
    'good'
  );

  const priest = new Character(
    'PRIEST',
    'human',
    {
      strength: 12,
      intelligence: 12,
      piety: 16,
      vitality: 14,
      agility: 10,
      luck: 10,
    },
    classes.priest,
    'good'
  );

  const thief = new Character(
    'THIEF',
    'hobbit',
    {
      strength: 12,
      intelligence: 12,
      piety: 12,
      vitality: 14,
      agility: 16,
      luck: 17,
    },
    classes.thief,
    'neutral'
  );

  const bishop = new Character(
    'BISHOP',
    'human',
    {
      strength: 12,
      intelligence: 16,
      piety: 16,
      vitality: 14,
      agility: 13,
      luck: 10,
    },
    classes.bishop,
    'good'
  );

  fighter1.equip(weapons[0]);
  fighter1.equip(armor[1]);

  fighter2.equip(weapons[0]);
  fighter2.equip(armor[1]);
  tavern.add(fighter1);
  tavern.add(fighter2);
  tavern.add(mage);
  tavern.add(priest);
  tavern.add(bishop);
  tavern.add(thief);
}

function partyReload() {
  const temp = party.getParty().length;
  if (temp) {
    for (let i = 0; i < temp; i += 1) {
      party.remove(0);
    }
  }
  const tempGold = party.getGold();
  if (tempGold !== undefined) {
    party.changeGold(-tempGold + 1500);
  }
  const tempTavern = tavern.getParty().length;
  for (let i = 0; i < tempTavern; i += 1) {
    tavern.remove(0);
  }
  localStorage.setItem('partyChars', '');
  localStorage.setItem('tavernChars', '');
  setTavern();
}

function downloadParty() {
  const goldString = localStorage.getItem('partyGold');
  const charsString = localStorage.getItem('partyChars');
  let characters;
  if (charsString) {
    characters = JSON.parse(charsString) as {
      char: Character;
      inventory: Item[];
      equipment: {
        weapon: Item | null | undefined;
        shield: Item | null | undefined;
        armor: Item | null | undefined;
        helmet: Item | null | undefined;
        gauntlet: Item | null | undefined;
        accessory: Item | null | undefined;
        expendable: Item | null | undefined;
      };
      exp: number;
      status: Status;
      hp: number;
    }[];
    console.log(characters[0]);
  }
  if (characters !== undefined) {
    if (goldString) {
      const partyGold = JSON.parse(goldString) as number;
      if (partyGold !== undefined) {
        party.changeGold(-(party.getGold() as number) + partyGold);
      }
    }
    characters.forEach((character) => {
      const char = new Character(
        character.char.name,
        character.char.race,
        {
          strength: character.char.strength,
          intelligence: character.char.intelligence,
          piety: character.char.piety,
          vitality: character.char.vitality,
          agility: character.char.agility,
          luck: character.char.luck,
        },
        character.char.class,
        character.char.alignment,
        character.char.level
      );
      console.log(character.equipment);
      console.log(character.exp);
      char.addExp(character.exp ? character.exp : 0);
      char.status = character.status;
      char.setHp(character.hp);
      const { equipment } = character;
      Object.keys(equipment).forEach((key) => {
        if (equipment[key as keyof object]) {
          char.equip(equipment[key as keyof object] as Item);
        }
      });
      character.inventory.forEach((item) => {
        char.addToInventory(item);
      });
      party.add(char);
    });
  } else {
    partyReload();
  }
}
function downloadTavern() {
  const charsString = localStorage.getItem('tavernChars');
  let characters;
  if (charsString) {
    characters = JSON.parse(charsString) as {
      char: Character;
      inventory: Item[];
      equipment: {
        weapon: Item | null | undefined;
        shield: Item | null | undefined;
        armor: Item | null | undefined;
        helmet: Item | null | undefined;
        gauntlet: Item | null | undefined;
        accessory: Item | null | undefined;
        expendable: Item | null | undefined;
      };
      exp: number;
      status: Status;
      hp: number;
    }[];
  }
  const tempTavern = tavern.getParty().length;
  for (let i = 0; i < tempTavern; i += 1) {
    tavern.remove(0);
  }
  if (characters !== undefined) {
    characters.forEach((character) => {
      const char = new Character(
        character.char.name,
        character.char.race,
        {
          strength: character.char.strength,
          intelligence: character.char.intelligence,
          piety: character.char.piety,
          vitality: character.char.vitality,
          agility: character.char.agility,
          luck: character.char.luck,
        },
        character.char.class,
        character.char.alignment,
        character.char.level
      );
      char.addExp(character.exp ? character.exp : 0);
      char.addExp(character.exp ? character.exp : 0);
      char.status = character.status;
      char.setHp(character.hp);
      const { equipment } = character;
      Object.keys(equipment).forEach((key) => {
        if (equipment[key as keyof object]) {
          char.equip(equipment[key as keyof object] as Item);
        }
      });
      character.inventory.forEach((item) => {
        char.addToInventory(item);
      });
      tavern.add(char);
    });
  } else {
    setTavern();
  }
}

function saveGame() {
  localStorage.setItem('tavernChars', JSON.stringify(tavern.getParty().map((character) => getSavedChar(character))));
  localStorage.setItem('partyChars', JSON.stringify(party.getParty().map((character) => getSavedChar(character))));
  localStorage.setItem('partyGold', JSON.stringify(party.getGold() as number));
  console.log(localStorage.getItem('tavernChars'));
}

function downloadGame() {
  console.log(localStorage.getItem('tavernChars'), 'a');
  downloadParty();
  downloadTavern();
}

downloadGame();

export { party, tavern, partyReload, saveGame };
