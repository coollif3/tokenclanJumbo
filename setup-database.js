const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gghzzvudpbbtwwtwlxph.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnaHp6dnVkcGJidHd3dHdseHBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjQyNjksImV4cCI6MjA3OTUwMDI2OX0.9jP3uJklDuVChYKrgnyd5GhIfqzV0hdoegL0sC32XF4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupDatabase() {
  console.log('🔄 Setting up TokenClan database...')
  console.log('📍 Supabase URL:', supabaseUrl)

  try {
    // Test connection by checking existing tables
    const { data: tables, error: listError } = await supabase
      .from('user_profiles')
      .select('id')
      .limit(1)

    if (!listError || listError.code === 'PGRST116') {
      console.log('✅ Database connection successful!')

      if (!listError) {
        console.log('✅ user_profiles table already exists!')
        console.log('📊 Table is ready to use')
      } else {
        console.log('⚠️  user_profiles table does not exist yet')
        console.log('💡 You need to run the migration to create it')
        console.log('📝 Migration file: supabase/migrations/20250914164636_maroon_bush.sql')
      }
    } else {
      console.error('❌ Error checking tables:', listError)
    }

  } catch (error) {
    console.error('❌ Database setup error:', error.message)
  }
}

setupDatabase()
