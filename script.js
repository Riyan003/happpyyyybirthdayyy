// Countdown Timer
const countdown = () => {
    const birthday = new Date('YYYY-MM-DD').getTime(); // Replace with her birthday
    const now = new Date().getTime();
    const difference = birthday - now;
  
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
  
  // Chatbot Toggle
  document.getElementById('chatbot-button').addEventListener('click', () => {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
  });
  // Game Variables
const paddle = document.getElementById('paddle');
const emoji = document.getElementById('emoji');
const scoreDisplay = document.getElementById('score');
let score = 0;
let emojiX = 50;
let emojiY = 50;
let emojiSpeedX = 3;
let emojiSpeedY = 3;

// Move Paddle
document.addEventListener('mousemove', (e) => {
  const container = document.getElementById('game-container');
  const containerRect = container.getBoundingClientRect();
  const paddleX = e.clientX - containerRect.left - paddle.offsetWidth / 2;
  paddle.style.left = `${paddleX}px`;
});

// Move Emoji
const moveEmoji = () => {
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
};

// Start Game
moveEmoji();
