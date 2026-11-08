const TOPICS = new Set(['demo', 'integration', 'partnership', 'other'])
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LOCALES = new Set(['en', 'de', 'tr', 'zh', 'es', 'ru'])

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event).catch(() => null)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Bad request' })
  }

  const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : (typeof v === 'number' ? String(v) : ''))
  const name = str(body.name)
  const email = str(body.email)
  const company = str(body.company)
  const rooms = str(body.rooms)
  const topic = str(body.topic)
  const message = str(body.message)
  const locale = str(body.locale)
  const website = str(body.website)

  if (website) {
    return { ok: true }
  }

  if (!name || name.length > 100) throw createError({ statusCode: 422, statusMessage: 'Invalid name' })
  if (!EMAIL_RE.test(email) || email.length > 200) throw createError({ statusCode: 422, statusMessage: 'Invalid email' })
  if (company.length > 200) throw createError({ statusCode: 422, statusMessage: 'Invalid company' })
  if (rooms && !/^\d{1,6}$/.test(rooms)) throw createError({ statusCode: 422, statusMessage: 'Invalid rooms' })
  if (!TOPICS.has(topic)) throw createError({ statusCode: 422, statusMessage: 'Invalid topic' })
  if (message.length < 10 || message.length > 5000) throw createError({ statusCode: 422, statusMessage: 'Invalid message' })

  const db = getDB(event)
  await ensureTable(db)
  await db.prepare(
    'INSERT INTO contact_submissions (name, email, company, rooms, topic, message, locale) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(name, email, company || null, rooms || null, topic, message, LOCALES.has(locale) ? locale : null).run()

  return { ok: true }
})