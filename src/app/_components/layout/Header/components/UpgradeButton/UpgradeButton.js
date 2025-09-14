'use client'
import { useState } from 'react'
import { useAuth } from '@app/_contexts/AuthContext'
import { Button, CircularProgress } from '@mui/material'
import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks'

export function UpgradeButton() {
  const { user } = useAuth()
  const { theme } = useJumboTheme()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Failed to create checkout session')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      setLoading(false)
    }
  }

  // Only show for logged in users with free membership
  if (!user || user.user_metadata?.membership_tier === 'paid') {
    return null
  }

  return (
    <Button
      variant="contained"
      onClick={handleUpgrade}
      disabled={loading}
      sx={{
        bgcolor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        '&:hover': {
          bgcolor: theme.palette.warning.dark,
        },
        mr: 2,
      }}
    >
      {loading ? <CircularProgress size={20} /> : 'Upgrade'}
    </Button>
  )
}