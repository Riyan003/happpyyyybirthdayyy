// Temporary Countdown (1 minute from now)
const birthday = new Date(Date.now() + 60000).getTime(); // 1 minute from now

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

// Game Variables
const paddle = document.getElementById('paddle');
const emoji = document.getElementById('emoji');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const gameContainer = document.getElementById('game-container');
let score = 0;
let emojiX = 50;
let emojiY = 50;
let emojiSpeedX = 3;
let emojiSpeedY = 3;
let gameStarted = false;
let gamePaused = false;
let chatbotUnlocked = false;

// Hide Game Initially
gameContainer.style.display = 'none';
pauseButton.style.display = 'none';

// Start Game
startButton.addEventListener('click', () => {
  if (!gameStarted) {
    console.log('Game started!');
    gameStarted = true;
    gamePaused = false;
    startButton.innerText = 'Restart Game';
    gameContainer.style.display = 'block';
    pauseButton.style.display = 'block';
    resetGame();
    moveEmoji();
  } else {
    resetGame();
  }
});

// Pause Game
pauseButton.addEventListener('click', () => {
  if (gamePaused) {
    gamePaused = false;
    pauseButton.innerText = 'Pause';
    moveEmoji();
  } else {
    gamePaused = true;
    pauseButton.innerText = 'Resume';
  }
});

// Move Paddle
document.addEventListener('mousemove', (e) => {
  if (!gameStarted || gamePaused) return;

  const containerRect = gameContainer.getBoundingClientRect();
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
  if (!gameStarted || gamePaused) return;

  const containerRect = gameContainer.getBoundingClientRect();
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
    // Fix Paddle Collision Bug
    const paddleCenter = paddle.offsetLeft + paddle.offsetWidth / 2;
    const hitPosition = (emojiX + emojiRect.width / 2 - paddleCenter) / (paddle.offsetWidth / 2);
    emojiSpeedX = hitPosition * 5; // Adjust emoji speed based on hit position
    emojiSpeedY = -emojiSpeedY;
    score++;
    scoreDisplay.innerText = `Score: ${score}`;

    // Unlock Chatbot at 10 Points
    if (score === 10 && !chatbotUnlocked) {
      chatbotUnlocked = true;
      gameStarted = false;
      gamePaused = true;
      pauseButton.style.display = 'none';
      alert('🎉 Easter Egg AI Chatbot (Riyan Version) Unlocked!');
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
    gameStarted = false;
    gamePaused = true;
    pauseButton.style.display = 'none';
    alert('Game Over! Try again.');
  }

  requestAnimationFrame(moveEmoji);
};

// Reset Game
const resetGame = () => {
  emojiX = 50;
  emojiY = 50;
  score = 0;
  scoreDisplay.innerText = `Score: ${score}`;
};