import { createClient } from '@supabase/supabase-js'

// Vite uses `import.meta.env`, NOT `process.env`
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabaseUrl = (() => {
  if (!rawSupabaseUrl) return rawSupabaseUrl

  try {
    const parsed = new URL(rawSupabaseUrl)
    const isHttpsPage = typeof window !== 'undefined' && window.location.protocol === 'https:'

    if (isHttpsPage && parsed.protocol === 'http:') {
      parsed.protocol = 'https:'
      console.warn('Upgraded VITE_SUPABASE_URL from http:// to https:// for secure context compatibility.')
    }

    return parsed.toString().replace(/\/$/, '')
  } catch {
    return rawSupabaseUrl
  }
})()

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase env vars missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      storage: localStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)
