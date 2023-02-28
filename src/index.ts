import './styles.css';
import './View/styles.scss';
import renderBasic from './View/Render/renderBasic';
import assign from './View/Render/assigner';
import { playIntro } from './View/Render/music';
// import setMonstersBlock from './tests/charTest';
// import './tests/charTest';


playIntro();
assign();
renderBasic();
