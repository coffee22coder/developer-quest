export const BASE_W = 1920;
export const BASE_H = 1080;

const stageEl = document.querySelector('.stage');
let scale = 1;
let rect = { left: 0, top: 0 };

export const getScale = () => scale;

export function toStage(clientX, clientY) {
  return { x: (clientX - rect.left) / scale, y: (clientY - rect.top) / scale };
}

function fit() {
  scale = Math.min(innerWidth / BASE_W, innerHeight / BASE_H);
  document.documentElement.style.setProperty('--s', scale);
  rect = stageEl.getBoundingClientRect();
}

export function initStage() {
  fit();
  addEventListener('resize', fit, { passive: true });
}
