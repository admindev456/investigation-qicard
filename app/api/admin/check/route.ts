import { createClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 })
    }

    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    // If no role found, user is not admin
    if (roleError || !roleData) {
      console.log('No role found for user:', user.email, 'Error:', roleError?.message)
      return NextResponse.json({ 
        isAdmin: false, 
        userId: user.id,
        email: user.email,
        error: roleError?.message || 'No role assigned'
      })
    }

    const isAdmin = roleData.role === 'admin'

    return NextResponse.json({ 
      isAdmin,
      role: roleData.role,
      userId: user.id,
      email: user.email
    })
  } catch (error) {
    console.error('Admin check error:', error)
    return NextResponse.json({ isAdmin: false, error: 'Internal server error' }, { status: 500 })
  }
}

