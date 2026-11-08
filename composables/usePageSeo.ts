export const usePageSeo = (page: string, title: string) => {
  const { t, locale, locales } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()
  const base = (config.public.siteUrl as string) || 'https://streamhive-site.hubuqing.workers.dev'

  const descriptionMap: Record<string, string> = {
    home: 'descHome',
    features: 'descFeatures',
    solutions: 'descSolutions'
  }
  const description = descriptionMap[page] ? t(`seo.${descriptionMap[page]}`) : t('seo.descHome')

  const keywordsMap: Record<string, string> = {
    home: 'keywordsHome',
    features: 'keywordsFeatures',
    solutions: 'keywordsSolutions',
    solutionDetail: 'keywordsSolutions',
    integrations: 'keywordsIntegrations',
    about: 'keywordsAbout',
    contact: 'keywordsContact'
  }
  const keywords = keywordsMap[page] ? t(`seo.${keywordsMap[page]}`) : t('seo.keywordsHome')

  const cleanPath = route.path.length > 1 && route.path.endsWith('/') ? route.path.slice(0, -1) : route.path
  const canonical = `${base}${cleanPath}`

  const langTag = locales.value.find(l => l.code === locale.value)?.language || 'en-US'
  const ogImage = `${base}/images/hero-platform.webp`

  useSeoMeta({
    title,
    description,
    keywords,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogImage,
    ogSiteName: 'Castella',
    ogLocale: langTag.replace('-', '_'),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }]
  })
}