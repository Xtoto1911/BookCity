document.addEventListener('DOMContentLoaded', function () {
  const chatButton = document.getElementById('chatButton');
  const chatContainer = document.getElementById('chat-container');
  const closeChat = document.getElementById('closeChat');
  const chatBody = document.getElementById('chat-body');
  const messageInput = document.getElementById('message-input');

  // Открытие/закрытие чата
  chatButton.addEventListener('click', () => {
    chatContainer.classList.toggle('d-none');
  });

  closeChat.addEventListener('click', () => {
    chatContainer.classList.add('d-none');
  });

  // Отправка сообщения при нажатии на Enter
  messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const userMessage = messageInput.value;
      if (userMessage.trim() !== '') {
        addMessage(userMessage, 'user');
        messageInput.value = ''; // Очищаем поле ввода
        getBotResponse(userMessage);
      }
    }
  });

  // Добавление сообщений в чат
  function addMessage(text, sender, isHtml = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    if (isHtml) {
      messageDiv.innerHTML = text; // Используем innerHTML для вставки HTML
    } else {
      messageDiv.textContent = text; // Для простого текста используем textContent
    }
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Прокручиваем вниз
  }

  // Простой ответ бота
  function getBotResponse(userMessage) {
    let botResponse = 'Извините, я вас не понял.';

    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('привет')) {
      botResponse = 'Привет! Как я могу помочь?';
    } else if (lowerCaseMessage.includes('как дела')) {
      botResponse = 'У меня всё отлично, спасибо!';
    } else if (lowerCaseMessage.includes('пока')) {
      botResponse = 'До свидания!';
    } else if (lowerCaseMessage.includes('что ты умеешь')) {
      botResponse = 'Я могу отвечать на простые вопросы!';
    } else if (lowerCaseMessage.includes('манга')) {
      botResponse = 'Вот ссылка на страницу с мангой: <a href="manga.html" target="_blank">Манга</a>';
      addMessage(botResponse, 'bot', true); // Передаем true, чтобы вставить HTML-сообщение
      return;
    } else if (lowerCaseMessage.includes('книги')) {
      botResponse = 'Вот ссылка на страницу с книгами: <a href="books.html" target="_blank">Книги</a>';
      addMessage(botResponse, 'bot', true); // Передаем true, чтобы вставить HTML-сообщение
      return;
    }

    setTimeout(() => {
      addMessage(botResponse, 'bot');
    }, 1000); // Задержка для имитации ответа бота
  }
});
