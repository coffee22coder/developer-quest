let timer = null;

export function initDialog() {
  /* refs + click to skip */
}

export function showDialog({ text, speed = 35, buttons = [] }) {
  const panel = document.querySelector('.dialog-panel');
  const textEl = panel.querySelector('.dialog-panel__text');
  const actions = panel.querySelector('.dialog-panel__actions');

  clearInterval(timer);
  panel.hidden = false;
  actions.innerHTML = '';
  textEl.textContent = '';

  let i = 0;
  timer = setInterval(() => {
    textEl.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(timer);
      renderButtons(actions, buttons);
    }
  }, speed);
}

function renderButtons(container, buttons) {
  buttons.forEach(({ label, onClick }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.className = 'dialog-panel__btn';
    btn.addEventListener('click', onClick);
    container.appendChild(btn);
  });
}

export function hideDialog() {
  const panel = document.querySelector('.dialog-panel');
  panel.hidden = true;
}

export function skipDialog() {
  const panel = document.querySelector('.dialog-panel');
  panel.hidden = true;
}
