'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

let sessionId: string | null = null
let pageStartTime: number = Date.now()
let visibilityStartTime: number = Date.now()
let isPageVisible: boolean = true
let accumulatedTime: number = 0

// Generate session ID once per browser session
function getSessionId(): string {
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  return sessionId
}

// Track page visibility changes
function handleVisibilityChange() {
  const now = Date.now()
  
  if (document.hidden) {
    // Page became hidden - accumulate time spent visible
    if (isPageVisible) {
      accumulatedTime += (now - visibilityStartTime) / 1000
      isPageVisible = false
    }
  } else {
    // Page became visible - start tracking again
    visibilityStartTime = now
    isPageVisible = true
  }
}

// Send page visit data to API
async function logPageVisit(
  url: string,
  pathname: string,
  referrer: string | null,
  timeSpentSeconds: number
) {
  try {
    await fetch('/api/tracking/page-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        pathname,
        referrer,
        timeSpentSeconds: Math.round(timeSpentSeconds),
        sessionId: getSessionId()
      })
    })
  } catch (error) {
    console.error('Failed to log page visit:', error)
  }
}

export default function PageTracker() {
  const pathname = usePathname()
  const previousPathnameRef = useRef<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initialize session ID
    getSessionId()

    // Set up visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // If pathname changed, log the previous page visit
    if (previousPathnameRef.current && previousPathnameRef.current !== pathname) {
      const now = Date.now()
      let timeSpent = accumulatedTime

      // Add current visible time if page is still visible
      if (isPageVisible) {
        timeSpent += (now - visibilityStartTime) / 1000
      }

      // Log previous page visit
      logPageVisit(
        window.location.href,
        previousPathnameRef.current,
        document.referrer || null,
        timeSpent
      )

      // Reset for new page
      accumulatedTime = 0
      pageStartTime = now
      visibilityStartTime = now
    }

    // Update previous pathname
    previousPathnameRef.current = pathname

    // Set up interval to periodically send time updates (every 30 seconds)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (isPageVisible) {
        const now = Date.now()
        const currentTime = accumulatedTime + (now - visibilityStartTime) / 1000
        
        // Send periodic update (only if significant time has passed)
        if (currentTime >= 30) {
          logPageVisit(
            window.location.href,
            pathname,
            document.referrer || null,
            currentTime
          )
          accumulatedTime = currentTime
          visibilityStartTime = now
        }
      }
    }, 30000) // Every 30 seconds

    // Cleanup on unmount or pathname change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      // Log final time when component unmounts or pathname changes
      if (previousPathnameRef.current === pathname) {
        const now = Date.now()
        let timeSpent = accumulatedTime

        if (isPageVisible) {
          timeSpent += (now - visibilityStartTime) / 1000
        }

        logPageVisit(
          window.location.href,
          pathname,
          document.referrer || null,
          timeSpent
        )
      }
    }
  }, [pathname])

  // This component doesn't render anything
  return null
}

