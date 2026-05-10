

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


};

export default contactConfig;
