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
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts'

export default function PaymentCanceledPage() {
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
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <CancelIcon 
            sx={{ 
              fontSize: 80, 
              color: 'warning.main',
              mb: 2 
            }} 
          />
          <Typography variant="h4" gutterBottom color="warning.main">
            Payment Canceled
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your payment was canceled. No charges were made to your account. You can try again anytime.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => router.push('/en-US')}
            >
              Return to Home
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}