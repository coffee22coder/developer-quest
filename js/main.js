import { initStage } from './stage.js';
import { startLoop } from './loop.js';
import { initFlashlight } from './flashlight.js';
import { initHero } from './hero.js';
import { initArtifacts, skipQuest } from './arttifacts.js';
import { initSound } from './sound.js';
import { showDialog, hideDialog, skipDialog } from './dialog.js';
import { initIntro } from './intro.js';
import { initOffer } from './offer.js';

initStage();
initFlashlight();
startLoop();
initHero();
initArtifacts();
initSound();
initOffer();
initIntro(() => {
  showDialog({
    text: 'Привет! Меня зовут Женя. Я хотел сделать резюме поинтереснее — и слишком увлёкся: контакты и резюме куда-то спрятались в этой комнате. Поможешь найти? Иначе так и не доберусь до собеседования)',
    buttons: [
      { label: 'Погнали', onClick: () => hideDialog() },
      { label: 'Пропустить', onClick: () => skipQuest() },
    ],
  });
});
