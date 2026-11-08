<script setup lang="ts">
useSeoMeta({ title: 'Admin', robots: 'noindex, nofollow' })

interface Submission {
  id: number
  name: string
  email: string
  company: string | null
  rooms: string | null
  topic: string
  message: string
  locale: string | null
  status: string
  created_at: string
}

const password = ref('')
const authed = ref(false)
const loading = ref(false)
const loginError = ref(false)
const submissions = ref<Submission[]>([])
const listError = ref(false)
const busyIds = ref<Set<number>>(new Set())

const TOPIC_LABELS: Record<string, string> = {
  demo: 'Demo',
  integration: 'Integration',
  partnership: 'Partnership',
  other: 'Other'
}

const login = async () => {
  if (loading.value || !password.value) return
  loading.value = true
  loginError.value = false
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    authed.value = true
    await load()
  } catch {
    loginError.value = true
  } finally {
    loading.value = false
  }
}

const load = async () => {
  listError.value = false
  try {
    const res = await $fetch<{ submissions: Submission[] }>('/api/admin/submissions')
    submissions.value = res.submissions
  } catch {
    listError.value = true
  }
}

const logout = async () => {
  await $fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
  authed.value = false
  submissions.value = []
  password.value = ''
}

const setStatus = async (id: number, status: string) => {
  if (busyIds.value.has(id)) return
  busyIds.value.add(id)
  const prev = submissions.value.find(s => s.id === id)?.status
  const row = submissions.value.find(s => s.id === id)
  if (row) row.status = status
  try {
    await $fetch(`/api/admin/submissions/${id}`, { method: 'PATCH', body: { status } })
  } catch {
    if (row && prev) row.status = prev
  } finally {
    busyIds.value.delete(id)
  }
}

const remove = async (id: number) => {
  if (busyIds.value.has(id)) return
  busyIds.value.add(id)
  try {
    await $fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' })
    submissions.value = submissions.value.filter(s => s.id !== id)
  } catch {
  } finally {
    busyIds.value.delete(id)
  }
}

onMounted(async () => {
  try {
    const res = await $fetch<{ submissions: Submission[] }>('/api/admin/submissions')
    submissions.value = res.submissions
    authed.value = true
  } catch {
    authed.value = false
  }
})
</script>

<template>
  <div class="admin-page">
    <div v-if="!authed" class="admin-login">
      <h2>Admin</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="admin-pass">Password</label>
          <input id="admin-pass" v-model="password" type="password" autocomplete="current-password" required>
        </div>
        <div v-if="loginError" class="form-error">Wrong password</div>
        <button type="submit" class="btn btn-primary" style="width: 100%" :disabled="loading">
          {{ loading ? '…' : 'Sign in' }}
        </button>
      </form>
    </div>

    <div v-else class="admin-panel">
      <div class="admin-head">
        <h2>Contact submissions ({{ submissions.length }})</h2>
        <div class="admin-actions">
          <button class="btn btn-ghost btn-sm" @click="load()">Refresh</button>
          <button class="btn btn-ghost btn-sm" @click="logout">Sign out</button>
        </div>
      </div>

      <div v-if="listError" class="form-error">Failed to load submissions</div>
      <div v-else-if="submissions.length === 0" class="admin-empty">
        No submissions yet
      </div>

      <div v-else class="admin-list">
        <div v-for="s in submissions" :key="s.id" class="admin-item" :class="`status-${s.status}`">
          <div class="admin-item-head">
            <span class="admin-id">#{{ s.id }}</span>
            <strong>{{ s.name }}</strong>
            <a :href="`mailto:${s.email}`" class="admin-email">{{ s.email }}</a>
            <span v-if="s.company" class="admin-company">{{ s.company }}</span>
            <span v-if="s.rooms" class="admin-rooms">{{ s.rooms }} rooms</span>
            <span class="admin-topic">{{ TOPIC_LABELS[s.topic] || s.topic }}</span>
            <span v-if="s.locale" class="admin-locale">{{ s.locale.toUpperCase() }}</span>
            <span class="admin-date">{{ s.created_at }} UTC</span>
            <span class="admin-status" :class="`badge-${s.status}`">{{ s.status }}</span>
          </div>
          <p class="admin-message">{{ s.message }}</p>
          <div class="admin-item-actions">
            <button
              v-if="s.status === 'new'"
              class="btn btn-ghost btn-sm"
              :disabled="busyIds.has(s.id)"
              @click="setStatus(s.id, 'read')"
            >Mark read</button>
            <button
              v-if="s.status !== 'archived'"
              class="btn btn-ghost btn-sm"
              :disabled="busyIds.has(s.id)"
              @click="setStatus(s.id, 'archived')"
            >Archive</button>
            <button
              v-if="s.status === 'archived'"
              class="btn btn-ghost btn-sm"
              :disabled="busyIds.has(s.id)"
              @click="setStatus(s.id, 'read')"
            >Unarchive</button>
            <button
              class="btn btn-ghost btn-sm admin-delete"
              :disabled="busyIds.has(s.id)"
              @click="remove(s.id)"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 60px 24px;
  min-height: 70vh;
}

.admin-login {
  max-width: 360px;
  margin: 60px auto 0;
  padding: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
}

.admin-login h2 {
  margin-bottom: 20px;
  font-weight: 800;
}

.admin-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.admin-head h2 {
  font-size: 1.3rem;
  font-weight: 800;
}

.admin-actions {
  display: flex;
  gap: 10px;
}

.admin-empty {
  padding: 48px;
  text-align: center;
  color: var(--text-3);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
}

.admin-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.admin-item {
  padding: 20px 22px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
}

.admin-item.status-new {
  border-color: var(--accent-glow);
}

.admin-item.status-archived {
  opacity: 0.65;
}

.admin-item-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.admin-id {
  color: var(--text-3);
}

.admin-email {
  color: var(--accent);
}

.admin-company,
.admin-rooms,
.admin-locale,
.admin-date,
.admin-topic {
  color: var(--text-3);
  font-size: 0.82rem;
}

.admin-status {
  margin-left: auto;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.badge-new {
  background: var(--accent-soft);
  color: var(--accent);
}

.badge-read {
  background: var(--surface-2);
  color: var(--text-2);
}

.badge-archived {
  background: var(--surface-2);
  color: var(--text-3);
}

.admin-message {
  margin-top: 10px;
  color: var(--text-2);
  font-size: 0.94rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.admin-item-actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

.admin-delete:hover {
  border-color: #ef4444;
  color: #ef4444;
}
</style>