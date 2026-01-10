import { createClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - List all auth logs (admin only)
export async function GET(request: Request) {
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

    // Parse query params for pagination
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    // Get logs with pagination (RLS policy allows admins to read)
    const { data: logs, error: logsError, count } = await supabase
      .from('auth_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (logsError) {
      return NextResponse.json({ error: logsError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      logs: logs || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('List logs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
