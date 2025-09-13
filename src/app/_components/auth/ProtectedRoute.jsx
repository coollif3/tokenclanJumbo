'use client'
import { useAuth } from '@app/_contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '@app/_components/_core'

const protectedPaths = [
  '/blockchains',
  '/exchanges', 
  '/coins',
  '/vault'
]

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      // Check if current path requires authentication
      const isProtectedPath = protectedPaths.some(path => 
        pathname.includes(path)
      )
      
      if (isProtectedPath) {
        router.push('/auth/login')
      }
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return <Spinner />
  }

  if (!user) {
    // Check if current path requires authentication
    const isProtectedPath = protectedPaths.some(path => 
      pathname.includes(path)
    )
    
    if (isProtectedPath) {
      return <Spinner />
    }
  }

  return children
}