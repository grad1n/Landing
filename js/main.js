// js/main.js
// Обработка формы (отправка в WhatsApp) и слайдер прайсов.
// Подключать с атрибутом defer.

(function () {
  // --- Конфигурация ---
  const WHATSAPP_NUMBER = '+79276348928'; // замените на ваш номер: countrycode+number
  const SLIDER_ID = 'pricesSlider';
  const SCROLL_RATIO = 0.8; // сколько ширины слайдера прокручивать за один шаг

  // --- Форма ---
  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = encodeURIComponent((form.name.value || 'Имя').trim());
    const phone = encodeURIComponent((form.phone.value || 'Телефон').trim());
    const proc = encodeURIComponent((form.procedure.value || 'Процедура').trim());
    const comment = encodeURIComponent((form.comment.value || '').trim());

    const text = `Заявка:%0AИмя: ${name}%0AТелефон: ${phone}%0AПроцедура: ${proc}%0AКомментарий: ${comment}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    window.open(waUrl, '_blank', 'noopener');

    // Показать сообщение "Спасибо"
    const msg = document.getElementById('formMsg');
    if (msg) {
      msg.style.display = 'block';
      // скрыть через 6 секунд
      setTimeout(() => { msg.style.display = 'none'; }, 6000);
    }
    form.reset();
  }

  function initForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;
    form.addEventListener('submit', handleFormSubmit);
    // кнопка сброса работает из HTML onclick или можно привязать здесь
    const resetBtn = form.querySelector('button[type="button"]');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      form.reset();
      const msg = document.getElementById('formMsg');
      if (msg) msg.style.display = 'none';
    });
  }

  // --- Slider ---
  function initSlider() {
    const slider = document.getElementById(SLIDER_ID);
    if (!slider) return;

    const leftBtn = document.querySelector('.slide-btn.left');
    const rightBtn = document.querySelector('.slide-btn.right');

    function getStep() {
      return Math.round(slider.clientWidth * SCROLL_RATIO);
    }

    if (leftBtn) {
      leftBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -getStep(), behavior: 'smooth' });
      });
    }
    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        slider.scrollBy({ left: getStep(), behavior: 'smooth' });
      });
    }
    // --- Promo Slider ---
  function initPromoSlider() {
    const slider = document.getElementById("promoSlider");
    if (!slider) return;

    const left = document.querySelector("#special .slide-btn.left");
    const right = document.querySelector("#special .slide-btn.right");

    function step() {
      return Math.round(slider.clientWidth * 0.8);
    }

    left?.addEventListener("click", () => slider.scrollBy({ left: -step(), behavior: "smooth" }));
    right?.addEventListener("click", () => slider.scrollBy({ left: step(), behavior: "smooth" }));

    // свайп
    let startX = 0;
    slider.addEventListener("touchstart", e => startX = e.touches[0].clientX, { passive: true });
    slider.addEventListener("touchmove", e => {
      const dx = startX - e.touches[0].clientX;
      slider.scrollLeft += dx;
      startX = e.touches[0].clientX;
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initPromoSlider();
  });


    // Поддержка свайпа на тач-устройствах (микро-реализация)
    let startX = 0;
    let isTouching = false;
    slider.addEventListener('touchstart', (e) => {
      isTouching = true;
      startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      if (!isTouching) return;
      const x = e.touches[0].clientX;
      const dx = startX - x;
      // немножко прокручиваем во время свайпа для отклика
      slider.scrollLeft += dx;
      startX = x;
    }, { passive: true });

    slider.addEventListener('touchend', () => { isTouching = false; });
  }

  // Инициализация при загрузке DOM
  document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initSlider();
  });
})();



