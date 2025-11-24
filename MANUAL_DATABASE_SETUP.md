# Manual Database Setup for User Profile Auto-Creation

## Overview
This document provides manual steps to complete the user profile auto-creation setup.

## Current Status

### ✅ Completed
1. **Application Code Updated**:
   - Added `createUserProfile()` function in `src/app/_lib/supabase.js`
   - Added `checkEmailExists()` function in `src/app/_lib/supabase.js`
   - Updated `AuthContext.jsx` to create user profiles after signup
   - Updated signup form to check for duplicate emails

2. **How It Works Now**:
   - When a user signs up, the app creates an auth user
   - Then immediately creates a user_profiles record
   - Before signup, checks if email already exists
   - Shows clear error message for duplicate emails

### ⚠️ Required: Manual Database Migration

You need to apply the following SQL to your Supabase database to add:
- Unique constraints on email and user_id
- Database trigger to auto-create profiles (backup mechanism)

## Steps to Complete Setup

### Step 1: Access Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/yezddferfhpcpzsqwgub
2. Click on "SQL Editor" in the left sidebar
3. Click "+ New query"

### Step 2: Run the Following SQL

```sql
-- Add unique constraint on email
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_profiles_email_key'
  ) THEN
    ALTER TABLE user_profiles
    ADD CONSTRAINT user_profiles_email_key UNIQUE (email);
  END IF;
END $$;

-- Add unique constraint on user_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_profiles_user_id_key'
  ) THEN
    ALTER TABLE user_profiles
    ADD CONSTRAINT user_profiles_user_id_key UNIQUE (user_id);
  END IF;
END $$;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, full_name, membership_tier)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'membership_tier', 'free')
  );
  RETURN NEW;
END;
$$;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### Step 3: Click "Run" to execute the SQL

You should see a success message indicating the migration was applied.

### Step 4: Verify the Setup

After running the SQL, the database will:
- Prevent duplicate emails in user_profiles table
- Prevent duplicate user_ids in user_profiles table
- Automatically create a user_profile when a new auth user is created

## Testing the Complete Flow

### Test 1: New User Signup
1. Go to: http://localhost:3000/en-US/auth/signup
2. Fill in:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
3. Click "Create Account"
4. Expected: Account created successfully with profile

### Test 2: Duplicate Email Prevention
1. Try to sign up again with test@example.com
2. Expected: Error message "An account with this email address already exists"

### Test 3: Verify Profile in Database
1. Go to Supabase Dashboard → Table Editor
2. Open the `user_profiles` table
3. You should see the test user's profile with:
   - user_id (matches auth.users.id)
   - email
   - full_name
   - membership_tier (default: 'free')
   - created_at
   - updated_at

## How the System Works

### Dual-Layer Protection

1. **Application Layer** (Primary):
   - Checks if email exists before signup
   - Creates user profile immediately after auth signup
   - Handles errors gracefully

2. **Database Layer** (Backup):
   - Trigger automatically creates profile if app fails
   - Unique constraints prevent duplicates
   - Works even if app code is bypassed

### Email Uniqueness

Both Supabase Auth and user_profiles table enforce email uniqueness:
- Supabase Auth: Built-in email uniqueness
- user_profiles: Unique constraint on email column

### Error Handling

- Duplicate email: Clear message to user
- Profile creation failure: Logged to console, doesn't block auth
- Error code 23505: Postgres unique violation (handled gracefully)

## Troubleshooting

### Problem: Profile not created after signup

**Solution**: Run the SQL migration above to add the database trigger

### Problem: "Email already exists" but can't sign in

**Solution**:
1. Check Supabase dashboard → Authentication → Users
2. If user exists in auth but not in user_profiles, manually create profile:

```sql
INSERT INTO user_profiles (user_id, email, full_name, membership_tier)
VALUES (
  'USER_ID_FROM_AUTH_USERS',
  'their@email.com',
  'Their Name',
  'free'
);
```

### Problem: Build fails with MySQL errors

**Note**: This is expected. The app has legacy MySQL code for blockchains/exchanges/coins that requires MySQL databases. The Supabase auth system is independent and works fine. To fix the build, you would need to either:
1. Set up the MySQL databases referenced in .env
2. Migrate that data to Supabase
3. Make those pages optional during build

## Files Modified

1. `src/app/_lib/supabase.js`:
   - Added `createUserProfile()` function
   - Added `checkEmailExists()` function

2. `src/app/_contexts/AuthContext.jsx`:
   - Updated `signUp()` to create profile after auth signup

3. `src/app/[lang]/auth/signup/page.jsx`:
   - Added email existence check before signup
   - Improved error messages for duplicate emails

## Summary

Your user authentication system is now configured to:
- ✅ Check for duplicate emails before signup
- ✅ Create user profiles automatically via app code
- ⚠️ Create user profiles automatically via database trigger (requires manual SQL above)
- ✅ Enforce email uniqueness at database level (requires manual SQL above)
- ✅ Provide clear user feedback for all scenarios

Once you run the SQL migration in Step 2, the complete system will be active!
