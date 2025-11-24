'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getUserProfile, createUserProfile } from '@app/_lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // If Supabase is not configured, provide mock auth state
  if (!supabase) {
    return (
      <AuthContext.Provider value={{
        user: null,
        userProfile: null,
        loading: false,
        signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signIn: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: { message: 'Supabase not configured' } }),
        resetPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } })
      }}>
        {children}
      </AuthContext.Provider>
    )
  }

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('user_profiles') 
          .select('*')
          .eq('user_id', session.user.id)
          .single()
          
        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
          console.error('Error fetching user profile:', error)
        }
        setUserProfile(profile)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single()
            
          if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
            console.error('Error fetching user profile:', error)
          }
          setUserProfile(profile)
        } else {
          setUserProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const value = {
    user,
    userProfile,
    loading,
    signUp: async (email, password, fullName, membershipTier = 'free') => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            membership_tier: membershipTier,
          }
        }
      })

      if (!error && data.user) {
        const { data: profile, error: profileError } = await createUserProfile(
          data.user.id,
          email,
          fullName,
          membershipTier
        )

        if (profileError && profileError.code !== '23505') {
          console.error('Error creating user profile:', profileError)
        }
      }

      return { data, error }
    },
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      return { error }
    },
    resetPassword: async (email) => {
      // Get the current origin, fallback to localhost for development
      const origin = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : 'http://localhost:3000'

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/en-US/auth/reset-password`,
      })
      return { data, error }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}