import ChoiceButton from './choice';

function createElement(tag: string, id: string, elClass?: string): HTMLElement {
  const newEl = document.createElement(tag);
  if (elClass) {
    newEl.setAttribute('class', elClass);
  }
  if (id) {
    newEl.setAttribute('id', id);
  }
  return newEl;
}
function createChoice(
  choiceId: string,
  buttonsDesc: ChoiceButton[]
): HTMLElement {
  const choice = createElement('div', choiceId, 'block pop-up center');
  buttonsDesc.forEach((el) => {
    const newButton = createElement('button', el.id, 'button');
    newButton.innerHTML = el.name;
    if (el.func !== undefined) {
      newButton.addEventListener('click', el.func as EventListener);
    }
    choice.append(newButton);
  });
  return choice;
}
function createLayer(layerNum: number, layerContent: HTMLElement): HTMLElement {
  const newLayer = createElement('div', '', `layer layer${layerNum}`);
  switch (layerNum) {
    case 1:
      layerContent.classList.add('left');
      break;
    case 2:
    case 3:
      layerContent.classList.add('center');
      break;
    default:
      break;
  }
  newLayer.append(layerContent);
  newLayer.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('layer')) {
      newLayer.remove();
    }
  });
  return newLayer;
}
function getMain(): HTMLElement {
  return document.querySelector('.main') as HTMLElement;
}
function getParty(): HTMLElement {
  return document.querySelector('.prty') as HTMLElement;
}
// function hideBlock(block: HTMLElement){
//   if (!block.classList.contains('hidden')){
//     block.classList.toggle('hidden');
//   }
// }
function showBlock(block: HTMLElement) {
  if (block.classList.contains('hidden')) {
    block.classList.toggle('hidden');
  }
}
function warning(warnText: string) {
  const view = document.getElementById('view') as HTMLElement;
  const warnBlock = createElement('div', '', 'block pop-up center');
  warnBlock.textContent = warnText;
  view.append(createLayer(3, warnBlock));
}
function renderParty() {
  const party = createElement('div', '', 'prty block');
  party.innerHTML = `
  <div class="prty block">
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
    `;
}

function resetPage() {
  const gamePage = document.querySelector('.game') as HTMLElement;
  gamePage.replaceChildren();
  const view = createElement('div', 'view', 'block');
  const prtyBlock = createElement('div', '', 'prty block');
  view.innerHTML = `
        <div id="location-name" class="block">
        </div>
  `;
  prtyBlock.innerHTML = `
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
  `;
  gamePage.append(view);
  gamePage.append(prtyBlock);
}
export {
  createChoice,
  createElement,
  createLayer,
  getMain,
  showBlock,
  warning,
  getParty,
  renderParty,
  resetPage,
};
