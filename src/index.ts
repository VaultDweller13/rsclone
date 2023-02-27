import './styles.css';
import './View/styles.scss';
import renderBasic from './View/Render/renderBasic';
import assign from './View/Render/assigner';
import { playIntro, stopIntro, introAudio } from './View/Render/music';
// import setMonstersBlock from './tests/charTest';
// import './tests/charTest';


playIntro();
introAudio.play().then(
  () => {},
  () => {}
);
console.log(playIntro);
assign();
renderBasic();
