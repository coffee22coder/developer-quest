const MUSIC = { src: 'assets/sound/minus_opt.mp3', volume: 0.3 };
const CITY = [
  { src: 'assets/sound/city1_opt.mp3', volume: 0.75 },
  { src: 'assets/sound/city2_opt.mp3', volume: 0.75 },
];

let music = null;
let city = null;
let cityIdx = 0;
let enabled = false;

export function initSound() {
  const btn = document.querySelector('.menu-hit--sound');
  const volImg = document.querySelector('.menu-layer--vol');
  if (!btn || !volImg) return;

  music = new Audio(MUSIC.src);
  music.loop = true;
  music.volume = MUSIC.volume;
  music.preload = 'auto';

  city = new Audio(CITY[0].src);
  city.loop = false; // смена трека на ended
  city.volume = CITY[0].volume;
  city.preload = 'auto';

  city.addEventListener('ended', () => {
    if (!enabled) return;
    cityIdx = (cityIdx + 1) % CITY.length;
    city.src = CITY[cityIdx].src;
    city.volume = CITY[cityIdx].volume;
    city.play().catch(() => {});
  });

  const render = () => {
    btn.setAttribute('aria-pressed', String(enabled));
    btn.setAttribute('aria-label', enabled ? 'Sound off' : 'Sound on');
    volImg.src = enabled ? 'assets/menu/vol+.png' : 'assets/menu/vol-.png';
  };

  btn.addEventListener('click', () => {
    enabled = !enabled;
    if (enabled) {
      music.play().catch(() => {});
      city.play().catch(() => {});
    } else {
      music.pause();
      city.pause();
    }
    render();
  });

  render();
}
