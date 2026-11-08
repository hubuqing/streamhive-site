const STATUSES = new Set(['new', 'read', 'archived'])

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id < 1) {
    throw createError({ statusCode: 400, statusMessage: 'Bad id' })
  }

  const body = await readBody<{ status?: unknown }>(event).catch(() => null)
  const status = typeof body?.status === 'string' ? body.status : ''
  if (!STATUSES.has(status)) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid status' })
  }

  const db = getDB(event)
  await db.prepare('UPDATE contact_submissions SET status = ? WHERE id = ?').bind(status, id).run()
  return { ok: true }
})