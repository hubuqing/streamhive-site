export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id < 1) {
    throw createError({ statusCode: 400, statusMessage: 'Bad id' })
  }

  const db = getDB(event)
  await db.prepare('DELETE FROM contact_submissions WHERE id = ?').bind(id).run()
  return { ok: true }
})