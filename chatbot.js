const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

const responses = [
  "I miss you too! 💖",
  "You're the best thing that ever happened to me.",
  "Tell me more about your day!",
  "I’m always here for you, even when I’m not around.",
];

chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const userMessage = chatbotInput.value;
    chatbotMessages.innerHTML += `<div class="user-message">${userMessage}</div>`;
    chatbotInput.value = '';

    const botMessage = responses[Math.floor(Math.random() * responses.length)];
    chatbotMessages.innerHTML += `<div class="bot-message">${botMessage}</div>`;
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});
