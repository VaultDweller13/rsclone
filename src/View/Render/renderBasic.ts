// function removeParent(child: HTMLElement) {
//   child.parentElement?.remove();
// }
import { createElement } from "./common";
import enterCastle from "./castle";

function startGame() {
  const gameBlock = createElement('div', 'game');
  
  document.getElementById('main')?.append(gameBlock);
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = 
  `
    <div id="game">
      <div id="view" class="block">
        <div id="location-name" class="block">
        </div>
      </div>
      <div id="prty" class="block">
        <div id="prty-header">
          <div class="prty-param" id="prty-names"><span class="param-wrap">Name</span></div>
          <div class="prty-param" id="prty-classes"><span class="param-wrap">Class</span></div>
          <div class="prty-param" id="prty-ac"><span class="param-wrap">AC?</span></div>
          <div class="prty-param" id="prty-hp"><span class="param-wrap">HP /</span></div>
          <div class="prty-param" id="prty-status"><span class="param-wrap">Status</span></div>
        </div>
        <div class="prty-body">
          <div class="prty-chr" id="dummy-name">
            <div class="chr-name chr-param">Naminous</div>
            <div class="chr-class chr-param">NamIni</div>
            <div class="chr-ac chr-param">15s</div>
            <div class="chr-hp chr-param">8</div>
            <div class="chr-status chr-param">8</div>
          </div>
        </div>
      </table>
    </div>
  `
  enterCastle();
}

function renderBasic(){
  const { body } = document;
  body.innerHTML =
  `
  <main id ="main">
    <div class="block">
      <button id="start-game">Start Game</button>
    </div>
  </main>
  <footer id="footer">
    <a id="rs-link" href="https://rs.school/js/">
      <img id="rs-image" src="https://rs.school/images/rs_school_js.svg">
    </a>
    <div id="year">2023</div>
    <ul id="github-list">
      <li><a href="https://github.com/VaultDweller13">Artem Bagaev</a></li>
      <li><a href="https://github.com/oryngalikarimzhan">Oryngali Karimzhan</a></li>
      <li><a href="https://github.com/JaLongin">Vasili Drachou</a></li>
    </ul>
  </footer>
  `;
  /* const main = createElWId('main', 'main');
  const footer = createElWId('footer', 'footer');
  body.append(main);
  body.append(footer);
  const rsLink = createElWId('a', 'rs-link');
  const rsImage = createElWId('img', 'rs-image');
  const year = createElWId('div', 'year');
  const githubList = createElWId('ul', 'github-list');
  */
  const startButton = document.getElementById('start-game');
  startButton?.addEventListener('click', startGame);
}
// function renderCastle(){
//   const gameBlock = document.getElementById('game');
//   const backBlock = createElement('div','a');
// }

export default renderBasic;