import { onFrame } from './loop.js';
import { toStage, BASE_W, BASE_H } from './stage.js';

let unsubscribe = null;

const el = document.querySelector('.layer--flashlight');

let tgtX = BASE_W / 2,
  tgtY = BASE_H / 2; // цель — куда тянемся
let curX = tgtX,
  curY = tgtY; // текущее — где сейчас

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const onMove = (e) => {
  const p = toStage(e.clientX, e.clientY);
  tgtX = clamp(p.x, 0, BASE_W);
  tgtY = clamp(p.y, 0, BASE_H);
};

export const initFlashlight = () => {
  addEventListener('mousemove', onMove, { passive: true });

  unsubscribe = onFrame((dt) => {
    // 1) коэффициент, нормированный на 60fps: k = 1 - (1 - 0.15) ** (dt / 16.67)
    // 2) curX += (tgtX - curX) * k, то же для Y
    // 3) el.style.transform = translate3d(curX - BASE_W/2, curY - BASE_H/2, 0) в px
    const k = 1 - (1 - 0.15) ** (dt / 16.67);
    curX += (tgtX - curX) * k;
    curY += (tgtY - curY) * k;
    el.style.transform = `translate3d(${curX - BASE_W / 2}px, ${curY - BASE_H / 2}px, 0)`;
  });
};

export function stopFlashlight() {
  removeEventListener('mousemove', onMove);
  unsubscribe?.();
  unsubscribe = null;
  el.classList.add('is-off');
}
