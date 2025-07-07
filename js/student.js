<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Генерация QR-кода студента</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
</head>
<body>
  <h1>Сгенерировать QR для отметки</h1>

  <form id="student-form">
    <input type="text" id="name" placeholder="Имя Фамилия" required>
    <input type="text" id="studentId" placeholder="ID студента" required>
    <button type="submit">Сгенерировать QR</button>
  </form>

  <div id="qrcode" style="margin-top: 20px;"></div>

  <script>
    document.getElementById('student-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const studentId = document.getElementById('studentId').value.trim();
      const timestamp = new Date().toISOString();
      
      if (!name || !studentId) {
        alert('Заполните все поля!');
        return;
      }

      const data = {
        name,
        studentId,
        timestamp
      };
      
      // Очистка предыдущего QR-кода
      document.getElementById("qrcode").innerHTML = "";
      
      // Генерация нового QR-кода
      new QRCode(document.getElementById("qrcode"), {
        text: JSON.stringify(data),
        width: 256,
        height: 256
      });
    });
  </script>
</body>
</html>
