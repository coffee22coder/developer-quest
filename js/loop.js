const subs = new Set();
let prev = 0;

export function onFrame(fn) {
  subs.add(fn);
  return () => subs.delete(fn); // функция отписки — понадобится в финале
}

function tick(now) {
  const dt = Math.min(now - prev, 50); // clamp от прыжка после возврата на вкладку
  prev = now;
  for (const fn of subs) fn(dt);
  requestAnimationFrame(tick);
}

export function startLoop() {
  prev = performance.now();
  requestAnimationFrame(tick);
}
