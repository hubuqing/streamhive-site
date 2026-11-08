import type { H3Event } from 'h3'

export function getSecret(event: H3Event, key: string): string | undefined {
  const ctx = event.context as Record<string, unknown>
  const cf = (ctx.cloudflare ?? {}) as Record<string, unknown>
  const env = (cf.env ?? {}) as Record<string, unknown>
  const v = env[key] ?? ctx[key]
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

const enc = new TextEncoder()

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(input))
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export const ADMIN_COOKIE = 'sh_admin'
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000

export async function issueToken(secret: string): Promise<string> {
  const expiry = String(Date.now() + TOKEN_TTL_MS)
  return `${expiry}.${await hmacHex(secret, expiry)}`
}

export async function verifyToken(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false
  const dot = token.indexOf('.')
  if (dot < 1) return false
  const expiry = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  if (!/^\d+$/.test(expiry) || !/^[0-9a-f]{64}$/.test(sig)) return false
  if (Number(expiry) <= Date.now()) return false
  return safeEqual(await hmacHex(secret, expiry), sig)
}

export async function checkPassword(input: string, expected: string): Promise<boolean> {
  return safeEqual(await sha256Hex(input), await sha256Hex(expected))
}

export async function requireAdmin(event: H3Event): Promise<void> {
  const secret = getSecret(event, 'AUTH_SECRET')
  if (!secret) {
    throw createError({ statusCode: 503, statusMessage: 'Server not configured' })
  }
  const token = getCookie(event, ADMIN_COOKIE)
  if (!(await verifyToken(token, secret))) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}