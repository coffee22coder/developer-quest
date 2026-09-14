import { showDialog, hideDialog } from './dialog.js';
import { startFinale } from './finale.js';
import { playSfx } from './sound.js';

const FOUND_TEXT = {
  cat: 'Нашёл! Это GitHub — репозитории на месте. Смотри панель сверху.',
  cv: 'Резюме на hh восстановлено. Полдела сделано!',
  phone: 'Telegram найден. Можно писать напрямую!',
};

const artifacts = new Set(['cat', 'phone', 'cv']);

let artifactsFound = new Set();

function unlockReward(id) {
  const key = { cat: 'github', cv: 'hh', phone: 'telegram' }[id];
  document.querySelectorAll(`[data-reward="${key}"]`).forEach((el) => {
    el.hidden = false;
    el.classList.remove('is-locked');
  });
}

export function initArtifacts() {
  document.querySelectorAll('.artifact-hit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      artifactsFound.add(id);
      unlockReward(id);
      if (artifactsFound.size === 3) {
        showDialog({
          text: 'Отлично, всё на месте! Без тебя бы ещё долго искал. Если хочешь продолжить знакомство — жми кнопку)',
          buttons: [{ label: 'OK', onClick: startFinale }],
        });
        playSfx('allFound');
      } else {
        playSfx(id);
        showDialog({
          text: FOUND_TEXT[id],
          buttons: [{ label: 'OK', onClick: hideDialog }],
        });
      }

      btn.disabled = true;
      const img = document.querySelector(`.artifact-visual--${id}`);
      if (img) {
        img.classList.add('is-found');
      }
    });
  });
}

export function skipQuest() {
  for (const id of artifacts) {
    artifactsFound.add(id);
    unlockReward(id);
  }
  showDialog({
    text: 'Отлично, всё на месте! Без тебя бы ещё долго искал. Если хочешь продолжить знакомство — жми кнопку)',
    buttons: [{ label: 'OK', onClick: startFinale }],
  });
}
