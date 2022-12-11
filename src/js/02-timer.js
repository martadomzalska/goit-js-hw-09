import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let presentDate = new Date().getTime();
    if (selectedDates[0].getTime() <= presentDate) {
      alert('Please choose a date in the future');
    } else {
      button.removeAttribute('disabled');
      button.addEventListener('click', () => {
        intervalId = setInterval(() => {
          let presentDate = new Date().getTime();
          ms = selectedDates[0] - presentDate;
          convertMs(ms);
          if (ms >= 0) {
            let time = convertMs(ms);
            secondsValue.innerHTML = addLeadingZero(time.seconds);
            minutesValue.innerHTML = addLeadingZero(time.minutes);
            hoursValue.innerHTML = addLeadingZero(time.hours);
            daysValue.innerHTML = addLeadingZero(time.days);
          } else {
            clearInterval(intervalId);
          }
        }, 1000);
      });
    }
  },
};

let daysValue = document.querySelector('span[data-days]');
let hoursValue = document.querySelector('span[data-hours]');
let minutesValue = document.querySelector('span[data-minutes]');
let secondsValue = document.querySelector('span[data-seconds]');
let button = document.querySelector('button');
button.setAttribute('disabled', true);

let intervalId = null;
let ms = null;

function convertMs(ms) {
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

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  if (value < 10) {
    value = value.toString().padStart(2, '0');
    return value;
  } else {
    return value;
  }
}
