export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    const base = process.env.NUXT_PUBLIC_SITE_URL || 'https://streamhive-site.hubuqing.workers.dev'

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${base}/#organization`,
          name: 'Castella',
          url: base,
          description: 'Hotel IPTV and hospitality TV platform: casting, streaming, welcome screens and digital dining for guest rooms.',
          areaServed: 'Worldwide'
        },
        {
          '@type': 'WebSite',
          '@id': `${base}/#website`,
          url: base,
          name: 'Castella',
          inLanguage: ['en-US', 'de-DE', 'tr-TR', 'zh-CN', 'es-ES', 'ru-RU'],
          publisher: { '@id': `${base}/#organization` }
        }
      ]
    }

    html.head.push(
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    )
  })
})