// Countdown Timer
// Temporary Countdown (1 minute from now)
const birthday = new Date(Date.now() + 60000).getTime(); // 1 minute from now
console.log('Countdown set to:', new Date(birthday));

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
  document.getElementById('game').classList.remove('hidden'); // Show the game section
});
// Start Game
startButton.addEventListener('click', () => {
  console.log('Game started!');
  gameStarted = true;
  startButton.style.display = 'none';
  moveEmoji();
});

// Move Emoji
const moveEmoji = () => {
  if (!gameStarted) return;
  console.log('Moving emoji...');

  // Rest of the game logic...
  // Game Variables
const paddle = document.getElementById('paddle');
const emoji = document.getElementById('emoji');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
let score = 0;
let emojiX = 50;
let emojiY = 50;
let emojiSpeedX = 3;
let emojiSpeedY = 3;
let gameStarted = false;

// Start Game
startButton.addEventListener('click', () => {
  console.log('Game started!');
  gameStarted = true;
  startButton.style.display = 'none';
  moveEmoji();
});

// Move Paddle
document.addEventListener('mousemove', (e) => {
  if (!gameStarted) return;

  const container = document.getElementById('game-container');
  const containerRect = container.getBoundingClientRect();
  const paddleX = e.clientX - containerRect.left - paddle.offsetWidth / 2;

  // Ensure paddle stays within the game container
  if (paddleX < 0) {
    paddle.style.left = '0px';
  } else if (paddleX + paddle.offsetWidth > containerRect.width) {
    paddle.style.left = `${containerRect.width - paddle.offsetWidth}px`;
  } else {
    paddle.style.left = `${paddleX}px`;
  }
});

// Move Emoji
const moveEmoji = () => {
  if (!gameStarted) return;

  const container = document.getElementById('game-container');
  const containerRect = container.getBoundingClientRect();
  const emojiRect = emoji.getBoundingClientRect();

  // Check Collision with Walls
  if (emojiX + emojiRect.width > containerRect.width || emojiX < 0) {
    emojiSpeedX = -emojiSpeedX;
  }
  if (emojiY < 0) {
    emojiSpeedY = -emojiSpeedY;
  }

  // Check Collision with Paddle
  if (
    emojiY + emojiRect.height > paddle.offsetTop &&
    emojiX + emojiRect.width > paddle.offsetLeft &&
    emojiX < paddle.offsetLeft + paddle.offsetWidth
  ) {
    emojiSpeedY = -emojiSpeedY;
    score++;
    scoreDisplay.innerText = `Score: ${score}`;

    // Unlock Chatbot at 10 Points
    if (score === 10) {
      alert('You unlocked the chatbot! 🎉');
      document.getElementById('chatbot-button').style.display = 'block';
    }
  }

  // Update Emoji Position
  emojiX += emojiSpeedX;
  emojiY += emojiSpeedY;
  emoji.style.left = `${emojiX}px`;
  emoji.style.top = `${emojiY}px`;

  // Game Over
  if (emojiY + emojiRect.height > containerRect.height) {
    alert('Game Over! Try again.');
    resetGame();
  }

  requestAnimationFrame(moveEmoji);
};

// Reset Game
const resetGame = () => {
  emojiX = 50;
  emojiY = 50;
  score = 0;
  scoreDisplay.innerText = `Score: ${score}`;
  startButton.style.display = 'block';
  gameStarted = false;
};
};