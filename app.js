/**
 * JavaScript Quiz Dasturi - Asosiy mantiq
 * 23 - 27 Mavzular bo'yicha
 */

// Google Sheets Web App URL manzili:
const DEFAULT_GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbx3p2CIbNPWuM6GYxLovBmZR4w1rm4euHgCEzx_Tx1kS6SKO38H4GQ8yS97OHEmrQrO/exec"; 

// Dastur holati (State)
let appState = {
  student: {
    firstName: "",
    lastName: "",
    group: ""
  },
  currentQuestionIndex: 0,
  userAnswers: new Array(quizQuestions.length).fill(null), // Har bir savolga belgilangan indeks
  timerSeconds: 25 * 60, // 25 daqiqa
  elapsedSeconds: 0,
  timerInterval: null,
  isFinished: false,
  googleSheetUrl: localStorage.getItem("js_quiz_sheet_url") || DEFAULT_GOOGLE_SHEET_URL,
  lastPayload: null
};

// DOM Elementlari
let screens = {};
let formRegister, inpFirstName, inpLastName, inpGroup;
let quizAvatar, quizStudentDisplay, quizTimer, quizTimerBox, quizNavGrid, quizProgressBar;
let qTopicBadge, qCounter, qText, qOptionsContainer, btnPrev, btnNext, btnFinish;
let resIcon, resTitle, resStudentInfo, resScore, resPercent, resGrade, resTime;
let sheetSyncBox, sheetSpinner, sheetStatusText, btnResendSheet, btnToggleReview, reviewContainer, reviewList, btnRestart;
let settingsModal, btnOpenSettings, btnCloseSettings, inpSheetUrl, btnSaveSettings, btnTestSheet, settingsTestMsg;

