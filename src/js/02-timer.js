// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateForm: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;
// дата, вибрана користувачем
let userDate = null;
// об"єкт опшинів(все,що міститься у змінній options),які ми передаємо до екземпляра flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //вбудований метод бібліотеки,який буде викликатися при закритті календаря
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate
      ? (Notiflix.Notify.failure('Please choose a date in the future'),
        // у випадку невдачі робить кнопку неактивною
        (refs.btnStart.disabled = true))
      : (Notiflix.Notify.success('The countdown has started'),
        // у випадку успіху робить кнопку активною
        (refs.btnStart.disabled = false));
    userDate = selectedDates[0];
  },
};
// функція,яка переводить у тижні,дні,години,секунди...готова з умови ДЗ
const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
// повертає різницю між обраною в календарі і поточною датою
const getDifferenceDate = () => userDate - new Date();
//додає нуль до одинарних чисел
const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};
// записує різницю дат в HTML
const setTimeToHTML = () => {
  const { days, hours, minutes, seconds } = convertMs(getDifferenceDate());
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
};
// на кнопку старт вішаємо слухача подій,який слухає клік і викликає хендлер функцію,яка перевіряє,чи є різниця між поточною датою і обраною.Якщо немає,то видаляє сетінтервал,а якщо різниця є,то викликає 1 за сек.функцію,яка оновлює дані в HTML
refs.btnStart.addEventListener('click', onStartTimer);
refs.btnStart.disabled = true;
flatpickr(refs.dateForm, options);
function onStartTimer(evt) {
  timerId = setInterval(() => {
    if (getDifferenceDate() <= 0) {
      clearInterval(timerId);
      return;
    }
    setTimeToHTML();
  }, 1000);
}
