import { createClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - List all page visits (admin only)
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

    // Parse query params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = (page - 1) * limit
    const userId = searchParams.get('userId')
    const pathname = searchParams.get('pathname')

    // Build query
    let query = supabase
      .from('page_visits')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    // Apply filters
    if (userId) {
      query = query.eq('user_id', userId)
    }
    if (pathname) {
      query = query.ilike('pathname', `%${pathname}%`)
    }

    // Apply pagination
    const { data: visits, error: visitsError, count } = await query
      .range(offset, offset + limit - 1)

    if (visitsError) {
      return NextResponse.json({ error: visitsError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      visits: visits || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('List page visits error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

