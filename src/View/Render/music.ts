import intro from '../../game/music/intro.mp3';
import castleMusic from '../../game/music/castle.mp3';
import maze1 from '../../game/music/maze1.mp3';
import maze2 from '../../game/music/maze 2.mp3';
import battleIntro from '../../game/music/battleIntro.mp3';
import battleMusic from '../../game/music/battle.mp3';

const introAudio = new Audio(intro as string);
introAudio.volume = 0.7;
const castleAudio = new Audio(castleMusic as string);
castleAudio.volume = 0.7;
const maze1Audio = new Audio(maze1 as string);
const maze2Audio = new Audio(maze2 as string);
const battleIntroAudio = new Audio(battleIntro as string);
const battleAudio = new Audio(battleMusic as string);

maze1Audio.onended = async () => {
  await maze2Audio.play();
};

maze2Audio.onended = async () => {
  await maze1Audio.play();
};
battleIntroAudio.onended = async () => {
  battleAudio.currentTime = 0;
  await battleAudio.play();
};
battleAudio.onended = async () => {
  await battleAudio.play();
};

function playIntro() {
  if (introAudio.paused || introAudio.duration === 0) {
    introAudio.currentTime = 0;
    introAudio.play().then(
      () => {},
      () => {}
    );
  }
  introAudio.onended = async () => {
    await introAudio.play();
  };
}

function stopIntro() {
  introAudio.pause();
}

function playCastle() {
  if (castleAudio.paused || castleAudio.duration === 0) {
    castleAudio.play().then(
      () => {},
      () => {}
    );
  }
  castleAudio.onended = async () => {
    await castleAudio.play();
  };
}

function stopCastle() {
  castleAudio.pause();
}

function playMaze() {
  if (maze1Audio.paused || maze1Audio.duration === 0 || maze2Audio.paused || maze2Audio.duration === 0) {
    maze1Audio.play().then(
      () => {},
      () => {}
    );
  }
}

function stopMaze() {
  maze1Audio.pause();
  maze2Audio.pause();
}

function playBattle() {
  if (battleIntroAudio.paused || battleIntroAudio.duration === 0 || battleAudio.paused || battleAudio.duration === 0) {
    battleIntroAudio.currentTime = 0;
    battleIntroAudio.play().then(
      () => {},
      () => {}
    );
  }
}
function stopBattle() {
  battleIntroAudio.pause();
  battleAudio.pause();
}

export {
  maze1Audio,
  maze2Audio,
  playIntro,
  stopIntro,
  introAudio,
  playCastle,
  playMaze,
  stopCastle,
  stopMaze,
  playBattle,
  stopBattle,
};
