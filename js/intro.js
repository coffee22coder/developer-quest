export function initIntro(onComplete) {
  const el = document.querySelector('.intro');
  if (!el) {
    onComplete?.();
    return;
  }

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    el.remove();
    onComplete?.();
  };

  const startFade = () => {
    console.log('intro: startFade'); // временно
    el.classList.add('is-fading');
    el.addEventListener(
      'transitionend',
      (e) => {
        if (e.propertyName === 'opacity') finish();
      },
      { once: true },
    );
    setTimeout(finish, 3200);
  };

  // вешаем на сам чёрный слой, не на window
  el.addEventListener('pointerdown', startFade, { once: true });
  el.addEventListener('pointermove', startFade, { once: true });
}
