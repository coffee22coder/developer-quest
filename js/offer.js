const WEB3FORMS_KEY = '71640098-8e84-453a-8719-bd09d188a732';

const DESIGN_W = 1100;
const MODAL_PAD = 48;

const MATRIX = {
  150: { office: 'sui', hybrid: 'sui', remote: 'sui' },
  200: { office: 'sui', hybrid: 'leb', remote: 'leb' },
  250: { office: 'leb', hybrid: 'leb', remote: 'neo' },
  300: { office: 'leb', hybrid: 'neo', remote: 'neo' },
  350: { office: 'term', hybrid: 'term', remote: 'term' },
};

const PERSONA = {
  sui: { label: 'Повешенный', caption: 'Такой оффер я не переживу' },
  leb: { label: 'Лебовски', caption: 'Где оффер, Лебовски?' },
  neo: {
    label: 'Нео',
    caption: 'Матрица — это система, Нео.',
  },
  term: {
    label: 'Терминатор',
    caption: 'Мне нужны твоя одежда, ботинки и мотоцикл',
  },
};

function getSprite({ salary, mode }) {
  return MATRIX[salary]?.[mode] ?? 'leb';
}

function readForm(form) {
  const data = new FormData(form);
  return {
    salary: Number(data.get('salary')),
    mode: data.get('mode'),
    contact: String(data.get('contact') || '').trim(),
    company: String(data.get('company') || '').trim(),
  };
}

function updateSpritePreview(form) {
  const values = readForm(form);
  const sprite = getSprite(values);
  form.querySelectorAll('.offer-sprite').forEach((img) => {
    img.classList.toggle('is-active', img.dataset.sprite === sprite);
  });
  const caption = form.querySelector('.offer-sprite__caption');
  if (caption) caption.textContent = PERSONA[sprite].caption;
  const salaryLabel = form.querySelector('#offer-salary-label');
  if (salaryLabel) salaryLabel.textContent = String(values.salary);
}

export const initOffer = () => {
  const modal = document.querySelector('.offer-modal');
  const form = document.querySelector('#offer-form');
  const cta = document.querySelector('.finale-cta');
  const status = form?.querySelector('.offer-form__status');
  if (!modal || !form || !cta) return;

  const open = () => {
    modal.hidden = false;
    document.querySelector('.stage')?.classList.add('is-offer');
    updateSpritePreview(form);

    requestAnimationFrame(fitOfferPanel);
  };

  const close = () => {
    modal.hidden = true;
    document.querySelector('.stage')?.classList.remove('is-offer');
  };

  cta.addEventListener('click', open);
  modal.querySelectorAll('[data-close-offer]').forEach((el) => {
    el.addEventListener('click', close);
  });

  form.addEventListener('input', () => updateSpritePreview(form));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = readForm(form);
    const sprite = getSprite(values);
    status.hidden = false;
    status.textContent = 'Отправка…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Оффер с CV-квеста',
          salary: `${values.salary}k`,
          mode: values.mode,
          contact: values.contact,
          company: values.company || '—',
          sprite,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'fail');
      status.textContent = 'Отправлено! Я скоро отвечу.';
      form.reset();
      updateSpritePreview(form);
    } catch (err) {
      console.error(err);
      status.textContent = 'Не вышло отправить. Напиши в Telegram.';
    }
  });
};

export const showFinaleCta = () => {
  const cta = document.querySelector('.finale-cta');
  if (cta) cta.hidden = false;
};

function fitOfferPanel() {
  const modal = document.querySelector('.offer-modal');
  const scaler = document.querySelector('.offer-modal__scaler');
  if (!modal || !scaler || modal.hidden) return;
  scaler.style.setProperty('--offer-s', '1'); // сброс для замера
  const naturalH = scaler.offsetHeight;
  const s = Math.min(
    (innerWidth - MODAL_PAD) / DESIGN_W,
    (innerHeight - MODAL_PAD) / naturalH,
    1,
  );
  scaler.style.setProperty('--offer-s', String(s));
}

addEventListener('resize', fitOfferPanel, { passive: true });
