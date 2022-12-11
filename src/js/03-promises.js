import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((reolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const form = document.querySelector('form');
const submitBtn = document.querySelector('button');

form.addEventListener('submit', getPromise);

function getPromise(event) {
  event.preventDefault();

  Notiflix.Notify.success(`Fulfilled promise ms`);
  form.reset();
}