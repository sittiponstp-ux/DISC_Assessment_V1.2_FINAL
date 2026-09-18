const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwUL6lg0nW8GEInAQaAK6yuc2J5IJlWFOSaRZS0X78bFYtjO2RzeGYkNS1_xOk-9qY/exec';

let current = 0;
let answers = Array(24).fill(null);
let employee = {};

function show(id) {
  document
    .querySelectorAll('.screen')
    .forEach(x => x.classList.remove('active'));

  document
    .getElementById(id)
    .classList.add('active');

  scrollTo(0, 0);
}

function start() {
  const a = [
    'employeeId',
    'employeeName',
    'division',
    'department'
  ];

  if (
    a.some(
      x =>
        !document
          .getElementById(x)
          .value
          .trim()
    )
  ) {
    return alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
  }

  employee = {
    employeeId: employeeId.value.trim(),
    name: employeeName.value.trim(),
    division: division.value.trim(),
    department: department.value.trim()
  };

  current = 0;
  answers.fill(null);

  render();
  show('quiz');
}

function render() {
  let q = QUESTIONS[current];

  progress.textContent =
    `คำถาม ${String(current + 1).padStart(2, '0')} / 24`;

  bar.style.width =
    ((current + 1) / 24 * 100) + '%';

  qText.textContent = q.question;

  options.innerHTML = '';

  q.options.forEach(o => {

    let d = document.createElement('label');

    d.className =
      'option' +
      (answers[current] === o.style
        ? ' selected'
        : '');

    d.innerHTML = `
      <input
        type="radio"
        name="a"
        ${answers[current] === o.style ? 'checked' : ''}
      >
      <span>${o.text}</span>
    `;

    d.onclick = () => {
      answers[current] = o.style;
      render();
    };

    options.appendChild(d);
  });

  back.disabled = current === 0;

  next.textContent =
    current === 23
      ? 'ดูผลลัพธ์'
      : 'ถัดไป';
}

function prev() {
  if (current) {
    current--;
    render();
  }
}

function next() {

  if (!answers[current]) {
    return alert(
      'กรุณาเลือกคำตอบก่อนดำเนินการต่อ'
    );
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

  setTimeout(() => {

    let s = {
      D: 0,
      I: 0,
      S: 0,
      C: 0
    };

    answers.forEach(x => {
      s[x]++;
    });

    let order =
      Object.entries(s)
        .sort((a, b) => b[1] - a[1]);

    let p = order[0][0];
    let sec = order[1][0];

    renderResult(s, p, sec);

    /*
     * ส่งข้อมูลไป Google Apps Script
     * ไม่บล็อกการแสดงผล Personality Card
     */
    save(s, p, sec);

    show('result');

  }, 500);
}

function renderResult(s, p, sec) {

  let x = PROFILES[p];

  let others =
    ['D', 'I', 'S', 'C']
      .filter(k => k !== p);

  resultCard.innerHTML = `

    <div class="animal">
      ${x[0]}
    </div>

    <div class="title">

      <h1>
        Personal DISC Card
      </h1>

      <h2>
        ${x[1]} — ${x[2]}
      </h2>

      <p>
        ${employee.name} |
        ${employee.employeeId}
      </p>

      <p>
        ${employee.division} •
        ${employee.department}
      </p>

    </div>

    <div class="scores">

      ${['D', 'I', 'S', 'C']
        .map(k => `
          <div class="score">
            <b>${k}</b>
            <br>
            ${s[k]} คะแนน
          </div>
        `)
        .join('')}

    </div>

    <div class="section">

      <h3>
        ผลลัพธ์
      </h3>

      <p>
        <b>บุคลิกหลัก:</b>
        ${PROFILES[p][1]} (${p})
      </p>

      <p>
        <b>บุคลิกรอง:</b>
        ${PROFILES[sec][1]} (${sec})
      </p>

    </div>

    <div class="section">

      <h3>
        บุคลิกโดยรวม
      </h3>

      <p>
        ${x[3]}
      </p>

    </div>

    <div class="section">

      <h3>
        จุดแข็ง
      </h3>

      <ul>
        ${x[4]
          .map(v => `<li>${v}</li>`)
          .join('')}
      </ul>

    </div>

    <div class="section">

      <h3>
        สิ่งที่ควรระวัง
      </h3>

      <p>
        ${x[5]}
      </p>

    </div>

    <div class="section">

      <h3>
        สไตล์การสื่อสาร
      </h3>

      <p>
        ${x[6]}
      </p>

    </div>

    <div class="section">

      <h3>
        สไตล์การทำงาน
      </h3>

      <p>
        ${x[7]}
      </p>

    </div>

    <div class="section">

      <h3>
        เมื่ออยู่ภายใต้แรงกดดัน
      </h3>

      <p>
        ${x[8]}
      </p>

    </div>

    <div class="section">

      <h3>
        ทำงานร่วมกับสัตว์ 4 ทิศ
      </h3>

      ${others
        .map(k => `
          <p>
            <b>
              ${PROFILES[k][0]}
              ${PROFILES[k][1]}:
            </b>

            ${WORKING_WITH_OTHERS[p][k]}
          </p>
        `)
        .join('')}

    </div>

    <div class="section">

      <p>
        <b>หมายเหตุ:</b>
        DISC ไม่มีประเภทใดดีกว่าหรือแย่กว่า
        ประเภทอื่น แบบประเมินนี้ใช้เพื่อการเรียนรู้
        ตนเองและการทำงานร่วมกัน
      </p>

      <p>
        <b>
          Know Yourself /
          Understand Others /
          Work Better Together
        </b>
      </p>

    </div>
  `;
}

function save(s, p, sec) {

  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.warn(
      'Google Apps Script URL is not configured.'
    );
    return;
  }

  const payload = {

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
      answers.map((v, i) => ({
        question:
          'Q' +
          String(i + 1).padStart(2, '0'),

        style:
          v
      })),

    D: s.D,
    I: s.I,
    S: s.S,
    C: s.C,

    primaryAnimal:
      PROFILES[p][1],

    primary:
      p,

    secondaryAnimal:
      PROFILES[sec][1],

    secondary:
      sec,

    personalityType:
      p + sec,

    assessmentVersion:
      'V1.2'
  };

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
    .then(response => {

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      return response.text();
    })

    .then(result => {

      console.log(
        'DISC submission sent:',
        result
      );

    })

    .catch(error => {

      console.error(
        'DISC submission failed:',
        error
      );

    });
}