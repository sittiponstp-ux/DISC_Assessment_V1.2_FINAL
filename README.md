# DISC Assessment V1.2 FINAL
ระบบแบบประเมิน DISC สัตว์ 4 ทิศ

## ข้อกำหนดที่ล็อก
- Employee-facing ภาษาไทย 100%
- 24 คำถาม / 4 ตัวเลือก
- แต่ละข้อมี D/I/S/C อย่างละ 1 ตัวเลือก
- D/I/S/C อย่างละ 6 ครั้งรวม 24 ข้อ
- +1 คะแนนต่อคำตอบ
- Primary = คะแนนสูงสุด / Secondary = คะแนนรอง
- D=🦅อินทรีย์, I=🐂กระทิง, S=🐻หมี, C=🐭หนู
- Personality Profile + Working With Others
- Result Card + Print
- Mobile responsive
- Google Sheets ผ่าน Google Apps Script API

## หมายเหตุ
ชุดคำถามในแพ็กเกจนี้คือชุดภาษาไทยที่ล็อกไว้สำหรับ V1.2 ตามโครงสร้างที่ตกลงกัน ไม่ได้ตรวจเทียบคำต่อคำกับไฟล์ V1.1 ต้นฉบับ

## Google Sheets
ตั้งค่า SPREADSHEET_ID ใน google_apps_script.gs แล้ว Deploy เป็น Web App จากนั้นกำหนด URL ใน browser:
localStorage.setItem("DISC_GOOGLE_APPS_SCRIPT_URL","YOUR_WEB_APP_URL")
