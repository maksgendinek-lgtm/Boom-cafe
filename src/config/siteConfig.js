/**
 * ═══════════════════════════════════════════════════════════════
 *  КОНФИГУРАЦИЯ САЙТА — редактируйте этот файл для смены контента
 * ═══════════════════════════════════════════════════════════════
 */

export const siteConfig = {
  name: 'BOOM',
  tagline: 'Кафе в Боомском ущелье',

  hero: {
    title: 'Кафе BOOM — Идеальная остановка по пути на Иссык-Куль',
    subtitle: 'Вкусная еда, горячий кофе и отдых в самом сердце ущелья',
    // Замените на своё фото: положите файл в public/images/ и укажите путь
    backgroundImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop',
    backgroundImageAlt: 'Боомское ущелье',
  },

  contacts: {
    // Замените на свой номер (формат: 996XXXXXXXXX без +)
    phone: '996558170757',
    phoneDisplay: '+996 558 170 757',
    address: 'Улица ЭМ-07, 1',
    addressShort: 'Боомское ущелье, трасса на Иссык-Куль',
    twoGisUrl: 'https://2gis.kg/search/Улица%20ЭМ-07%2C%201',
    workingHours: 'Круглосуточно',
  },

  cta: {
    whatsappLabel: 'Заказать на WhatsApp',
    whatsappMessage: 'Здравствуйте! Хочу сделать заказ в кафе BOOM.',
    twoGisLabel: 'Маршрут в 2ГИС',
  },

  features: {
    title: { ru: 'Почему стоит остановиться у нас', en: 'Why stop here' },
    subtitle: { ru: 'Идеальная точка отдыха для путешественников на Иссык-Куль', en: 'The perfect rest stop for travelers to Issyk-Kul' },
    items: [
      {
        icon: 'Zap',
        title: { ru: 'Быстрая подача', en: 'Fast service' },
        text: { ru: 'Готовим быстро — вы не потеряете время в дороге', en: 'We cook fast — you won\'t lose time on the road' },
      },
      {
        icon: 'Coffee',
        title: { ru: 'Уютная атмосфера', en: 'Cozy atmosphere' },
        text: { ru: 'Тёплый интерьер и вид на горы — отдохните с комфортом', en: 'Warm interior and mountain views — rest in comfort' },
      },
      {
        icon: 'MapPin',
        title: { ru: 'Удобное расположение', en: 'Convenient location' },
        text: { ru: 'Прямо на трассе — легко заехать и припарковаться', en: 'Right on the highway — easy to stop and park' },
      },
    ],
  },

  menu: {
    title: 'Меню',
    subtitle: 'Выберите категорию или найдите блюдо через поиск',
    currency: 'сом',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Кафе BOOM. Боомское ущелье.`,
  },
}

/** Ссылки, сформированные из конфига */
export const WHATSAPP_URL = `https://wa.me/${siteConfig.contacts.phone}?text=${encodeURIComponent(siteConfig.cta.whatsappMessage)}`
export const PHONE = siteConfig.contacts.phoneDisplay
export const PHONE_LINK = `tel:+${siteConfig.contacts.phone}`
