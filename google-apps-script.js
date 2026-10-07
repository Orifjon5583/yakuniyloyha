/**
 * GOOGLE SHEETS UCHUN APPS SCRIPT KODI
 * =====================================
 * O'quvchilar test natijalarini avtomatik Google Sheet jadvaliga yozish kodi.
 * 
 * O'RNATISH QADAMLARI:
 * 1. Google Sheets-da yangi bo'sh jadval oching (masalan, "JavaScript Test Natijalari").
 * 2. Yuqori menyudan: Kengaytmalar (Extensions) -> Apps Script tugmasini bosing.
 * 3. Ochilgan oynadagi barcha kodni o'chirib, quyidagi kodni to'liq joylashtiring.
 * 4. "Saqlash" (Ctrl+S yoki diskcha belgisi) tugmasini bosing.
 * 5. Yuqori o'ng burchakdagi "Joylashtirish" (Deploy) -> "Yangi joylashtirish" (New deployment) ni bosing.
 * 6. Tishli g'ildirak (sozlamalar) belgisini bosib "Veb-ilova" (Web app) ni tanlang.
 * 7. Sozlamalarda:
 *    - Tavsif: "JavaScript Quiz"
 *    - Kim sifatida bajarish (Execute as): "Men" (Me)
 *    - Kirish huquqi (Who has access): "Hamma" (Anyone)  <--- JUDA MUHIM!
 * 8. "Joylashtirish" (Deploy) tugmasini bosing va ruxsatlarni tasdiqlang (Advanced -> Go to unsafe).
 * 9. Berilgan "Veb-ilova URL manzili" (Web App URL) ni nusxalab oling va Quiz dasturidagi sozlamalar oynasiga qo'ying!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Agar birinchi qatorda sarlavhalar bo'lmasa, sarlavha qo'shamiz
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Sana va Vaqt",
        "O'quvchi Ismi va Familiyasi",
        "Guruh / Sinf",
        "To'g'ri javoblar",
        "Jami savollar",
        "Natija (Foiz)",
        "Baho",
        "Sarflangan vaqt"
      ];
      sheet.appendRow(headers);
      
      // Sarlavhani chiroyli dizayn qilish
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#2563EB");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }
    
    var now = Utilities.formatDate(new Date(), "Asia/Tashkent", "yyyy-MM-dd HH:mm:ss");
    var fullName = data.fullName || "Noma'lum";
    var group = data.group || "-";
    var score = data.score !== undefined ? data.score : 0;
    var total = data.total !== undefined ? data.total : 20;
    var percentage = data.percentage || Math.round((score / total) * 100) + "%";
    var grade = data.grade || getGrade(score, total);
    var timeSpent = data.timeSpent || "-";
    
    // Jadvalga yangi qator qo'shish
    sheet.appendRow([
      now,
      fullName,
      group,
      score,
      total,
      percentage,
      grade,
      timeSpent
    ]);
    
    // Ustun kengliklarini avtomatik to'g'rilash
    sheet.autoResizeColumns(1, 8);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Natija muvaffaqiyatli saqlandi!" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("JavaScript Quiz Web App ishlamoqda! Natijalarni qabul qilishga tayyor.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getGrade(score, total) {
  var percent = (score / total) * 100;
  if (percent >= 86) return "A'lo (5)";
  if (percent >= 71) return "Yaxshi (4)";
  if (percent >= 55) return "Qoniqarli (3)";
  return "Qoniqarsiz (2)";
}
