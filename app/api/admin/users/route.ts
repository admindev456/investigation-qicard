import { createClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { CreateUserRequest } from '@/app/lib/types/admin'

// GET - List all users (admin only)
export async function GET() {
  try {
    const supabase = await createClient()
    
    // Verify caller is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (roleData?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get all users via RPC function (SECURITY DEFINER)
    const { data: users, error: usersError } = await supabase
      .rpc('get_users_for_admin')
    
    if (usersError) {
      console.error('Get users error:', usersError)
      return NextResponse.json({ error: usersError.message }, { status: 500 })
    }

    // Get roles for all users
    const { data: roles } = await supabase
      .from('user_roles')
      .select('user_id, role')

    const rolesMap = new Map(roles?.map(r => [r.user_id, r.role]) || [])

    const usersWithRoles = (users || []).map((u: any) => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
      role: rolesMap.get(u.id) || 'user'
    }))

    return NextResponse.json({ users: usersWithRoles })
  } catch (error) {
    console.error('List users error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new user (admin only)
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Verify caller is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (roleData?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body: CreateUserRequest = await request.json()
    const { email, password, role = 'user' } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Create user using signUp (works with anon key)
    // Note: Email confirmation should be disabled in Supabase Auth settings
    // or the new user will need to confirm their email
    const { data: signUpData, error: createError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Skip email confirmation for admin-created users
        emailRedirectTo: undefined
      }
    })

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 })
    }

    if (!signUpData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 400 })
    }

    // Assign role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: signUpData.user.id,
        role: role
      })

    if (roleError) {
      console.error('Role assignment error:', roleError)
      // User was created but role assignment failed - still report success
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: signUpData.user.id,
        email: signUpData.user.email,
        role
      },
      note: signUpData.user.email_confirmed_at ? undefined : 'User may need to confirm email if email confirmations are enabled in Supabase'
    })
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete user (admin only)
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    
    // Verify caller is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (roleData?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Prevent deleting yourself
    if (userId === user.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
    }

    // Delete user via RPC function (SECURITY DEFINER)
    const { data, error: deleteError } = await supabase
      .rpc('delete_user_for_admin', { target_user_id: userId })

    if (deleteError) {
      console.error('Delete user error:', deleteError)
      return NextResponse.json({ error: deleteError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
