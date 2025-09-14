const value = {
  user,
  userProfile,
  loading,
  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          membership_tier: 'free',
        }
      }
    })
    return { data, error }
  },
}