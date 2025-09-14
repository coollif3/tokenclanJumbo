'use client'
import { useAuth } from '@app/_contexts/AuthContext'
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Grid,
  Divider,
  Button
} from '@mui/material'
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts'
import { useRouter } from 'next/navigation'
import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks'

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth()
  const { theme } = useJumboTheme()
  const router = useRouter()

  if (loading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: CONTAINER_MAX_WIDTH,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh'
        }}
      >
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  if (!user) {
    router.push('/auth/login')
    return null
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
        py: 4
      }}
      disableGutters
    >
      <Typography variant="h3" gutterBottom>
        My Profile
      </Typography>
      
      <Card sx={{ maxWidth: 800, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{ 
                bgcolor: theme.palette.primary.main,
                width: 80,
                height: 80,
                fontSize: '2rem',
                mr: 3
              }}
            >
              {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                {user.user_metadata?.full_name || 'Member'}
              </Typography>
              <Chip 
                label={`${(user.user_metadata?.membership_tier || 'free').toUpperCase()} MEMBER`}
                color={user.user_metadata?.membership_tier === 'paid' ? 'primary' : 'default'}
                sx={{ mb: 1 }}
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Full Name
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {user.user_metadata?.full_name || 'Not provided'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Email Address
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {user.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Membership Tier
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {(user.user_metadata?.membership_tier || 'free').charAt(0).toUpperCase() + 
                 (user.user_metadata?.membership_tier || 'free').slice(1)} Member
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Account Created
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {new Date(user.created_at).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => router.push('/profile/edit')}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}