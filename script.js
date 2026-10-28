// 1. CUENTA REGRESIVA REAL AL MUNDIAL 2030
const targetDate = new Date('2030-06-08T00:00:00-03:00').getTime();

const MS_SECOND = 1000;
const MS_MINUTE = MS_SECOND * 60;
const MS_HOUR = MS_MINUTE * 60;
const MS_DAY = MS_HOUR * 24;
const MS_WEEK = MS_DAY * 7;

const countdownElements = {
  weeks: document.getElementById('weeks'),
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function pad(value, length = 2) {
  return value.toString().padStart(length, '0');
}

function updateCountdown() {
  const distance = Math.max(targetDate - Date.now(), 0);

  countdownElements.weeks.textContent = pad(Math.floor(distance / MS_WEEK), 3);
  countdownElements.days.textContent = pad(Math.floor((distance % MS_WEEK) / MS_DAY));
  countdownElements.hours.textContent = pad(Math.floor((distance % MS_DAY) / MS_HOUR));
  countdownElements.minutes.textContent = pad(Math.floor((distance % MS_HOUR) / MS_MINUTE));
  countdownElements.seconds.textContent = pad(Math.floor((distance % MS_MINUTE) / MS_SECOND));

  if (distance === 0) {
    clearInterval(countdownTimer);
  }
}

updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// 2. ENLACE ACTIVO DEL MENÚ AL HACER SCROLL
const sections = document.querySelectorAll('.hero, section');
const navLinks = document.querySelectorAll('.header__link');

window.addEventListener('scroll', () => {
  let current = 'inicio';

  sections.forEach((section) => {
    // Se restan 100px para compensar la altura del menú fijo
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('header__link--active', link.getAttribute('href') === `#${current}`);
  });
});

// 3. CERRAR EL MENÚ EN CELULAR AL ELEGIR UNA OPCIÓN
const navCollapse = document.getElementById('navbarNav');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navCollapse.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});

// 4. MENSAJE DE CONFIRMACIÓN DEL FORMULARIO
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formSuccess.hidden = false;
  contactForm.reset();
});