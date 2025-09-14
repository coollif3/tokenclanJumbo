'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getUserProfile } from '@app/_lib/supabase'

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
        const { data: profile } = await getUserProfile(session.user.id)
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
          const { data: profile } = await getUserProfile(session.user.id)
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
      // Get the correct base URL for the current environment
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseUrl}/en-US/auth/reset-password`,
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