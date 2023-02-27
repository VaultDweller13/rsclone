import test1 from '../../game/music/testFirst.mp3';
import test2 from '../../game/music/testSecond.mp3';
import intro from '../../game/music/intro.mp3';

const test1Audio = new Audio(test1 as string);
const test2Audio = new Audio(test2 as string);
const introAudio = new Audio(intro as string);
test1Audio.onended = async () => {
  await test2Audio.play();
};
test2Audio.onended = async () => {
  await test1Audio.play();
};

function playIntro() {
  introAudio.play().then(
    () => {},
    () => {}
  );
  introAudio.onended = async () => {
    await introAudio.play();
  };
}
function stopIntro() {
  introAudio.pause();
}

export { test1Audio, test2Audio };
