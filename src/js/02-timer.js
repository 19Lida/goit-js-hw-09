// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init();
  }
  start() {
    if (this.isActive) {
      return;
    }
    init() {
      const time = convertMs(0);
      this.onTick(time);
    }

    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.convertMs(deltaTime);
      // console.log(time);
      this.onTick(time);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
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
}

addLeaingZero(value) {
  return String(value).padStart(2, 0)
}
const timer = new Timer({
  onTick: updateClockFase,
});


refs.btnStart.addEventListener('click', onBtnClickStart);

function updateClockFase({ days, hours, minutes, seconds }) {
  refs.clockface.textContent = `${days}: ${hours}: ${minutes}: ${seconds}`;
}
function onBtnClickStart() {
  timer.start();
}
// const timer = {
//   intervalId: null,
//   isActive: false,

 
// start() {
//   if (this.isActive) {
//     return;
//   }

//     const startTime = Date.now();
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = startTime - currentTime;
//       const time = this.convertMs(deltaTime);
//       // console.log(time);
//       this.onTick(time);
//     }, 1000);
//   }
//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   }

// const timer = new Timer();

