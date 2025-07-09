let countdownInterval; // переменная для очистки таймера позже

// Функция, чтобы корректно закодировать русские символы в UTF-8
function utf8Encode(str) {
  return unescape(encodeURIComponent(str));
}

document.getElementById('student-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  if (!name) {
    alert('Введите ваше имя!');
    return;
  }

  // Генерируем случайный 6-значный ID
  const studentId = Math.floor(100000 + Math.random() * 900000).toString();
  const timestamp = new Date().toISOString();

  const data = {
    name,
    studentId,
    timestamp
  };

  // Очистка предыдущего QR и таймера
  document.getElementById("qrcode").innerHTML = "";
  document.getElementById("timer").textContent = "";
  clearInterval(countdownInterval);

  // Генерация QR-кода (с учётом русских символов)
  new QRCode(document.getElementById("qrcode"), {
    text: utf8Encode(JSON.stringify(data)),
    width: 256,
    height: 256
  });

  // ⏳ Запуск таймера на 3 минуты
  let timeLeft = 180;
  const timerDisplay = document.getElementById("timer");

  function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `QR-код активен: ${minutes}:${seconds}`;
  }

  updateTimerDisplay(); // первая отрисовка

  countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("qrcode").innerHTML = "";
      timerDisplay.textContent = "⛔ Время действия QR-кода истекло. Сгенерируйте заново.";
    } else {
      updateTimerDisplay();
    }
  }, 1000);
});
