let blinkTimer = null;
let blinking = true;
let frames = null;

const showFrame = (index) => {
  frames.forEach((el, i) => el.classList.toggle('is-active', i === index));
};

const blinkHero = () => {
  if (!blinking) return;
  let index = 0;
  for (let i = 0; i < frames.length - 1; i++) {
    setTimeout(() => {
      showFrame(i);
    }, index * 100);
    index++;
  }

  for (let i = frames.length - 3; i >= 0; i--) {
    setTimeout(() => {
      showFrame(i);
    }, index * 100);
    index++;
  }
  setTimeout(scheduleNext, (frames.length * 2 - 2) * 100);
};

const scheduleNext = () => {
  if (!blinking) return;
  blinkTimer = setTimeout(blinkHero, 1000 + Math.random() * 1500);
};

export const initHero = () => {
  frames = document.querySelectorAll('.hero-frame');

  scheduleNext();
};

export const stopHero = () => {
  blinking = false;
  clearTimeout(blinkTimer);
  showFrame(3); // hero_1 — открытые глаза
};
