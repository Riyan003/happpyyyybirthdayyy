// Countdown Timer
const birthday = new Date('March 29, 2025 00:00:00 GMT+05:30').getTime(); // IST Time

const countdown = () => {
  const now = new Date().getTime();
  const difference = birthday - now;

  if (difference <= 0) {
    document.getElementById('timer').innerHTML = "It's your birthday! 🎉";
    document.getElementById('unlock-button').classList.remove('hidden');
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;
};

setInterval(countdown, 1000);

// Unlock Button
document.getElementById('unlock-button').addEventListener('click', () => {
  document.getElementById('homepage').classList.add('hidden');
  document.getElementById('memory-lane').classList.remove('hidden');
});
