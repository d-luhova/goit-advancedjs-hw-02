import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const resolveRadio = document.querySelector('input[value="fulfilled"]');
const rejectRadio = document.querySelector('input[value="rejected"]');
const delayInput = document.querySelector('input[name="delay"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resolveRadio.checked) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
  .then((delay) => {
    iziToast.success({ title: 'Fulfilled', message: `Fulfilled promise in ${delay}ms` });
  })
  .catch((delay) => {
    iziToast.error({ title: 'Rejected', message: `Rejected promise in ${delay}ms` });
  });
});
