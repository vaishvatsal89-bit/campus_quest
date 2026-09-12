import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { levelFromXp } from '../lib/game'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null)
      return null
    }
    const { data, error: fetchErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (fetchErr) throw fetchErr
    setProfile(data)
    return data
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return
      setSession(s)
      if (s?.user) {
        refreshProfile(s.user.id).finally(() => mounted && setLoading(false))
      } else {
        setLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      if (s?.user) {
        refreshProfile(s.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [refreshProfile])

  const signInWithName = useCallback(async (displayName) => {
    setError(null)
    const name = displayName.trim()
    if (name.length < 2) {
      throw new Error('Enter at least 2 characters for your hero name')
    }

    const { data: authData, error: authErr } = await supabase.auth.signInAnonymously()
    if (authErr) throw authErr

    const userId = authData.user.id
    const { error: profileErr } = await supabase.from('profiles').insert({
      id: userId,
      name,
      xp: 0,
      level: 1,
    })

    if (profileErr) throw profileErr
    await refreshProfile(userId)
    return authData.user
  }, [refreshProfile])

  const updateProfileLocal = useCallback((patch) => {
    setProfile((p) => (p ? { ...p, ...patch } : p))
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      error,
      setError,
      signInWithName,
      refreshProfile,
      updateProfileLocal,
      level: levelFromXp(profile?.xp ?? 0),
    }),
    [session, profile, loading, error, signInWithName, refreshProfile, updateProfileLocal],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