// --- 1. BOSHLANG'ICH SOZLAMALAR ---
function init() {
  // DOM elementlarini biriktirish
  screens = {
    register: document.getElementById("screen-register"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result")
  };

  formRegister = document.getElementById("form-register");
  inpFirstName = document.getElementById("inp-firstname");
  inpLastName = document.getElementById("inp-lastname");
  inpGroup = document.getElementById("inp-group");

  quizAvatar = document.getElementById("quiz-avatar");
  quizStudentDisplay = document.getElementById("quiz-student-display");
  quizTimer = document.getElementById("quiz-timer");
  quizTimerBox = document.getElementById("quiz-timer-box");
  quizNavGrid = document.getElementById("quiz-nav-grid");
  quizProgressBar = document.getElementById("quiz-progress-bar");
  qTopicBadge = document.getElementById("q-topic-badge");
  qCounter = document.getElementById("q-counter");
  qText = document.getElementById("q-text");
  qOptionsContainer = document.getElementById("q-options-container");
  btnPrev = document.getElementById("btn-prev");
  btnNext = document.getElementById("btn-next");
  btnFinish = document.getElementById("btn-finish");

  resIcon = document.getElementById("res-icon");
  resTitle = document.getElementById("res-title");
  resStudentInfo = document.getElementById("res-student-info");
  resScore = document.getElementById("res-score");
  resPercent = document.getElementById("res-percent");
  resGrade = document.getElementById("res-grade");
  resTime = document.getElementById("res-time");
  sheetSyncBox = document.getElementById("sheet-sync-box");
  sheetSpinner = document.getElementById("sheet-spinner");
  sheetStatusText = document.getElementById("sheet-status-text");
  btnResendSheet = document.getElementById("btn-resend-sheet");
  btnToggleReview = document.getElementById("btn-toggle-review");
  reviewContainer = document.getElementById("review-container");
  reviewList = document.getElementById("review-list");
  btnRestart = document.getElementById("btn-restart");

  settingsModal = document.getElementById("settings-modal");
  btnOpenSettings = document.getElementById("btn-open-settings");
  btnCloseSettings = document.getElementById("btn-close-settings");
  inpSheetUrl = document.getElementById("inp-sheet-url");
  btnSaveSettings = document.getElementById("btn-save-settings");
  btnTestSheet = document.getElementById("btn-test-sheet");
  settingsTestMsg = document.getElementById("settings-test-msg");

  // Saqlangan Sheet URL bo'lsa inputga qo'yish
  inpSheetUrl.value = appState.googleSheetUrl;

  // Hodisalarni bog'lash
  formRegister.addEventListener("submit", handleStartQuiz);
  btnPrev.addEventListener("click", () => navigateQuestion(appState.currentQuestionIndex - 1));
  btnNext.addEventListener("click", () => navigateQuestion(appState.currentQuestionIndex + 1));
  btnFinish.addEventListener("click", handleFinishQuizPrompt);
  btnRestart.addEventListener("click", handleRestart);
  btnToggleReview.addEventListener("click", toggleReview);
  btnResendSheet.addEventListener("click", () => sendResultToGoogleSheets(appState.lastPayload));

  // Modal hodisalari
  btnOpenSettings.addEventListener("click", openSettingsModal);
  btnCloseSettings.addEventListener("click", closeSettingsModal);
  settingsModal.addEventListener("click", (e) => {
    if (e.target === settingsModal) closeSettingsModal();
  });
  btnSaveSettings.addEventListener("click", saveSettings);
  btnTestSheet.addEventListener("click", testGoogleSheetConnection);
}

// Ekranlarni almashtirish
function switchScreen(screenName) {
  Object.keys(screens).forEach((key) => {
    screens[key].classList.remove("active");
  });
  if (screens[screenName]) {
    screens[screenName].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// --- 2. QUIZNI BOSHLASH ---
function handleStartQuiz(e) {
  e.preventDefault();

  const firstName = inpFirstName.value.trim();
  const lastName = inpLastName.value.trim();
  const group = inpGroup.value.trim();

  if (!firstName || !lastName) {
    alert("Iltimos, ism va familiyangizni kiriting!");
    return;
  }

  appState.student = { firstName, lastName, group };
  appState.currentQuestionIndex = 0;
  appState.userAnswers = new Array(quizQuestions.length).fill(null);
  appState.timerSeconds = 25 * 60;
  appState.elapsedSeconds = 0;
  appState.isFinished = false;

  // Quiz yuqori panelini yangilash
  quizAvatar.textContent = firstName.charAt(0).toUpperCase();
  quizStudentDisplay.textContent = `${firstName} ${lastName}${group ? ` (${group})` : ""}`;

  // Navigatsiya tugmachalarini chizish (1 dan 20 gacha)
  renderNavGrid();

  // Birinchi savolni ko'rsatish
  loadQuestion(0);

  // Taymerni ishga tushirish
  startTimer();

  // Quiz ekraniga o'tish
  switchScreen("quiz");
}

// Navigatsiya tugmachalarini yaratish
function renderNavGrid() {
  quizNavGrid.innerHTML = "";
  quizQuestions.forEach((q, idx) => {
    const dot = document.createElement("button");
    dot.className = "q-dot";
    dot.textContent = idx + 1;
    dot.title = `${idx + 1}-savol`;
    dot.addEventListener("click", () => navigateQuestion(idx));
    quizNavGrid.appendChild(dot);
  });
  updateNavGrid();
}

function updateNavGrid() {
  const dots = quizNavGrid.querySelectorAll(".q-dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === appState.currentQuestionIndex);
    dot.classList.toggle("answered", appState.userAnswers[idx] !== null);
  });

  // Progress barni yangilash
  const answeredCount = appState.userAnswers.filter(a => a !== null).length;
  const progressPercent = (answeredCount / quizQuestions.length) * 100;
  quizProgressBar.style.width = `${progressPercent}%`;
}

// --- 3. SAVOLNI YUKLASH VA JAVOBLARNI TANLASH ---
function loadQuestion(index) {
  if (index < 0 || index >= quizQuestions.length) return;

  appState.currentQuestionIndex = index;
  const q = quizQuestions[index];

  // Savol ma'lumotlarini to'ldirish
  qTopicBadge.textContent = q.topic;
  qCounter.textContent = `Savol: ${index + 1} / ${quizQuestions.length}`;
  qText.textContent = q.question;

  // Variantlarni chiqarish
  qOptionsContainer.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  q.options.forEach((optText, optIdx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "option-item";
    if (appState.userAnswers[index] === optIdx) {
      optDiv.classList.add("selected");
    }

    optDiv.innerHTML = `
      <div class="option-letter">${letters[optIdx]}</div>
      <div class="option-text">${escapeHtml(optText)}</div>
    `;

    optDiv.addEventListener("click", () => selectOption(optIdx));
    qOptionsContainer.appendChild(optDiv);
  });

  // Oldingi / Keyingi tugmalari holati
  btnPrev.disabled = index === 0;

  if (index === quizQuestions.length - 1) {
    btnNext.style.display = "none";
    btnFinish.style.display = "inline-flex";
  } else {
    btnNext.style.display = "inline-flex";
    btnFinish.style.display = "none";
  }

  updateNavGrid();
}

function selectOption(optionIndex) {
  appState.userAnswers[appState.currentQuestionIndex] = optionIndex;

  // UI dagi tanlangan variantni yangilash
  const options = qOptionsContainer.querySelectorAll(".option-item");
  options.forEach((opt, idx) => {
    opt.classList.toggle("selected", idx === optionIndex);
  });

  updateNavGrid();
}

function navigateQuestion(newIndex) {
  if (newIndex >= 0 && newIndex < quizQuestions.length) {
    loadQuestion(newIndex);
  }
}

// --- 4. TAYMER ---
function startTimer() {
  clearInterval(appState.timerInterval);
  updateTimerDisplay();

  appState.timerInterval = setInterval(() => {
    appState.timerSeconds--;
    appState.elapsedSeconds++;

    updateTimerDisplay();

    if (appState.timerSeconds <= 180) { // 3 daqiqa qolganda
      quizTimerBox.classList.add("danger");
    }

    if (appState.timerSeconds <= 0) {
      clearInterval(appState.timerInterval);
      alert("Vaqt tugadi! Test yakunlanadi.");
      finishQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const mins = Math.floor(appState.timerSeconds / 60);
  const secs = appState.timerSeconds % 60;
  quizTimer.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatElapsed(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} soniya`;
  return `${mins} daqiqa ${secs} soniya`;
}

// --- 5. TESTNI YAKUNLASH VA NATIJALARNI HISOBLASH ---
function handleFinishQuizPrompt() {
  const answeredCount = appState.userAnswers.filter(a => a !== null).length;
  const unansweredCount = quizQuestions.length - answeredCount;

  if (unansweredCount > 0) {
    const confirmFinish = confirm(
      `Sizda hali ${unansweredCount} ta belgilanmagan savol bor!\n\nRostdan ham testni yakunlamoqchimisiz?`
    );
    if (!confirmFinish) return;
  } else {
    const confirmFinish = confirm("Testni yakunlashga ishonchingiz komilmi?");
    if (!confirmFinish) return;
  }

  finishQuiz();
}

function finishQuiz() {
  if (appState.isFinished) return;
  appState.isFinished = true;
  clearInterval(appState.timerInterval);

  // Natijalarni hisoblash
  let correctCount = 0;
  quizQuestions.forEach((q, idx) => {
    if (appState.userAnswers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });

  const total = quizQuestions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const timeSpentStr = formatElapsed(appState.elapsedSeconds);

  let grade = "Qoniqarsiz (2)";
  let icon = "😕";
  if (percentage >= 86) {
    grade = "A'lo (5)";
    icon = "🏆";
  } else if (percentage >= 71) {
    grade = "Yaxshi (4)";
    icon = "🌟";
  } else if (percentage >= 55) {
    grade = "Qoniqarli (3)";
    icon = "👍";
  }

  // Natija ekranini to'ldirish
  resIcon.textContent = icon;
  resTitle.textContent = percentage >= 71 ? "Ajoyib Natija!" : "Test Yakunlandi!";
  resStudentInfo.textContent = `${appState.student.firstName} ${appState.student.lastName}${appState.student.group ? ` (${appState.student.group})` : ""}`;
  
  resScore.textContent = `${correctCount} / ${total}`;
  resPercent.textContent = `${percentage}%`;
  resGrade.textContent = grade;
  resTime.textContent = timeSpentStr;

  // Ball rangi
  resScore.className = "stat-value " + (percentage >= 85 ? "score-high" : percentage >= 60 ? "score-med" : "score-low");
  resPercent.className = "stat-value " + (percentage >= 85 ? "score-high" : percentage >= 60 ? "score-med" : "score-low");

  // Savollar tahlilini tayyorlash
  renderReviewList();

  // Natija payloadini tayyorlash
  const payload = {
    fullName: `${appState.student.firstName} ${appState.student.lastName}`,
    group: appState.student.group || "-",
    score: correctCount,
    total: total,
    percentage: `${percentage}%`,
    grade: grade,
    timeSpent: timeSpentStr
  };
  appState.lastPayload = payload;

  // Google Sheets-ga yuborish
  sendResultToGoogleSheets(payload);

  // Ekran ochish
  switchScreen("result");
}

// --- 6. GOOGLE SHEETS GA YUBORISH ---
async function sendResultToGoogleSheets(data) {
  const url = appState.googleSheetUrl || DEFAULT_GOOGLE_SHEET_URL;

  sheetSyncBox.className = "sheet-sync-alert syncing";
  sheetSpinner.style.display = "inline-block";
  btnResendSheet.style.display = "none";

  if (!url) {
    sheetSyncBox.className = "sheet-sync-alert error";
    sheetSpinner.style.display = "none";
    sheetStatusText.innerHTML = "⚠️ Google Sheets URL ulanmagan. O'qituvchi <strong>⚙️ Sozlamalar</strong> orqali URL-ni kiritishi kerak.";
    btnResendSheet.style.display = "inline-flex";
    return;
  }

  sheetStatusText.textContent = "Google Sheets jadvaliga natijalar yuborilmoqda...";

  try {
    // Google Apps Script CORS cheklovini chetlab o'tish uchun 'no-cors' rejimi va URLSearchParams
    const formParams = new URLSearchParams();
    formParams.append("fullName", data.fullName);
    formParams.append("group", data.group);
    formParams.append("score", data.score);
    formParams.append("total", data.total);
    formParams.append("percentage", data.percentage);
    formParams.append("grade", data.grade);
    formParams.append("timeSpent", data.timeSpent);

    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formParams.toString()
    });

    // Muvaffaqiyatli
    sheetSyncBox.className = "sheet-sync-alert success";
    sheetSpinner.style.display = "none";
    sheetStatusText.textContent = "✅ Natijalar muvaffaqiyatli Google Sheets jadvaliga saqlandi!";
    btnResendSheet.style.display = "none";

  } catch (error) {
    console.error("Sheet yuborishda xatolik:", error);
    sheetSyncBox.className = "sheet-sync-alert error";
    sheetSpinner.style.display = "none";
    sheetStatusText.textContent = "❌ Jadvalga yuborishda xatolik yuz berdi. Internetni tekshiring.";
    btnResendSheet.style.display = "inline-flex";
  }
}

// --- 7. SAVOLLAR TAHLILI (REVIEW) ---
function renderReviewList() {
  reviewList.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  quizQuestions.forEach((q, idx) => {
    const userAns = appState.userAnswers[idx];
    const isCorrect = userAns === q.correctAnswer;
    const isSkipped = userAns === null;

    const item = document.createElement("div");
    item.className = `review-item ${isCorrect ? "is-correct" : "is-wrong"}`;

    const userAnsText = isSkipped 
      ? "<span style='color: #94a3b8;'>Javob berilmagan</span>" 
      : `${letters[userAns]}) ${escapeHtml(q.options[userAns])}`;

    const correctAnsText = `${letters[q.correctAnswer]}) ${escapeHtml(q.options[q.correctAnswer])}`;

    item.innerHTML = `
      <div class="review-q-title">
        <span>${idx + 1}. ${escapeHtml(q.question)}</span>
        <span class="badge-tag ${isCorrect ? 'correct' : 'wrong'}">
          ${isCorrect ? "To'g'ri ✓" : isSkipped ? "O'tkazib yuborilgan" : "Xato ✕"}
        </span>
      </div>
      <div class="review-answers">
        <div class="review-ans-row">
          <span class="review-ans-label">Sizning javobingiz:</span>
          <span class="review-ans-val" style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
            ${userAnsText}
          </span>
        </div>
        ${!isCorrect ? `
          <div class="review-ans-row">
            <span class="review-ans-label">To'g'ri javob:</span>
            <span class="review-ans-val" style="color: var(--success); font-weight: 700;">
              ${correctAnsText}
            </span>
          </div>
        ` : ""}
      </div>
      <div class="review-explanation">
        💡 <strong>Izoh:</strong> ${escapeHtml(q.explanation)}
      </div>
    `;

    reviewList.appendChild(item);
  });
}

function toggleReview() {
  if (reviewContainer.style.display === "none") {
    reviewContainer.style.display = "block";
    btnToggleReview.textContent = "▲ Tahlilni Yashirish";
    reviewContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    reviewContainer.style.display = "none";
    btnToggleReview.textContent = "📋 Xatolar va Tahlilni ko'rish";
  }
}

// Qayta topshirish
function handleRestart() {
  inpFirstName.value = "";
  inpLastName.value = "";
  inpGroup.value = "";
  reviewContainer.style.display = "none";
  btnToggleReview.textContent = "📋 Xatolar va Tahlilni ko'rish";
  switchScreen("register");
}

// --- 8. SOZLAMALAR MODALI ---
function openSettingsModal() {
  inpSheetUrl.value = appState.googleSheetUrl;
  settingsTestMsg.style.display = "none";
  settingsModal.classList.add("active");
}

function closeSettingsModal() {
  settingsModal.classList.remove("active");
}

function saveSettings() {
  const url = inpSheetUrl.value.trim();
  appState.googleSheetUrl = url;
  localStorage.setItem("js_quiz_sheet_url", url);
  alert("Google Sheet URL muvaffaqiyatli saqlandi! ✅");
  closeSettingsModal();
}

async function testGoogleSheetConnection() {
  const url = inpSheetUrl.value.trim();
  if (!url) {
    showTestMsg("Iltimos, avval Google Apps Script URL manzilini kiriting!", false);
    return;
  }

  showTestMsg("Google Sheets bilan aloqa tekshirilmoqda...", null);

  try {
    const testData = new URLSearchParams();
    testData.append("fullName", "Test O'quvchi");
    testData.append("group", "Sinov Guruhi");
    testData.append("score", "20");
    testData.append("total", "20");
    testData.append("percentage", "100%");
    testData.append("grade", "A'lo (5)");
    testData.append("timeSpent", "1 daqiqa");

    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: testData.toString()
    });

    showTestMsg("✅ Google Sheet ga sinov yozuvi muvaffaqiyatli yuborildi! Jadvalingizni tekshiring.", true);
  } catch (err) {
    showTestMsg("❌ Ulanishda xatolik yuz berdi: " + err.message, false);
  }
}

function showTestMsg(msg, isSuccess) {
  settingsTestMsg.style.display = "block";
  settingsTestMsg.textContent = msg;
  if (isSuccess === true) {
    settingsTestMsg.style.background = "#ecfdf5";
    settingsTestMsg.style.color = "#065f46";
  } else if (isSuccess === false) {
    settingsTestMsg.style.background = "#fef2f2";
    settingsTestMsg.style.color = "#991b1b";
  } else {
    settingsTestMsg.style.background = "#eff6ff";
    settingsTestMsg.style.color = "#1e40af";
  }
}

// Xavfsizlik uchun HTML belgilarini tozalash
function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Dasturni ishga tushirish
document.addEventListener("DOMContentLoaded", init);
