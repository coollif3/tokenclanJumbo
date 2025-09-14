'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@app/_contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@app/_lib/supabase'
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts'

export default function PaymentSuccessPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    const updateMembershipTier = async () => {
      if (!user || !supabase) {
        setError('User not authenticated or Supabase not configured')
        setLoading(false)
        return
      }

      try {
        // Update user metadata in Supabase Auth
        const { error: authError } = await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            membership_tier: 'paid'
          }
        })

        if (authError) {
          throw authError
        }

        // Update user profile in database
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({ 
            user_id: user.id,
            full_name: user.user_metadata?.full_name || '',
            membership_tier: 'paid',
            email: user.email,
            updated_at: new Date().toISOString() 
          })
          .eq('user_id', user.id)

        if (profileError) {
          console.error('Profile update error:', profileError)
          // Don't throw here as auth update succeeded
        }

        setUpdated(true)
      } catch (err) {
        console.error('Error updating membership:', err)
        setError('Failed to update membership status')
      } finally {
        setLoading(false)
      }
    }

    updateMembershipTier()
  }, [user])

  const handleContinue = () => {
    router.push('/en-US/profile')
  }

  if (loading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: CONTAINER_MAX_WIDTH,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography>Processing your payment...</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: 'flex',
        minWidth: 0,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        py: 4
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          {error ? (
            <>
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
              <Button
                variant="contained"
                onClick={() => router.push('/en-US')}
              >
                Return to Home
              </Button>
            </>
          ) : (
            <>
              <CheckCircleIcon 
                sx={{ 
                  fontSize: 80, 
                  color: 'success.main',
                  mb: 2 
                }} 
              />
              <Typography variant="h4" gutterBottom color="success.main">
                Payment Successful!
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Welcome to TokenClan Paid Membership
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Your membership has been upgraded successfully. You now have access to enhanced vault features and premium content.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleContinue}
                sx={{ minWidth: 200 }}
              >
                View My Profile
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}