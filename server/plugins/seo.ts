import en from '../../i18n/locales/en.json'
import zh from '../../i18n/locales/zh.json'
import de from '../../i18n/locales/de.json'
import tr from '../../i18n/locales/tr.json'
import es from '../../i18n/locales/es.json'
import ru from '../../i18n/locales/ru.json'

const FAQ_BY_LOCALE: Record<string, { q: string; a: string }[]> = {
  en: faqEntries(en.faq as unknown as Record<string, string>),
  zh: faqEntries(zh.faq as unknown as Record<string, string>),
  de: faqEntries(de.faq as unknown as Record<string, string>),
  tr: faqEntries(tr.faq as unknown as Record<string, string>),
  es: faqEntries(es.faq as unknown as Record<string, string>),
  ru: faqEntries(ru.faq as unknown as Record<string, string>)
}

function faqEntries(faq: Record<string, string>): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = []
  for (const k of ['q1', 'q2', 'q3', 'q4']) {
    const q = faq[k]
    const a = faq[`a${k.slice(1)}`]
    if (q && a) out.push({ q, a })
  }
  return out
}

const LANG_TAGS: Record<string, string> = {
  en: 'en-US',
  de: 'de-DE',
  tr: 'tr-TR',
  zh: 'zh-CN',
  es: 'es-ES',
  ru: 'ru-RU'
}

function detectLocale(path: string | undefined): string {
  if (!path) return 'en'
  const m = path.match(/^\/(de|tr|zh|es|ru)(?:\/|$)/)
  return m ? m[1] : 'en'
}

function buildFaqJsonLd(locale: string, base: string) {
  const faqs = FAQ_BY_LOCALE[locale] || FAQ_BY_LOCALE.en
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${base}/#faqpage`,
    inLanguage: LANG_TAGS[locale] || 'en-US',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  }
}

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html, context) => {
    const base = process.env.NUXT_PUBLIC_SITE_URL || 'https://streamhive-site.hubuqing.workers.dev'
    const req = (context as { event?: { path?: string; node?: { req?: { url?: string } } } })
    const path = req?.event?.path || req?.event?.node?.req?.url
    const locale = detectLocale(path)

    const orgJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${base}/#organization`,
          name: 'Quanzhou Sumin Electronics Technology Co., Ltd.',
          alternateName: ['Sumin', '泉州市苏闽电子科技有限公司'],
          url: base,
          description: 'Hotel IPTV and hospitality TV platform: casting, streaming, welcome screens, contactless QR dining and digital concierge for guest rooms.',
          areaServed: 'Worldwide',
          knowsAbout: [
            'Hotel IPTV',
            'Hospitality TV',
            'In-Room Entertainment',
            'Digital Concierge for Hotels',
            'Contactless QR Room Dining',
            'Hotel PMS Integration',
            'Samsung LYNK and LG Pro:Centric Integration',
            'Hotel Casting and OTT Streaming'
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Hospitality TV Solutions',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hotel IPTV Platform', description: 'Smart TV apps, casting, streaming and welcome screens for guest rooms.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Dining', description: 'Picture menus with one-tap room service ordering and allergen filters.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PMS Integration', description: 'Two-way sync with leading property management systems.' } }
            ]
          }
        },
        {
          '@type': 'WebSite',
          '@id': `${base}/#website`,
          url: base,
          name: 'Sumin',
          inLanguage: ['en-US', 'de-DE', 'tr-TR', 'zh-CN', 'es-ES', 'ru-RU'],
          publisher: { '@id': `${base}/#organization` },
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub', '.faq-body'] }
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${base}/#software`,
          name: 'Sumin Hotel IPTV Platform',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Samsung Tizen, LG webOS Pro:Centric, Philips, Android TV, iOS, Web',
          description: 'Hotel IPTV platform delivering guest welcome screens, casting, OTT streaming, QR room service and automated PMS folio billing.'
        }
      ]
    }

    const targets = (html as { head?: string[]; headPush?: string[] }).head || (html as { headPush?: string[] }).headPush
    if (Array.isArray(targets)) {
      targets.push(
        `<script type="application/ld+json">${JSON.stringify(orgJsonLd)}</script>`,
        `<script type="application/ld+json">${JSON.stringify(buildFaqJsonLd(locale, base))}</script>`
      )
    }
  })
})