import { stopHero } from './hero.js';
import { stopFlashlight } from './flashlight.js';
import { hideDialog } from './dialog.js';
import { showFinaleCta } from './offer.js';

export function startFinale() {
  hideDialog();
  stopHero();
  stopFlashlight();
  document.querySelectorAll('.artifact-hit').forEach((btn) => {
    btn.disabled = true;
  });
  document.querySelector('.stage')?.classList.add('is-finale');

  // позже: смена спрайта на happy, потом CTA
  setTimeout(showFinaleCta, 1500);
}
