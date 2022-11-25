import Notiflix from 'notiflix';
const refs = {
  formEl: document.querySelector('form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="stap"]'),
  amountEl: document.querySelector('input[name="amount"]'),
};
refs.formEl.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();

  let { delay, stap, amount } = onGettingData();
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    // delay = +step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onGettingData() {
  return {
    delay: Number(refs.delayEl.value),
    step: Number(refs.stepEl),
    amount: Number(refs.amountEl.value),
  };
}
