import type { H3Event } from 'h3'

interface D1Statement {
  bind(...values: unknown[]): { all(): Promise<{ results: unknown[] }>; run(): Promise<unknown> }
}

export interface D1Database {
  prepare(sql: string): D1Statement
}

export function getDB(event: H3Event): D1Database {
  const ctx = event.context as Record<string, unknown>
  const cf = (ctx.cloudflare ?? {}) as Record<string, unknown>
  const env = (cf.env ?? {}) as Record<string, unknown>
  const db = env.DB ?? ctx.DB
  if (!db) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }
  return db as D1Database
}

let tableReady = false

export async function ensureTable(db: D1Database): Promise<void> {
  if (tableReady) return
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      rooms TEXT,
      topic TEXT NOT NULL,
      message TEXT NOT NULL,
      locale TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run()
  await db.prepare('ALTER TABLE contact_submissions ADD COLUMN rooms TEXT').run().catch(() => {})
  tableReady = true
}