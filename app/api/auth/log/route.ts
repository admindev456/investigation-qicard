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
    const { event_type, email, user_id } = body

    // Get IP from headers
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 'unknown'
    
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Get geolocation
    const geo = await getGeoLocation(ip)

    // Insert log
    const { error } = await supabase
      .from('auth_logs')
      .insert({
        user_id: user_id || null,
        email: email || null,
        event_type,
        ip_address: geo.ip || ip,
        city: geo.city || null,
        country: geo.country || null,
        user_agent: userAgent
      })

    if (error) {
      console.error('Failed to log auth event:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Auth log error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

