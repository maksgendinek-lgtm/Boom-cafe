import { useEffect } from 'react'
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react'
import { PHONE, PHONE_LINK, WHATSAPP_URL, siteConfig } from '../config/siteConfig'
import { useLanguage } from '../context/LanguageContext'

const texts = {
  ru: {
    back: 'Вернуться на сайт',
    title: 'Политика конфиденциальности',
    updated: 'Сентябрь 2026 г.',
    intro:
      'Сайт кафе BOOM — информационный ресурс: мы рассказываем о кафе, меню и контактах. Мы не просим посетителей вводить никакие данные и не собираем личную информацию.',
    sections: [
      {
        title: '1. Какие данные мы собираем',
        body: [
          'Мы не собираем, не храним и не обрабатываем персональные данные посетителей сайта. На сайте нет форм регистрации, заявок, комментариев и подписок.',
          'Мы не используем системы веб-аналитики, рекламные пиксели и трекеры. Поиск по меню выполняется прямо на вашем устройстве — введённый запрос никуда не отправляется.',
        ],
      },
      {
        title: '2. Файлы cookie',
        body: [
          'Сайт не устанавливает cookie и не отслеживает ваши действия. Выбранный язык и другие настройки не сохраняются между визитами.',
        ],
      },
      {
        title: '3. Сторонние сервисы',
        body: [
          'На сайте есть кнопки и ссылки, ведущие во внешние сервисы: WhatsApp (связь с нами) и 2ГИС (маршрут к кафе).',
          'При переходе в сторонний сервис обработкой ваших данных (например, номера телефона) занимается сам сервис в соответствии со своей политикой конфиденциальности:',
        ],
        links: [
          { label: 'Политика конфиденциальности WhatsApp', url: 'https://www.whatsapp.com/legal/privacy-policy' },
          { label: 'Политика конфиденциальности 2ГИС', url: 'https://2gis.ru/privacy' },
        ],
      },
      {
        title: '4. Если вы нам написали или позвонили',
        body: [
          'Если вы позвоните или напишете нам в WhatsApp, ваш номер телефона и текст сообщения увидим только мы.',
          'Мы используем эти данные исключительно для ответа на ваш запрос, не передаём их третьим лицам и не рассылаем рекламу.',
        ],
      },
      {
        title: '5. Изменения политики',
        body: ['Мы можем время от времени обновлять эту политику. Актуальная версия всегда доступна на этой странице.'],
      },
    ],
    questionsTitle: 'Остались вопросы?',
    questionsText: 'Позвоните или напишите — мы на связи круглосуточно.',
    waBtn: 'Написать в WhatsApp',
  },
  en: {
    back: 'Back to website',
    title: 'Privacy Policy',
    updated: 'September 2026',
    intro:
      'The BOOM cafe website is an informational resource: we tell you about the cafe, our menu and contacts. We do not ask visitors to enter any data and we do not collect personal information.',
    sections: [
      {
        title: '1. What data we collect',
        body: [
          'We do not collect, store or process any personal data of website visitors. There are no registration forms, order forms, comments or subscriptions on the site.',
          'We do not use web analytics, advertising pixels or trackers. The menu search runs entirely on your device — your query is never sent anywhere.',
        ],
      },
      {
        title: '2. Cookies',
        body: [
          'The website does not set cookies and does not track your activity. Your chosen language and other preferences are not stored between visits.',
        ],
      },
      {
        title: '3. Third-party services',
        body: [
          'The website has buttons and links leading to external services: WhatsApp (to contact us) and 2GIS (route to the cafe).',
          'When you switch to a third-party service, your data (e.g. your phone number) is processed by that service under its own privacy policy:',
        ],
        links: [
          { label: 'WhatsApp Privacy Policy', url: 'https://www.whatsapp.com/legal/privacy-policy' },
          { label: '2GIS Privacy Policy', url: 'https://2gis.ru/privacy' },
        ],
      },
      {
        title: '4. If you called or messaged us',
        body: [
          'If you call us or message us on WhatsApp, only we see your phone number and the message text.',
          'We use this data solely to answer your request, we never share it with third parties and never send advertising.',
        ],
      },
      {
        title: '5. Changes to this policy',
        body: ['We may update this policy from time to time. The current version is always available on this page.'],
      },
    ],
    questionsTitle: 'Any questions?',
    questionsText: 'Call or message us — we are available 24/7.',
    waBtn: 'Message on WhatsApp',
  },
}

export default function PrivacyPage() {
  const { lang } = useLanguage()
  const t = texts[lang] || texts.ru

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-deep-900 text-stone-300">
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
        <a
          href="#/"
          className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-terracotta-dark transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          {t.back}
        </a>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mt-8">{t.title}</h1>
        <p className="text-deep-500 text-sm mt-3">{t.updated}</p>

        <p className="mt-8 leading-relaxed text-stone-300/90">{t.intro}</p>

        <div className="mt-10 space-y-8">
          {t.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl md:text-2xl font-semibold text-terracotta">{section.title}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-3 leading-relaxed text-stone-300/90">
                  {paragraph}
                </p>
              ))}
              {section.links && (
                <ul className="mt-3 space-y-1">
                  {section.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal hover:text-teal-dark underline underline-offset-4"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-deep-600/40 bg-white/70 backdrop-blur p-8">
          <h2 className="font-display text-2xl font-semibold text-cream">{t.questionsTitle}</h2>
          <p className="mt-2 text-stone-300/90">{t.questionsText}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={PHONE_LINK} className="premium-btn premium-btn-ghost px-6 py-3 text-sm">
              <Phone size={16} />
              {PHONE}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-btn premium-btn-terracotta px-6 py-3 text-sm"
            >
              <MessageCircle size={16} />
              {t.waBtn}
            </a>
          </div>
          <p className="mt-4 text-deep-500 text-sm">{siteConfig.contacts.addressShort}</p>
        </div>

        <p className="mt-12 text-deep-500 text-xs">
          © {new Date().getFullYear()} BOOM · {lang === 'ru' ? 'Боомское ущелье, Кыргызстан' : 'Boom Gorge, Kyrgyzstan'}
        </p>
      </div>
    </div>
  )
}
