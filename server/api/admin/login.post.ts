export default defineEventHandler(async (event) => {
  const password = getSecret(event, 'ADMIN_PASSWORD')
  const authSecret = getSecret(event, 'AUTH_SECRET')
  if (!password || !authSecret) {
    throw createError({ statusCode: 503, statusMessage: 'Server not configured' })
  }

  const body = await readBody<{ password?: unknown }>(event).catch(() => null)
  const input = typeof body?.password === 'string' ? body.password : ''
  if (!input || !(await checkPassword(input, password))) {
    throw createError({ statusCode: 401, statusMessage: 'Wrong password' })
  }

  setCookie(event, ADMIN_COOKIE, await issueToken(authSecret), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60
  })
  return { ok: true }
})