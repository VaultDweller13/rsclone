import './styles.css';
import './View/styles.scss';
import renderBasic from './View/Render/renderBasic';
import assign from './View/Render/assigner';
import { test1Audio } from './View/Render/music';
// import setMonstersBlock from './tests/charTest';
// import './tests/charTest';

test1Audio.play().then(
  () => {console.log(test1Audio)},
  () => {}
);
console.log(test1Audio);
assign();
renderBasic();
