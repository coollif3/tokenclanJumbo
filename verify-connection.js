#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('\n🔍 TokenClan Database Connection Verification\n')
console.log('=' .repeat(50))

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env file')
  console.log('   Make sure these are set:')
  console.log('   - NEXT_PUBLIC_SUPABASE_URL')
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

console.log('📍 Supabase URL:', supabaseUrl)
console.log('🔑 Anon Key:', supabaseAnonKey.substring(0, 20) + '...')
console.log('=' .repeat(50))

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verifyConnection() {
  try {
    console.log('\n🔄 Testing connection...')

    // Try to query the user_profiles table
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, user_id, full_name, email, membership_tier')
      .limit(1)

    if (error) {
      if (error.code === 'PGRST205') {
        console.log('\n⚠️  Table Status: NOT CREATED')
        console.log('=' .repeat(50))
        console.log('\n📝 Next Steps:')
        console.log('   1. Go to: https://app.supabase.com')
        console.log('   2. Select your project')
        console.log('   3. Open SQL Editor')
        console.log('   4. Run the SQL from: create_user_profiles.sql')
        console.log('\n   Or read: SUPABASE_SETUP.md for detailed instructions')
        console.log('=' .repeat(50))
      } else {
        console.log('\n❌ Connection Error:', error.message)
        console.log('   Code:', error.code)
        if (error.details) {
          console.log('   Details:', error.details)
        }
      }
    } else {
      console.log('\n✅ Connection: SUCCESS')
      console.log('✅ Table: user_profiles EXISTS')
      console.log('=' .repeat(50))

      if (data && data.length > 0) {
        console.log(`\n📊 Found ${data.length} profile(s) in database`)
      } else {
        console.log('\n📊 Table is empty (no profiles yet)')
      }

      console.log('\n🎉 Database is ready to use!')
      console.log('=' .repeat(50))
    }

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message)
  }
}

verifyConnection()
