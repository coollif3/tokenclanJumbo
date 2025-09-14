'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@app/_contexts/AuthContext'
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
import { Logo } from '@app/_components/_core'
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      setError('No payment session found')
      setVerifying(false)
      return
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/stripe/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })

        const data = await response.json()

        if (data.success) {
          setVerified(true)
          // Refresh the user session to get updated metadata
          window.location.reload()
        } else {
          setError(data.error || 'Payment verification failed')
        }
      } catch (err) {
        setError('Failed to verify payment')
      } finally {
        setVerifying(false)
      }
    }

    verifyPayment()
  }, [searchParams])

  if (verifying) {
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
        <Card sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Verifying Payment...
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please wait while we confirm your payment.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    )
  }

  if (error) {
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
        <Box sx={{ mb: 4 }}>
          <Logo />
        </Box>
        
        <Card sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
            <Button
              variant="contained"
              onClick={() => router.push('/en-US')}
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>
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
      <Box sx={{ mb: 4 }}>
        <Logo />
      </Box>
      
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
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
            Welcome to Paid Membership
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your membership has been upgraded successfully. You now have access to all premium features and exclusive content.
          </Typography>
          
          <Box sx={{ 
            bgcolor: 'success.light', 
            p: 2, 
            borderRadius: 1, 
            mb: 3,
            color: 'success.contrastText'
          }}>
            <Typography variant="body2" fontWeight="bold">
              Membership Status: PAID MEMBER
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/en-US')}
            sx={{ minWidth: 200 }}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}