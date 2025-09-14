'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@app/_contexts/AuthContext'
import { supabase } from '@app/_lib/supabase'
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Grid,
  Snackbar
} from '@mui/material'
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts'
import { useRouter } from 'next/navigation'
import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks'

export default function EditProfilePage() {
  const { user, userProfile, loading, signOut } = useAuth()
  const { theme } = useJumboTheme()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    fullName: '',
    membershipTier: 'free'
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.user_metadata?.full_name || '',
        membershipTier: user.user_metadata?.membership_tier || 'free'
      })
    }
  }, [user])

  // Fetch latest user profile data
  const fetchUserProfile = async () => {
    if (!user || !supabase) return
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (data) {
        setFormData({
          fullName: data.full_name || '',
          membershipTier: data.membership_tier || 'free'
        })
      }
    } catch (err) {
      console.error('Error fetching user profile:', err)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [user])

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      if (!supabase) {
        setError('Supabase is not configured. Please set up your environment variables.')
        setSaving(false)
        return
      }

      // Update user metadata in Supabase Auth
      const { data, error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          membership_tier: formData.membershipTier
        }
      })

      if (authError) {
        setError(authError.message)
      } else {
        // Update or create user profile in database table
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .upsert({ 
            user_id: user.id,
            full_name: formData.fullName,
            membership_tier: formData.membershipTier,
            email: user.email,
            updated_at: new Date().toISOString() 
          })
          .eq('user_id', user.id)
          .select()
          .single()

        if (profileError) {
          console.error('Profile update error:', profileError)
          setError('Profile updated in auth but failed to save to database: ' + profileError.message)
        } else {
          setSuccess(true)
          setSnackbarOpen(true)
          
          // Fetch the latest data to update the form
          await fetchUserProfile()
        }
      }
    } catch (err) {
      console.error('Update error:', err)
      setError('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
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
          Edit Profile
        </Typography>
        
        <Card sx={{ maxWidth: 600, width: '100%' }}>
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
                {formData.fullName?.charAt(0) || user.email?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5">
                  Update Your Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your account details and preferences
                </Typography>
              </Box>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={user.email}
                    disabled
                    helperText="Email cannot be changed"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Membership Tier</InputLabel>
                    <Select
                      name="membershipTier"
                      value={formData.membershipTier}
                      onChange={handleChange}
                      label="Membership Tier"
                    >
                      <MenuItem value="free">Free Member</MenuItem>
                      <MenuItem value="paid">Paid Member</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/profile')}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </>
  )
}