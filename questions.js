// 23-27 mavzular bo'yicha 20 ta test savollari
const quizQuestions = [
  // --- 23-Mavzu: JavaScript nima?: Console, alert bilan muloqot (1-4 savollar) ---
  {
    id: 1,
    topic: "23. JavaScript nima? Console, alert bilan muloqot",
    question: "JavaScript dasturlash tili asosan nima uchun ishlatiladi?",
    options: [
      "Veb-sahifalarga interaktivlik va dinamik harakatlar qo'shish uchun",
      "Faqat kompyuterning operatsion tizimini o'rnatish uchun",
      "Faqat fotosuratlarni tahrirlash uchun",
      "Veb-sahifaning faqat ranglari va shriftlarini bezash uchun"
    ],
    correctAnswer: 0,
    explanation: "JavaScript — veb-sahifalarni jonlantirish, foydalanuvchi harakatlariga javob berish va interaktivlik qo'shish uchun xizmat qiladi."
  },
  {
    id: 2,
    topic: "23. JavaScript nima? Console, alert bilan muloqot",
    question: "Foydalanuvchi ekraniga faqat ogohlantirish xabarini chiqaruvchi va 'OK' tugmasi bo'lgan buyruq qaysi?",
    options: [
      "console.log()",
      "alert()",
      "prompt()",
      "print()"
    ],
    correctAnswer: 1,
    explanation: "alert('xabar') funksiyasi brauzerda ogohlantiruvchi modal darcha ochib, foydalanuvchiga xabar ko'rsatadi."
  },
  {
    id: 3,
    topic: "23. JavaScript nima? Console, alert bilan muloqot",
    question: "Dasturchilar kodni tekshirish va ma'lumotlarni brauzer konsoliga chiqarish uchun qaysi buyruqdan foydalanadilar?",
    options: [
      "console.log()",
      "window.write()",
      "alert.log()",
      "terminal.send()"
    ],
    correctAnswer: 0,
    explanation: "console.log() orqali dasturchilar o'zgaruvchilar, natijalar va xatolarni konsol oynasida ko'rishlari mumkin."
  },
  {
    id: 4,
    topic: "23. JavaScript nima? Console, alert bilan muloqot",
    question: "Foydalanuvchidan matn yoki ma'lumot kiritishni so'rab, kiritilgan qiymatni qaytaruvchi muloqot oynasi qaysi?",
    options: [
      "confirm()",
      "alert()",
      "prompt()",
      "input()"
    ],
    correctAnswer: 2,
    explanation: "prompt('Savol') orqali foydalanuvchi matn kiritishi mumkin va kiritilgan qiymat qaytadi."
  },

  // --- 24-Mavzu: O'zgaruvchilar: let, const, string, number (5-8 savollar) ---
  {
    id: 5,
    topic: "24. O'zgaruvchilar: let, const, string, number",
    question: "const kalit so'zi bilan e'lon qilingan o'zgaruvchi haqida qaysi fikr to'g'ri?",
    options: [
      "Uning qiymatini dastur davomida qayta o'zgartirib bo'lmaydi (o'zgarmas)",
      "U faqat matnli ma'lumotlarni saqlaydi",
      "Uning qiymatini istalgancha qayta o'zgartirish mumkin",
      "U faqat 0 dan kichik sonlarni saqlaydi"
    ],
    correctAnswer: 0,
    explanation: "const (constant) — qiymati o'zgarmaydigan o'zgaruvchi e'lon qilish uchun ishlatiladi."
  },
  {
    id: 6,
    topic: "24. O'zgaruvchilar: let, const, string, number",
    question: "let yosh = 18; va let ism = 'Ali'; o'zgaruvchilarining ma'lumot turlari mos ravishda qanday?",
    options: [
      "number va string",
      "string va number",
      "boolean va array",
      "object va string"
    ],
    correctAnswer: 0,
    explanation: "18 son bo'lgani uchun 'number', qo'shtirnoq ichidagi 'Ali' esa 'string' (matn) turiga kiradi."
  },
  {
    id: 7,
    topic: "24. O'zgaruvchilar: let, const, string, number",
    question: "typeof 'Salom' kodi qanday natija qaytaradi?",
    options: [
      "\"number\"",
      "\"boolean\"",
      "\"string\"",
      "\"undefined\""
    ],
    correctAnswer: 2,
    explanation: "typeof operatori qiymatning turini aniqlaydi. 'Salom' matn bo'lgani uchun 'string' qaytaradi."
  },
  {
    id: 8,
    topic: "24. O'zgaruvchilar: let, const, string, number",
    question: "Quyidagi kod konsolga nima chiqaradi?\nlet a = 10;\nlet b = \"20\";\nconsole.log(a + b);",
    options: [
      "30",
      "\"1020\"",
      "NaN",
      "Xatolik beradi"
    ],
    correctAnswer: 1,
    explanation: "Son bilan matn qo'shilganda (konkatenatsiya) JavaScript sonni matnga aylantiradi va natija '1020' bo'ladi."
  },

  // --- 25-Mavzu: Array va Object — ma'lumot turlari (9-12 savollar) ---
  {
    id: 9,
    topic: "25. Array va Object — ma'lumot turlari",
    question: "JavaScriptda massiv (Array) elementlarining indekslanishi nechanchi raqamdan boshlanadi?",
    options: [
      "1 dan",
      "0 dan",
      "-1 dan",
      "Ixtiyoriy raqamdan"
    ],
    correctAnswer: 1,
    explanation: "Massivda birinchi element indeksi har doim 0 dan boshlanadi."
  },
  {
    id: 10,
    topic: "25. Array va Object — ma'lumot turlari",
    question: "Massivning oxiriga yangi element qo'shish uchun qaysi metod ishlatiladi?",
    options: [
      ".pop()",
      ".shift()",
      ".push()",
      ".join()"
    ],
    correctAnswer: 2,
    explanation: ".push() metodi massivning oxiriga yangi element qo'shadi."
  },
  {
    id: 11,
    topic: "25. Array va Object — ma'lumot turlari",
    question: "let talaba = { ism: 'Jasur', yosh: 20 }; obyektidan 'ism' xususiyatini olish qanday yoziladi?",
    options: [
      "talaba.ism yoki talaba['ism']",
      "talaba(ism)",
      "talaba->ism",
      "talaba::ism"
    ],
    correctAnswer: 0,
    explanation: "Obyekt xususiyatlariga nuqta (talaba.ism) yoki kvadrat qavslar (talaba['ism']) orqali murojaat qilinadi."
  },
  {
    id: 12,
    topic: "25. Array va Object — ma'lumot turlari",
    question: "let mevalar = ['Olma', 'Banan', 'Nok']; massividagi elementlar sonini qaysi xususiyat orqali bilish mumkin?",
    options: [
      "mevalar.count",
      "mevalar.size",
      "mevalar.length",
      "mevalar.total"
    ],
    correctAnswer: 2,
    explanation: "Massivning uzunligini (elementlar sonini) .length xususiyati ko'rsatadi (bu yerda 3)."
  },

  // --- 26-Mavzu: Shartli operatorlar if, else, mantiqiy amallar (13-16 savollar) ---
  {
    id: 13,
    topic: "26. Shartli operatorlar if, else, mantiqiy amallar",
    question: "== va === operatorlari o'rtasidagi asosiy farq nima?",
    options: [
      "Hech qanday farq yo'q",
      "== faqat qiymatni tekshiradi, === esa qiymat bilan birga ma'lumot turini ham qat'iy tekshiradi",
      "=== faqat matnlarni tekshirish uchun ishlatiladi",
      "== xatolik chiqaradi, === esa ishlaydi"
    ],
    correctAnswer: 1,
    explanation: "5 == '5' -> true (tur avtomatik o'zgaradi), lekin 5 === '5' -> false (qat'iy tenglik ma'lumot turini ham tekshiradi)."
  },
  {
    id: 14,
    topic: "26. Shartli operatorlar if, else, mantiqiy amallar",
    question: "JavaScriptda mantiqiy 'VA' (AND) va mantiqiy 'YOKI' (OR) amallari qaysi belgilar bilan yoziladi?",
    options: [
      "&& va ||",
      "& va |",
      "AND va OR",
      "++ va --"
    ],
    correctAnswer: 0,
    explanation: "&& — ikkala shart ham bajarilishi shart (AND), || — kamida bitta shart to'g'ri bo'lsa kifoya (OR)."
  },
  {
    id: 15,
    topic: "26. Shartli operatorlar if, else, mantiqiy amallar",
    question: "Quyidagi kod ishlaganda konsolga nima chiqadi?\nlet ball = 85;\nif (ball >= 90) {\n  console.log('A');\n} else if (ball >= 80) {\n  console.log('B');\n} else {\n  console.log('C');\n}",
    options: [
      "\"A\"",
      "\"B\"",
      "\"C\"",
      "Hech narsa chiqmaydi"
    ],
    correctAnswer: 1,
    explanation: "85 soni 90 dan kichik, lekin 80 dan katta yoki teng, shuning uchun ikkinchi shart bajarilib 'B' chiqadi."
  },
  {
    id: 16,
    topic: "26. Shartli operatorlar if, else, mantiqiy amallar",
    question: "Mantiqiy inkor (NOT) amali qaysi belgi orqali yoziladi va !true ifodasi nimaga teng?",
    options: [
      "! belgisi, natijasi: false",
      "~ belgisi, natijasi: true",
      "- belgisi, natijasi: 0",
      "!= belgisi, natijasi: null"
    ],
    correctAnswer: 0,
    explanation: "! belgisi mantiqiy inkor hisoblanadi. Rostni yolg'onga, yolg'onni rostga aylantiradi: !true -> false."
  },

  // --- 27-Mavzu: Funksiyalar — Kodni qayta ishlatish (17-20 savollar) ---
  {
    id: 17,
    topic: "27. Funksiyalar — Kodni qayta ishlatish",
    question: "Dasturlashda funksiyalardan foydalanishning asosiy maqsadi nima?",
    options: [
      "Kodni bir marta yozib, kerakli joylarda qayta-qayta ishlatish va tartibga solish",
      "Faqat kompyuterni o'chirib yoqish uchun",
      "Faqat fayllarni yuklab olish uchun",
      "Kodni sekinroq ishlatish uchun"
    ],
    correctAnswer: 0,
    explanation: "Funksiyalar kodni modullarga ajratish va bir xil vazifani takroriy yozmasdan qayta chaqirish imkonini beradi."
  },
  {
    id: 18,
    topic: "27. Funksiyalar — Kodni qayta ishlatish",
    question: "Funksiya bajargan amali natijasini qaytarib berishi uchun qaysi kalit so'zdan foydalaniladi?",
    options: [
      "send",
      "return",
      "output",
      "give"
    ],
    correctAnswer: 1,
    explanation: "return operatori funksiyadan qiymat qaytaradi va funksiya bajarilishini yakunlaydi."
  },
  {
    id: 19,
    topic: "27. Funksiyalar — Kodni qayta ishlatish",
    question: "Quyidagi kodning natijasi nima bo'ladi?\nfunction kopaytir(a, b) {\n  return a * b;\n}\nconsole.log(kopaytir(4, 5));",
    options: [
      "9",
      "20",
      "\"45\"",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "kopaytir funksiyasiga 4 va 5 argumentlari uzatildi. 4 * 5 = 20 natijasi qaytadi."
  },
  {
    id: 20,
    topic: "27. Funksiyalar — Kodni qayta ishlatish",
    question: "function salom(ism) { ... } e'lon qilinganda, 'ism' nima deb ataladi?",
    options: [
      "Parametr",
      "Argument",
      "Metod",
      "Indeks"
    ],
    correctAnswer: 0,
    explanation: "Funksiya e'lon qilinayotganda qavs ichida ko'rsatilgan o'zgaruvchi 'parametr', chaqirilayotganda uzatilgan aniq qiymat esa 'argument' deyiladi."
  }
];
