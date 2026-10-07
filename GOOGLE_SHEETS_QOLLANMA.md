# 📊 Google Sheets Integratsiyasi — To'liq Qo'llanma

Ushbu test tizimida har bir o'quvchi testni yechib bo'lgach, uning **Ismi, Familiyasi, Guruhi, Nechta to'g'ri ishlagani (masalan: 18/20), Natija foizi (90%), Bahosi va Sarflangan vaqti** avtomatik tarzda sizning Google Sheets jadvalingizga borib tushadi.

Buning uchun quyidagi 4 ta oson qadamni bajaring:

---

### 1-QADAM: Google Sheets-da yangi jadval oching
1. Brauzeringizda [sheets.google.com](https://sheets.google.com) saytiga kiring.
2. Yangi bo'sh jadval yarating (Masalan nomi: **"JavaScript Test Natijalari"**).

---

### 2-QADAM: Apps Script bo'limiga kiring
1. Jadvalning yuqori menyusidan: **Kengaytmalar (Extensions)** menyusini bosing.
2. Ochilgan ro'yxatdan **Apps Script** tugmasini bosing.
3. Yangi oynada kod muharriri ochiladi. U yerdagi mavjud kodni o'chiring.

---

### 3-QADAM: Loyihadagi tayyor skriptni joylang
1. Loyiha papkasidagi `google-apps-script.js` faylini oching.
2. U yerdagi barcha kodni nusxalab oling (Ctrl + A, Ctrl + C).
3. Google Apps Script oynasiga joylashtiring (Ctrl + V).
4. Yuqoridagi **Saqlash (Save / 💾 diskcha belgisi)** tugmasini bosing (yoki Ctrl + S).

---

### 4-QADAM: Veb-ilova (Web App) sifatida ishga tushirish (Deploy)
1. Apps Script oynasining yuqori o'ng burchagidagi ko'k **"Joylashtirish" (Deploy)** tugmasini bosing.
2. **"Yangi joylashtirish" (New deployment)** bandini tanlang.
3. Chap tarafdagi tishli g'ildirak (⚙️ Sozlamalar) belgisini bosib, **"Veb-ilova" (Web app)** turini tanlang.
4. Quyidagi parametrlarni to'g'ri tanlang:
   - **Tavsif (Description):** `JavaScript Quiz Natijalari`
   - **Kim sifatida bajarish (Execute as):** `Men` (Me - sizning emailingiz)
   - **Kirish huquqi (Who has access):** `Hamma` (Anyone)  <--- **JUDA MUHIM!**
5. Pastdagi **"Joylashtirish" (Deploy)** tugmasini bosing.
6. Agar Google ruxsat so'rasa:
   - **Kirishga ruxsat berish (Authorize access)** tugmasini bosing.
   - O'z Google profilingizni tanlang.
   - Chiqqan ogohlantirishda **"Kengaytirilgan" (Advanced)** yozuvini bosing.
   - Pastdagi **"Go to ... (unsafe)"** havolasini bosing.
   - **"Ruxsat berish" (Allow)** tugmasini bosing.
7. Shundan so'ng sizga **"Veb-ilova URL manzili" (Web app URL)** beriladi.
   *(U taxminan shunday ko'rinishda bo'ladi: `https://script.google.com/macros/s/AKfycb.../exec`)*
8. Ushbu URL manzilni **Nusxalab oling (Copy)**.

---

### 5-QADAM: Quiz dasturiga URL-ni ulash
1. Brauzerda `index.html` faylini oching.
2. Yuqori o'ng tarafdagi **⚙️ Sozlamalar** tugmasini bosing.
3. Nusxalangan Google Web App URL manzilini joylashtiring va **"Saqlash"** tugmasini bosing!
4. Xohlasangiz **"Sinab ko'rish 🧪"** tugmasini bosib tekshirib ko'rishingiz mumkin — jadvalingizga avtomatik test qatori qo'shiladi.

> **💡 Maslahat:** Agar doimiy ravishda shu jadval ishlatilishi kerak bo'lsa, `app.js` faylining 7-qatoridagi `DEFAULT_GOOGLE_SHEET_URL = ""` qo'shtirnoqlari orasiga ham URL-ingizni qo'yib qo'yishingiz mumkin. Shunda har safar sozlash shart bo'lmaydi!
