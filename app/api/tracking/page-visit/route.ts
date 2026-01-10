import { createClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

interface GeoData {
  city?: string
  country?: string
  ip?: string
}

async function getGeoLocation(ip: string): Promise<GeoData> {
  try {
    // Skip localhost IPs
    if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return { city: 'Local', country: 'Local', ip }
    }
    
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=city,country,query`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) {
      return { ip }
    }
    
    const data = await response.json()
    return {
      city: data.city || 'Unknown',
      country: data.country || 'Unknown',
      ip: data.query || ip
    }
  } catch {
    return { ip }
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { url, pathname, referrer, timeSpentSeconds, sessionId } = body

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get IP from headers
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 'unknown'
    
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Get geolocation
    const geo = await getGeoLocation(ip)

    // Insert or update page visit
    // If sessionId and pathname match, update time_spent_seconds
    // Otherwise, insert new record
    const { data: existingVisit } = await supabase
      .from('page_visits')
      .select('id, time_spent_seconds')
      .eq('user_id', user.id)
      .eq('session_id', sessionId)
      .eq('pathname', pathname)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (existingVisit) {
      // Update existing visit with accumulated time
      const { error: updateError } = await supabase
        .from('page_visits')
        .update({
          time_spent_seconds: (existingVisit.time_spent_seconds || 0) + (timeSpentSeconds || 0),
          updated_at: new Date().toISOString()
        })
        .eq('id', existingVisit.id)

      if (updateError) {
        console.error('Failed to update page visit:', updateError)
        return NextResponse.json({ error: updateError.message }, { status: 500 })
      }
    } else {
      // Insert new page visit
      const { error: insertError } = await supabase
        .from('page_visits')
        .insert({
          user_id: user.id,
          email: user.email,
          url: url || pathname,
          pathname: pathname,
          referrer: referrer || null,
          ip_address: geo.ip || ip,
          city: geo.city || null,
          country: geo.country || null,
          user_agent: userAgent,
          time_spent_seconds: timeSpentSeconds || 0,
          session_id: sessionId
        })

      if (insertError) {
        console.error('Failed to log page visit:', insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Page visit tracking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

