const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwUL6lg0nW8GEInAQaAK6yuc2J5IJlWFOSaRZS0X78bFYtjO2RzeGYkNS1_xOk-9qY/exec';

let current = 0;
let answers = Array(24).fill(null);
let employee = {};

function show(id) {
  document.querySelectorAll('.screen').forEach(function (x) {
    x.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');

  window.scrollTo(0, 0);
}

function start() {
  const fields = [
    'employeeId',
    'employeeName',
    'division',
    'department'
  ];

  for (const id of fields) {
    const element = document.getElementById(id);

    if (!element || !element.value.trim()) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
  }

  employee = {
    employeeId: document.getElementById('employeeId').value.trim(),
    name: document.getElementById('employeeName').value.trim(),
    division: document.getElementById('division').value.trim(),
    department: document.getElementById('department').value.trim()
  };

  current = 0;
  answers = Array(24).fill(null);

  render();
  show('quiz');
}

function render() {
  const q = QUESTIONS[current];

  document.getElementById('progress').textContent =
    'คำถาม ' +
    String(current + 1).padStart(2, '0') +
    ' / 24';

  document.getElementById('bar').style.width =
    ((current + 1) / 24 * 100) + '%';

  document.getElementById('qText').textContent =
    q.question;

  const optionsElement =
    document.getElementById('options');

  optionsElement.innerHTML = '';

  q.options.forEach(function (o) {
    const label =
      document.createElement('label');

    label.className =
      'option' +
      (
        answers[current] === o.style
          ? ' selected'
          : ''
      );

    label.innerHTML =
      '<input type="radio" name="a" ' +
      (
        answers[current] === o.style
          ? 'checked'
          : ''
      ) +
      '>' +
      '<span>' +
      o.text +
      '</span>';

    label.onclick = function () {
      answers[current] = o.style;
      render();
    };

    optionsElement.appendChild(label);
  });

  document.getElementById('back').disabled =
    current === 0;

  document.getElementById('next').textContent =
    current === 23
      ? 'ดูผลลัพธ์'
      : 'ถัดไป';
}

function prev() {
  if (current > 0) {
    current--;
    render();
  }
}

function next() {
  if (!answers[current]) {
    alert(
      'กรุณาเลือกคำตอบก่อนดำเนินการต่อ'
    );
    return;
  }

  if (current < 23) {
    current++;
    render();
  } else {
    calculate();
  }
}

function calculate() {
  show('processing');

  setTimeout(function () {
    const scores = {
      D: 0,
      I: 0,
      S: 0,
      C: 0
    };

    answers.forEach(function (style) {
      if (scores.hasOwnProperty(style)) {
        scores[style]++;
      }
    });

    const order =
      Object.entries(scores).sort(
        function (a, b) {
          return b[1] - a[1];
        }
      );

    const primary = order[0][0];
    const secondary = order[1][0];

    renderResult(
      scores,
      primary,
      secondary
    );

    save(
      scores,
      primary,
      secondary
    );

    show('result');
  }, 500);
}

function renderResult(scores, primary, secondary) {
  const profile =
    PROFILES[primary];

  const others =
    ['D', 'I', 'S', 'C'].filter(
      function (key) {
        return key !== primary;
      }
    );

  const resultCardElement =
    document.getElementById('resultCard');

  resultCardElement.innerHTML =

    '<div class="animal">' +
      profile[0] +
    '</div>' +

    '<div class="title">' +

      '<h1>' +
        'Personal DISC Card' +
      '</h1>' +

      '<h2>' +
        profile[1] +
        ' — ' +
        profile[2] +
      '</h2>' +

      '<p>' +
        employee.name +
        ' | ' +
        employee.employeeId +
      '</p>' +

      '<p>' +
        employee.division +
        ' • ' +
        employee.department +
      '</p>' +

    '</div>' +

    '<div class="scores">' +

      ['D', 'I', 'S', 'C']
        .map(function (key) {
          return (
            '<div class="score">' +
              '<b>' +
                key +
              '</b>' +
              '<br>' +
              scores[key] +
              ' คะแนน' +
            '</div>'
          );
        })
        .join('') +

    '</div>' +

    '<div class="section">' +

      '<h3>ผลลัพธ์</h3>' +

      '<p>' +
        '<b>บุ
```
