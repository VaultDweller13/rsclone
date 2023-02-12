import Character from '../../../model/characters/character';
import classes from '../../../model/data/classes';
import Party from '../../../model/game/party';

const party = new Party(6, true, 0);
party.add(new Character(
  'Grognak',
  'human',
  {
    strength: 18,
    intelligence: 18,
    piety: 18,
    vitality: 18,
    agility: 18,
    luck: 18,
  },
  classes.fighter,
  'good'
))
const tavern = new Party(20, false);

export { party, tavern };
