# DISC Assessment V1.2.1

ระบบแบบประเมิน DISC สัตว์ 4 ทิศ

## ข้อกำหนดที่ล็อก

* Employee-facing ภาษาไทย 100%
* 24 คำถาม / 4 ตัวเลือก
* แต่ละข้อมี D/I/S/C อย่างละ 1 ตัวเลือก
* D/I/S/C อย่างละ 6 ครั้ง รวม 24 ข้อ
* +1 คะแนนต่อคำตอบ
* Primary = คะแนนสูงสุด / Secondary = คะแนนรอง
* ใช้ Mapping DISC → สัตว์ 4 ทิศ ตามระบบที่ล็อกไว้
* Personality Profile + Working With Others
* Result Card + Print
* Mobile responsive
* Google Sheets ผ่าน Google Apps Script API

## DISC → สัตว์ 4 ทิศ

| DISC                      | สัตว์           | ทิศ             | ความหมายหลัก                                         |
| ------------------------- | --------------- | --------------- | ---------------------------------------------------- |
| **D – Dominance**         | 🐂 **กระทิง**   | **ทิศเหนือ**    | มุ่งเป้าหมาย กล้าตัดสินใจ เน้นผลลัพธ์และความก้าวหน้า |
| **I – Influence**         | 🦅 **อินทรีย์** | **ทิศตะวันออก** | สื่อสาร สร้างพลัง ชอบปฏิสัมพันธ์และสร้างแรงจูงใจ     |
| **S – Steadiness**        | 🐭 **หนู**      | **ทิศใต้**      | ใส่ใจผู้คน สนับสนุน รักษาความสัมพันธ์และความมั่นคง   |
| **C – Conscientiousness** | 🐻 **หมี**      | **ทิศตะวันตก**  | รอบคอบ เป็นระบบ เน้นความถูกต้องและมาตรฐาน            |

### Mapping ที่ต้องใช้ทั้ง Repository

> **D = 🐂 กระทิง = เหนือ**
> **I = 🦅 อินทรีย์ = ตะวันออก**
> **S = 🐭 หนู = ใต้**
> **C = 🐻 หมี = ตะวันตก**

Mapping ชุดนี้เป็น Mapping กลางของระบบ และต้องสอดคล้องกันระหว่าง `profiles.js`, `app.js`, `questions.js`, `README.md` และส่วนแสดงผลที่เกี่ยวข้อง

## โครงสร้างการประเมิน

ระบบทำงานตามลำดับ:

**24 Questions → Scoring → DISC → Animal → Personality Profile → Result Card**

ผลการประเมินประกอบด้วย:

* DISC Primary
* DISC Secondary
* สัตว์ 4 ทิศ
* Personality Profile
* จุดเด่น
* ลักษณะการทำงาน
* Working With Others

## หมายเหตุ

ชุดคำถามในแพ็กเกจนี้คือชุดภาษาไทยที่ล็อกไว้สำหรับ V1.2 ตามโครงสร้างที่ตกลงกัน ไม่ได้ตรวจเทียบคำต่อคำกับไฟล์ V1.1 ต้นฉบับ

การเปลี่ยนแปลง Mapping สัตว์ 4 ทิศใน V1.2.1 เป็นการปรับความสอดคล้องของโมเดลการแสดงผล โดยไม่เปลี่ยนจำนวนคำถามหรือหลักการให้คะแนน DISC

## Google Sheets

ตั้งค่า `SPREADSHEET_ID` ใน `google_apps_script.gs` แล้ว Deploy เป็น Web App

จากนั้นกำหนด URL ใน Browser:

```javascript
localStorage.setItem(
  "DISC_GOOGLE_APPS_SCRIPT_URL",
  "YOUR_WEB_APP_URL"
)
```

## Files

* `index.html` — หน้าหลักของแบบประเมิน
* `app.js` — Logic การทำแบบประเมินและการแสดงผล
* `profiles.js` — DISC Profile และ Animal Model
* `questions.js` — ชุดคำถาม 24 ข้อ
* `style.css` — UI / Responsive Design
* `google_apps_script.gs` — Google Sheets API
* `QR_CODE_SETUP.txt` — คู่มือการตั้งค่า QR Code
* `version.txt` — Version ของระบบ

## Version

**V1.2.1**

Mapping ปัจจุบัน:

**D → 🐂 กระทิง → เหนือ**
**I → 🦅 อินทรีย์ → ตะวันออก**
**S → 🐭 หนู → ใต้**
**C → 🐻 หมี → ตะวันตก**
