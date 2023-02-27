// function removeParent(child: HTMLElement) {
//   child.parentElement?.remove();
// }
import { getMain, createElement } from './common';
import enterCastle from './castle/castle';
import logo from '../Assets/rsschool-logo.svg';
import { stopIntro } from './music';

function startGame() {
  const main = getMain();
  main.replaceChildren();
  main.append(createElement('div', '', 'game'));
  stopIntro();
  enterCastle();
}

function renderBasic() {
  const { body } = document;
  body.innerHTML = `
  <section class="footer-left">
    <a id="rs-link" href="https://rs.school/js/">
      <img id="rs-image" src=${logo as string}>
    </a>
  </section>
  <main class="main">
      <button class="button button-start" id="start-game">Start Game</button>
  </main>
  <section class="footer-right">
    <div id="year">2023</div>
    <ul id="github-list">
      <li><a class="link" href="https://github.com/VaultDweller13">Artyom Bagaev</a></li>
      <li><a class="link" href="https://github.com/oryngalikarimzhan">Oryngali Karimzhan</a></li>
      <li><a class="link" href="https://github.com/JaLongin">Vasili Drachou</a></li>
    </ul>
  </section>`;
  const startButton = document.getElementById('start-game');
  startButton?.addEventListener('click', startGame);
}

export default renderBasic;
