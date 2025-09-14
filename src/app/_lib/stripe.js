"use client";
import { supabase } from './supabase';
import { STRIPE_PRODUCTS } from '../../stripe-config';

export const createCheckoutSession = async (priceId, mode = 'subscription') => {
  try {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User not authenticated');
    }

    const origin = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:3000';

    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: `${origin}/en-US/payment/success`,
        cancel_url: `${origin}/en-US/payment/canceled`,
        mode: mode
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    
    if (url) {
      window.location.href = url;
    } else {
      throw new Error('No checkout URL received');
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const upgradeToPaidMembership = () => {
  return createCheckoutSession(
    STRIPE_PRODUCTS.PAID_MEMBERSHIP.priceId,
    STRIPE_PRODUCTS.PAID_MEMBERSHIP.mode
  );
};