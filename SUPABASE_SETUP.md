# TokenClan Supabase Database Setup

## Current Status

✅ **Supabase Connection Configured**
- URL: `https://gghzzvudpbbtwwtwlxph.supabase.co`
- Anon Key: Configured in `.env`
- Connection: Verified and working

⚠️ **Database Table: Not Created Yet**
- The `user_profiles` table needs to be created in your Supabase project

## How to Create the Table

You have **three options** to create the table:

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project: `gghzzvudpbbtwwtwlxph`
3. Click on **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Copy and paste the contents of `create_user_profiles.sql` (located in project root)
6. Click **"Run"** button
7. Verify success message

### Option 2: Using Local Migration File

1. Make sure you have the Supabase CLI installed:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   cd /tmp/cc-agent/60610994/project
   supabase link --project-ref gghzzvudpbbtwwtwlxph
   ```

3. Push the migration:
   ```bash
   supabase db push
   ```

### Option 3: Manual SQL Execution

Use the `create_user_profiles.sql` file with any PostgreSQL client connected to your Supabase database.

## Table Schema

```sql
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  membership_tier text NOT NULL DEFAULT 'free',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT user_profiles_membership_tier_check
    CHECK (membership_tier = ANY (ARRAY['free', 'paid']))
);
```

## Security Features

- **Row Level Security (RLS)**: Enabled
- **Policies**:
  - Users can SELECT their own profile
  - Users can INSERT their own profile
  - Users can UPDATE their own profile
- **Index**: Created on `user_id` for performance

## Membership Tiers

- **free** (default): Free tier access
- **paid**: Paid tier access

## Verification

After creating the table, run this command to verify:

```bash
node setup-database.js
```

Expected output:
```
✅ Database connection successful!
✅ user_profiles table already exists!
📊 Table is ready to use
```

## Connection Details

Your application is already configured to connect to Supabase:
- File: `src/app/_lib/supabase.js`
- Auth Context: `src/app/_contexts/AuthContext.jsx`
- Environment: `.env` (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Next Steps

1. Create the table using one of the options above
2. Run `node setup-database.js` to verify
3. Test user registration and authentication
4. Later: Build your custom payment system to update `membership_tier`
