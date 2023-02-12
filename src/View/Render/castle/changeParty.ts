import { party, tavern } from "../partyInitializer";
import { createElement, getAC, renderParty } from "../common";

function changeParty(){
  const view = document.getElementById('view') as HTMLElement;
  view.style.backgroundImage = '';
  view.innerHTML = '';
  if (!view.classList.contains('tavern')){
    view.classList.add('tavern')
  }
  console.log('check');
  const partyArr = tavern.getParty();
  view.innerHTML = `
        <div class="prty-header">
          <div class="prty-param prty-names"><span class="param-wrap">Name</span></div>
          <div class="prty-param prty-classes"><span class="param-wrap">Class</span></div>
          <div class="prty-param prty-ac"><span class="param-wrap">AC?</span></div>
          <div class="prty-param prty-hp"><span class="param-wrap">HP /</span></div>
          <div class="prty-param prty-status"><span class="param-wrap">Status</span></div>
        </div>
        <div class="prty-body">
          ${partyArr
            .map(
              (character) =>
                `
          <div class="prty-chr" id="dummy-name">
            <div class="chr-name chr-param">${character.name}</div>
            <div class="chr-class chr-param">${character.alignment
              .slice(0, 1)
              .toUpperCase()}-${character.class.name
                  .slice(0, 3)
                  .toUpperCase()}-${character.race
                  .slice(0, 3)
                  .toUpperCase()}</div>
            <div class="chr-ac chr-param">${getAC(character)}</div>
            <div class="chr-hp chr-param">${character.getHp()}</div>
            <div class="chr-status chr-param">${character.status}</div>
          </div>
            `
            )
            .join('\n')}
        </div>
        <styles>
        </styles>
  `;
  renderParty();
}

export default changeParty;