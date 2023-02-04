function renderBasic(){
  const { body } = document;
  body.innerHTML =
  `
  <main id ="main">
    <button id="start-game">Start Game</button>
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
}
function startGame() {
  const startButton = document.getElementById('start-game');
  startButton?.addEventListener('click', () => {
    const gameBlock = document.createElement('div');
    gameBlock.setAttribute('id','game-block');
    startButton.remove();
    document.getElementById('main')?.append(gameBlock);
  });
}

export { renderBasic, startGame };