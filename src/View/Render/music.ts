import test1 from '../../game/music/test1.mp3';
import test2 from '../../game/music/test2.mp3';

const test1Audio = new Audio(test1 as string);
const test2Audio = new Audio(test2 as string);
test1Audio.onended = async () => {
  await test2Audio.play();
}
test2Audio.onended = async () => {
  await test1Audio.play();
}

export {test1Audio, test2Audio}