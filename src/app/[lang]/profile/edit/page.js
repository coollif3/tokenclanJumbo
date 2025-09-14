@@ .. @@
   const [formData, setFormData] = useState({
     fullName: '',
-    membershipTier: 'free'
   })
   const [saving, setSaving] = useState(false)
@@ .. @@
     if (user) {
       setFormData({
         fullName: user.user_metadata?.full_name || '',
-        membershipTier: user.user_metadata?.membership_tier || 'free'
       })
     }
@@ .. @@
       // Update user metadata in Supabase Auth
       const { data, error: authError } = await supabase.auth.updateUser({
         data: {
           full_name: formData.fullName,
-          membership_tier: formData.membershipTier
         }
       })
@@ .. @@
         // Also update the user_profiles table if it exists
         if (userProfile) {
           await updateUserProfile(user.id, {
             full_name: formData.fullName,
-            membership_tier: formData.membershipTier
           })
         }
@@ .. @@
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
-                <FormControl fullWidth>
-                  <InputLabel>Membership Tier</InputLabel>
-                  <Select
-                    name="membershipTier"
-                    value={formData.membershipTier}
-                    onChange={handleChange}
-                    label="Membership Tier"
-                  >
-                    <MenuItem value="free">Free Member</MenuItem>
-                    <MenuItem value="paid">Paid Member</MenuItem>
-                  </Select>
-                </FormControl>
+                <TextField
+                  fullWidth
+                  label="Membership Tier"
+                  value={`${(user.user_metadata?.membership_tier || 'free').charAt(0).toUpperCase() + 
+                           (user.user_metadata?.membership_tier || 'free').slice(1)} Member`}
+                  disabled
+                  helperText="Membership tier cannot be changed directly. Use the Upgrade button to upgrade to paid membership."
+                />
               </Grid>
             </Grid>