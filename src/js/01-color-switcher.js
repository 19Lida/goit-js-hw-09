// генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let timerId = null;

//  додаємо слухачів подій
refs.btnStart.addEventListener('click', onClickShowColor);
refs.btnStop.addEventListener('click', onClickStopColor);

// функція показу кольору
function onClickShowColor() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  timerId = setInterval(() => {
    refs.body.style.background = getRandomHexColor();
  }, 1000);
}
// функція Стоп кольору
function onClickStopColor() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(timerId);
}
