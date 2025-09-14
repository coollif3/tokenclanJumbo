"use client";
import { useAuth } from '@app/_contexts/AuthContext';
import { upgradeToPaidMembership } from '@app/_lib/stripe';
import { Button } from '@mui/material';
import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

export function UpgradeButton() {
  const { user } = useAuth();
  const { theme } = useJumboTheme();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Only show for authenticated users with free membership
  if (!user || user.user_metadata?.membership_tier === 'paid') {
    return null;
  }

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await upgradeToPaidMembership();
    } catch (error) {
      console.error('Upgrade error:', error);
      enqueueSnackbar('Failed to start upgrade process. Please try again.', { 
        variant: 'error' 
      });
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleUpgrade}
      disabled={loading}
      sx={{
        ml: 1,
        bgcolor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        '&:hover': {
          bgcolor: theme.palette.warning.dark,
        },
      }}
    >
      {loading ? 'Processing...' : 'Upgrade'}
    </Button>
  );
}