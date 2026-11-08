export default defineEventHandler((event) => {
  const base = process.env.NUXT_PUBLIC_SITE_URL || 'https://streamhive-site.hubuqing.workers.dev'

  const txt = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    ''
  ].join('\n')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return txt
})