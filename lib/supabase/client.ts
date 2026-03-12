import { createBrowserClient } from '@supabase/ssr'

function getSupabaseEnv() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    console.error(
      'Supabase client env missing. Check SUPABASE_URL / SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_*',
    )
  }

  return { url: url!, anonKey: anonKey! }
}

export function createClient() {
  const { url, anonKey } = getSupabaseEnv()

  return createBrowserClient(url, anonKey)
}

