const LOCALES = ['en', 'de', 'tr', 'zh', 'es', 'ru']
const LANG_TAGS: Record<string, string> = {
  en: 'en-US',
  de: 'de-DE',
  tr: 'tr-TR',
  zh: 'zh-CN',
  es: 'es-ES',
  ru: 'ru-RU'
}

const PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/features', changefreq: 'monthly', priority: '0.9' },
  { path: '/solutions', changefreq: 'monthly', priority: '0.9' },
  { path: '/solutions/groups', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/independent', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/resorts', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/boutique', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/apartments', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/wellness', changefreq: 'monthly', priority: '0.8' },
  { path: '/integrations', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.2' },
  { path: '/cookie-policy', changefreq: 'yearly', priority: '0.2' }
]

const localePathFor = (locale: string, path: string): string =>
  locale === 'en' ? (path === '' ? '/' : path) : `/${locale}${path === '' ? '' : path}`

export default defineEventHandler((event) => {
  const base = process.env.NUXT_PUBLIC_SITE_URL || 'https://streamhive-site.hubuqing.workers.dev'
  const today = new Date().toISOString().slice(0, 10)

  const entries: string[] = []

  for (const page of PAGES) {
    for (const loc of LOCALES) {
      const url = `${base}${localePathFor(loc, page.path)}`
      const alternates = LOCALES.map((alt) => {
        const altUrl = `${base}${localePathFor(alt, page.path)}`
        return `<xhtml:link rel="alternate" hreflang="${LANG_TAGS[alt]}" href="${altUrl}"/>`
      })
      alternates.push(
        `<xhtml:link rel="alternate" hreflang="x-default" href="${base}${localePathFor('en', page.path)}"/>`
      )

      entries.push(
        [
          '  <url>',
          `    <loc>${url}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>${page.changefreq}</changefreq>`,
          `    <priority>${page.priority}</priority>`,
          ...alternates.map((a) => `    ${a}`),
          '  </url>'
        ].join('\n')
      )
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    ''
  ].join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  return xml
})