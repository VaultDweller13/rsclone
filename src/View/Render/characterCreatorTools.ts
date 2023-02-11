import die from '../Assets/die.svg';

function setStatClassHtml(bonus: number): string {
  return `<div id='stats' class="block column">
  <div id="stats-table">
  </div>
  <div class='bonus-cont'>
  Bonus <span id='bonus'>${bonus}</span>
    <div class='block input' id="reroll">
      <img src="${die as string}" alt="reroll">
    </div>
  </div>
</div>
<div id ="classes" class="block column">
  <div id="confirm" class="button block inactive" >Confirm</div>
  <style>
    #confirm{
      position:absolute;
      border: 3px #fff solid;
      bottom: 15px;
      right: 15px;
    }
  </style>
</div>
<style>
  #stats-class{
    display: flex;
  }
  .column{
    width: 45%;
    position:relative;
  }
  .stat-line{
    display: flex;
    justify-content: space-between;
  }
  .stat-wrap {
    width: 70px;
    display: flex;
    justify-content: space-between;
  }
  #reroll{
    max-height: 34px;
    max-width: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5px;
  }
  #reroll img{
    height: 80%;
    width: 80%;
  }
  #stats .button{
    border:2px #ffffff solid;
    border-radius: 5px
  }
  #classes .button{
    text-align:center;
  }
</style>
;`;
}

function setLineHtml(stat: Stat, statValue: number): string {
  return `
  <span class='stat-name'>${stat}</span> 
  <span class="stat-wrap">
    <button class="decrease button inactive">←</button>
    <span class="stat-value">${statValue}</span>
    <button class="increase button">→</button>
  </span>
`;
}

function setRaceHtml(name: string): string {
  return `
  <div id="location-name" class="block">
  Tavern
  </div>
  <div id="current-char" class="block">
  <div id="cur-name">${name}</div>
  <div id="lvl">L</div>
  <div id="lvl-val">1</div>
  <div><span id="cur-align">???</span id="cur-class">-<span>???</span></div>
  <div id="race">???</div>
  </div>
  <style>
    #current-char{
      display: flex;
      justify-content: space-between;
    }
  </style>
  `;
}

function setNameHtml(): string {
  return `
  <div id="location-name" class="block">
  Tavern
  </div>
  <form class="block pop-up center form" id="enter-name">
    <label for="new-name">Enter name of the new character</label>
    <br>
    <input type="text" id="new-name" class="input">
    <input type="submit" class="input" value="Submit">
  </form>
  `;
}

function removeClassInactive(className: string) {
  document.querySelectorAll(`.${className}`).forEach((block) => {
      block.classList.remove('inactive');
  });
}

export {
  setLineHtml,
  setStatClassHtml,
  setRaceHtml,
  setNameHtml,
  removeClassInactive,
};
