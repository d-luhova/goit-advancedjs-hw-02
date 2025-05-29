import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;
let timerId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0]; // зберігаємо дату одразу
      
        if (userSelectedDate <= new Date()) {
          iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
          });
          startBtn.disabled = true;
          return;
        }
        startBtn.disabled = false;
      }
};

flatpickr(datePicker, options);

startBtn.addEventListener('click', () => {
    if (!userSelectedDate) return;
  
    startBtn.disabled = true;
    datePicker.disabled = true;
  
    timerId = setInterval(() => {
      const now = new Date();
      const ms = userSelectedDate - now;
  
      if (ms <= 0) {
        clearInterval(timerId);
        updateTimerDisplay(0);
        datePicker.disabled = false;
        return;
      }
  
      updateTimerDisplay(ms);
    }, 1000);
  });
  
  function updateTimerDisplay(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  


  