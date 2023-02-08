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
  const choice = createElement('div', choiceId, 'block pop-up');
  buttonsDesc.forEach((el) => {
    const newButt = createElement('button', el.id);
    newButt.innerHTML = el.name;
    choice.append(newButt);
  });
  return choice;
}
function createLayer(layerNum: number, layerContent: HTMLElement): HTMLElement {
  const newLayer = createElement('div', '', `layer layer${layerNum}`);
  layerContent.setAttribute(
    'style',
    `top: ${layerNum * 20}px; left:  ${layerNum * 15}px`
  );
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

export { createChoice, createElement, createLayer, getMain };
