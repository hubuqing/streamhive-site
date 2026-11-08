export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = getDB(event)
  await ensureTable(db)
  const rows = await db.prepare(
    'SELECT id, name, email, company, rooms, topic, message, locale, status, created_at FROM contact_submissions ORDER BY id DESC LIMIT 500'
  ).all()
  return { submissions: rows.results }
})