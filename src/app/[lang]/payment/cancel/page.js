'use client'
import { useRouter } from 'next/navigation'
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { Logo } from '@app/_components/_core'
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts'

export default function PaymentCancelPage() {
  const router = useRouter()

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
          <CancelIcon 
            sx={{ 
              fontSize: 80, 
              color: 'warning.main', 
              mb: 2 
            }} 
          />
          <Typography variant="h4" gutterBottom color="warning.main">
            Payment Cancelled
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your payment was cancelled. You can try again anytime to upgrade your membership.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => router.push('/en-US')}
            >
              Go to Home
            </Button>
            <Button
              variant="contained"
              onClick={() => router.back()}
            >
              Try Again
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}