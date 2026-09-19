const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwUL6lg0nW8GEInAQaAK6yuc2J5IJlWFOSaRZS0X78bFYtjO2RzeGYkNS1_xOk-9qY/exec';

let current = 0;
let answers = Array(24).fill(null);
let employee = {};

function show(id) {
  document.querySelectorAll('.screen').forEach(function (x) {
    x.classList.remove('active');
  });

  var target = document.getElementById(id);

  if (target) {
    target.classList.add('active');
  }

  window.scrollTo(0, 0);
}

function start() {
  var fields = [
    'employeeId',
    'employeeName',
    'division',
    'department'
  ];

  for (var i = 0; i < fields.length; i++) {
    var element = document.getElementById(fields[i]);

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
  var q = QUESTIONS[current];

  document.getElementById('progress').textContent =
    'คำถาม ' +
    String(current + 1).padStart(2, '0') +
    ' / 24';

  document.getElementById('bar').style.width =
    ((current + 1) / 24 * 100) + '%';

  document.getElementById('qText').textContent =
    q.question;

  var optionsElement =
    document.getElementById('options');

  optionsElement.innerHTML = '';

  q.options.forEach(function (o) {
    var label =
      document.createElement('label');

    label.className =
      'option' +
      (
        answers[current] === o.style
          ? ' selected'
          : ''
      );

    var input =
      document.createElement('input');

    input.type = 'radio';
    input.name = 'a';
    input.checked =
      answers[current] === o.style;

    var span =
      document.createElement('span');

    span.textContent = o.text;

    label.appendChild(input);
    label.appendChild(span);

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
    var scores = {
      D: 0,
      I: 0,
      S: 0,
      C: 0
    };

    answers.forEach(function (style) {
      if (
        style === 'D' ||
        style === 'I' ||
        style === 'S' ||
        style === 'C'
      ) {
        scores[style]++;
      }
    });

    var order =
      Object.entries(scores).sort(
        function (a, b) {
          return b[1] - a[1];
        }
      );

    var primary = order[0][0];
    var secondary = order[1][0];

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

function renderResult(
  scores,
  primary,
  secondary
) {
  var profile =
    PROFILES[primary];

  var others =
    ['D', 'I', 'S', 'C'].filter(
      function (key) {
        return key !== primary;
      }
    );

  var html = '';

  html += '<div class="animal">';
  html += profile[0];
  html += '</div>';

  html += '<div class="title">';

  html += '<h1>';
  html += 'Personal DISC Card';
  html += '</h1>';

  html += '<h2>';
  html += profile[1];
  html += ' — ';
  html += profile[2];
  html += '</h2>';

  html += '<p>';
  html += employee.name;
  html += ' | ';
  html += employee.employeeId;
  html += '</p>';

  html += '<p>';
  html += employee.division;
  html += ' • ';
  html += employee.department;
  html += '</p>';

  html += '</div>';

  html += '<div class="scores">';

  ['D', 'I', 'S', 'C'].forEach(
    function (key) {
      html += '<div class="score">';
      html += '<b>';
      html += key;
      html += '</b>';
      html += '<br>';
      html += scores[key];
      html += ' คะแนน';
      html += '</div>';
    }
  );

  html += '</div>';

  html += '<div class="section">';

  html += '<h3>';
  html += 'ผลลัพธ์';
  html += '</h3>';

  html += '<p>';
  html += '<b>บุคลิกหลัก:</b> ';
  html += PROFILES[primary][1];
  html += ' (';
  html += primary;
  html += ')';
  html += '</p>';

  html += '<p>';
  html += '<b>บุคลิกรอง:</b> ';
  html += PROFILES[secondary][1];
  html += ' (';
  html += secondary;
  html += ')';
  html += '</p>';

  html += '</div>';

  html += '<div class="section">';

  html += '<h3>';
  html += 'บุคลิกโดยรวม';
  html += '</h3>';

  html += '<p>';
  html += profile[3];
  html += '</p>';

  html += '</div>';

  html += '<div class="section">';

  html += '<h3>';
  html += 'จุดแข็ง';
  html += '</h3>';

  html += '<ul>';

  profile[4].forEach(
    function (item) {
      html += '<li>';
      html += item;
      html += '</li>';
    }
  );

  html += '</ul>';
  html += '</div>';

  html += '<div class="section">';

  html += '<h3>';
  html += 'สิ่งที่ควรระวัง';
  html += '</h3>';

  html += '<p>';
  html += profile[5];
  html += '</p>';

  html += '</div>';

  html += '<div class="section">';

  html += '<h3>';
  html += 'สไตล์การสื่อสาร';
  html += '</h3>';

  html += '<p>';
  html += profile[6];
  html += '</p>';

  html += '</div>';

  html += '<div class="section">';

  html += '<h3>';
  html += 'สไตล์การทำงาน';
  html += '</h3>';

  html += '<p>';
  html += profile[7];
  html += '</p>';

  html += '</div>';

  html += '<div class="section">';

  html += '<h3>';
  html += 'เมื่ออยู่ภายใต้แรงกดดัน';
  html += '</h3>';

  html += '<p>';
  html += profile[8];
  html += '</p>';

  html += '</div>';

  html += '<div class="section">';

  html += '<h3>';
  html += 'ทำงานร่วมกับสัตว์ 4 ทิศ';
  html += '</h3>';

  others.forEach(
    function (key) {
      html += '<p>';

      html += '<b>';
      html += PROFILES[key][0];
      html += ' ';
      html += PROFILES[key][1];
      html += ':</b> ';

      html +=
        WORKING_WITH_OTHERS[primary][key];

      html += '</p>';
    }
  );

  html += '</div>';

  html += '<div class="section">';

  html += '<p>';

  html += '<b>หมายเหตุ:</b> ';
  html +=
    'DISC ไม่มีประเภทใดดีกว่าหรือแย่กว่า' +
    'ประเภทอื่น แบบประเมินนี้ใช้เพื่อการเรียนรู้' +
    'ตนเองและการทำงานร่วมกัน';

  html += '</p>';

  html += '<p>';

  html += '<b>';
  html +=
    'Know Yourself / ' +
    'Understand Others / ' +
    'Work Better Together';
  html += '</b>';

  html += '</p>';

  html += '</div>';

  document.getElementById(
    'resultCard'
  ).innerHTML = html;
}

function save(
  scores,
  primary,
  secondary
) {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.warn(
      'Google Apps Script URL is not configured.'
    );
    return;
  }

  var payload = {
    assessmentId:
      'DISC-' + Date.now(),

    employeeId:
      employee.employeeId || '',

    name:
      employee.name || '',

    division:
      employee.division || '',

    department:
      employee.department || '',

    timestamp:
      new Date().toISOString(),

    answers:
      answers.map(function (style, index) {
        return {
          question:
            'Q' +
            String(index + 1).padStart(2, '0'),

          style:
            style
        };
      }),

    D: scores.D,
    I: scores.I,
    S: scores.S,
    C: scores.C,

    primaryAnimal:
      PROFILES[primary][1],

    primary:
      primary,

    secondaryAnimal:
      PROFILES[secondary][1],

    secondary:
      secondary,

    personalityType:
      primary + secondary,

    assessmentVersion:
      'V1.2.1'
  };

  console.log(
    'DISC payload:',
    payload
  );

  fetch(
    GOOGLE_APPS_SCRIPT_URL,
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'text/plain;charset=utf-8'
      },

      body:
        JSON.stringify(payload)
    }
  )
    .then(function (response) {

      console.log(
        'DISC HTTP status:',
        response.status
      );

      return response.text();
    })

    .then(function (result) {

      console.log(
        'DISC submission response:',
        result
      );

      try {
        var data =
          JSON.parse(result);

        if (data.success) {

          console.log(
            'DISC submission saved successfully.'
          );

        } else {

          console.error(
            'DISC submission rejected:',
            data
          );

        }

      } catch (error) {

        console.warn(
          'Response is not JSON:',
          result
        );
      }

    })

    .catch(function (error) {

      console.error(
        'DISC submission failed:',
        error
      );

    });
}
