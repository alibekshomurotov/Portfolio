// ============================================================
// CONTACT CONFIGURATION - Bog'lanish sozlamalari
// ============================================================
// Quyidagi qadamlarni bajarib, o'zingizning ma'lumotlaringizni kiriting:
//
// === TELEGRAM SOZLASH (eng oson, 2 daqiqada tayyor):
// 1. Telegram'da @BotFather botiga o'ting
// 2. /newbot buyrug'ini yuboring, bot nomini kiriting
// 3. Sizga BOT_TOKEN beriladi (masalan: 123456:ABC-DEF...)
// 4. @userinfobot ga xabar yuboring — CHAT_ID oling
// 5. Quyidagi TELEGRAM bot token va chat id'ni kiriting
//
// === EMAILJS SOZLASH (Gmail uchun):
// 1. https://www.emailjs.com/ ga o'ting va bepul ro'yxatdan o'ting
// 2. "Add New Service" bosin -> Gmail tanlang -> ulang
// 3. SERVICE_ID olasiz (masalan: service_abc123)
// 4. "Email Templates" -> yangi template yarating:
//    - Template variablelari: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 5. TEMPLATE_ID olasiz (masalan: template_xyz789)
// 6. "Account" -> Public Key olasiz
// 7. Quyidagi EmailJS sozlamalarini kiriting
// ============================================================

const contactConfig = {

  // --- TELEGRAM BOT SOZLAMALARI ---
  telegram: {
    enabled: true, // true qiling ishlashi uchun
    botToken: '7987265235:AAEcRazq7ijEvWW3GcYbl7uHRD8CUCd-j7Y',   // @BotFather dan olingan token
    chatId: '8014950410 ',     // @userinfobot dan olingan chat ID
  },

  // --- EMAILJS SOZLAMALARI (Gmail uchun) ---
  emailjs: {
    enabled: true,     // true qiling ishlashi uchun
    serviceId: 'service_fj2v7rr',      // EmailJS service ID
    templateId: 'template_iq1ned9',     // EmailJS template ID
    publicKey: 'BegDCSskL7Ef-4k3X',      // EmailJS public key
  },

  // --- QO'SHIMCHA ---
  // Agar ikkala xizmat ham o'chirilgan bo'lsa, xabar faqat localStorage'ga saqlanadi
  // (Admin panel orqali ko'rish mumkin bo'ladi)
};

export default contactConfig;
