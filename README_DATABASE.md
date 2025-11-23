# TokenClan Database - Quick Start Guide

## ✅ What's Already Done

1. **Supabase Connection**: Configured and verified
   - Your Supabase project is live at: `https://gghzzvudpbbtwwtwlxph.supabase.co`
   - Connection credentials are in `.env`

2. **Code Ready**: All authentication and profile management code is in place
   - `src/app/_lib/supabase.js` - Database functions
   - `src/app/_contexts/AuthContext.jsx` - Auth state management
   - Membership tier tracking (free/paid) built-in

3. **Migration File Created**: Ready to create the database table
   - Location: `create_user_profiles.sql`
   - Includes: Table schema, RLS policies, indexes

## ⚠️ What You Need to Do

**Create the `user_profiles` table in your Supabase database:**

### Quick Method (2 minutes):

1. Open: https://app.supabase.com
2. Select your project (starts with `gghzzvudpbbtwwtwlxph`)
3. Click **"SQL Editor"** in sidebar
4. Click **"New Query"**
5. Copy ALL content from `create_user_profiles.sql`
6. Paste and click **"Run"**
7. Done! ✅

## 🧪 Verify Everything Works

Run this command to test:
```bash
node verify-connection.js
```

You should see:
```
✅ Connection: SUCCESS
✅ Table: user_profiles EXISTS
🎉 Database is ready to use!
```

## 📊 Table Schema

```
user_profiles
├── id (uuid, primary key)
├── user_id (uuid, foreign key to auth.users)
├── full_name (text)
├── email (text)
├── membership_tier (text: 'free' or 'paid')
├── created_at (timestamp)
└── updated_at (timestamp)
```

## 🔐 Security

- **Row Level Security**: Enabled
- Users can only see/edit their own profile
- Membership tier defaults to 'free'

## 🚀 After Setup

Once the table is created, your app will be able to:
- Register new users
- Authenticate users
- Track membership tiers
- Manage user profiles

You'll be ready to build your custom payment system!

---

Need help? Check `SUPABASE_SETUP.md` for detailed instructions.
