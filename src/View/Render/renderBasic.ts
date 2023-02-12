// function removeParent(child: HTMLElement) {
//   child.parentElement?.remove();
// }
import { getMain, createElement } from './common';
import enterCastle from './castle/castle';

function startGame() {
  const main = getMain();
  main.replaceChildren();
  main.append(createElement('div', '', 'game'));
  enterCastle();
}

function renderBasic() {
  const { body } = document;
  body.innerHTML = `
  <main class="main">
    <div class="block">
      <button class="button" id="start-game">Start Game</button>
    </div>
  </main>
  <footer class="footer">
    <a id="rs-link" href="https://rs.school/js/">
      <img id="rs-image" src="https://rs.school/images/rs_school_js.svg">
    </a>
    <div id="year">2023</div>
    <ul id="github-list">
      <li><a class="link" href="https://github.com/VaultDweller13">Artem Bagaev</a></li>
      <li><a class="link" href="https://github.com/oryngalikarimzhan">Oryngali Karimzhan</a></li>
      <li><a class="link" href="https://github.com/JaLongin">Vasili Drachou</a></li>
    </ul>
  </footer>
  `;
  const startButton = document.getElementById('start-game');
  startButton?.addEventListener('click', startGame);
}

export default renderBasic;
