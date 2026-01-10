'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PageVisit {
  id: string
  user_id: string
  email: string
  url: string
  pathname: string
  referrer: string | null
  ip_address: string | null
  city: string | null
  country: string | null
  user_agent: string | null
  time_spent_seconds: number
  session_id: string
  created_at: string
  updated_at: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface Stats {
  totalVisits: number
  totalTimeSpent: number
  uniqueUsers: number
  mostVisitedPages: Array<{ pathname: string; visits: number; totalTime: number }>
}

export default function TrackingPage() {
  const [visits, setVisits] = useState<PageVisit[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [filterUserId, setFilterUserId] = useState<string>('')
  const [filterPathname, setFilterPathname] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchData(1)
  }, [])

  async function fetchData(page: number) {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '50' })
      if (filterUserId) params.append('userId', filterUserId)
      if (filterPathname) params.append('pathname', filterPathname)

      const res = await fetch(`/api/admin/page-visits?${params}`)
      const data = await res.json()
      
      if (res.status === 403 || res.status === 401) {
        router.push('/knowledgebase/overview')
        return
      }
      
      setVisits(data.visits || [])
      setPagination(data.pagination || { page: 1, limit: 50, total: 0, totalPages: 0 })
      calculateStats(data.visits || [])
    } catch (error) {
      console.error('Failed to fetch page visits:', error)
    } finally {
      setLoading(false)
    }
  }

  function calculateStats(visitsData: PageVisit[]) {
    const totalVisits = visitsData.length
    const totalTimeSpent = visitsData.reduce((sum, visit) => sum + (visit.time_spent_seconds || 0), 0)
    const uniqueUsers = new Set(visitsData.map(v => v.user_id)).size

    const pageMap = new Map<string, { visits: number; totalTime: number }>()
    visitsData.forEach(visit => {
      const existing = pageMap.get(visit.pathname) || { visits: 0, totalTime: 0 }
      pageMap.set(visit.pathname, {
        visits: existing.visits + 1,
        totalTime: existing.totalTime + (visit.time_spent_seconds || 0)
      })
    })

    const mostVisitedPages = Array.from(pageMap.entries())
      .map(([pathname, data]) => ({ pathname, ...data }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5)

    setStats({ totalVisits, totalTimeSpent, uniqueUsers, mostVisitedPages })
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  function formatTime(seconds: number) {
    if (seconds < 60) return `${Math.round(seconds)}s`
    const minutes = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    if (minutes < 60) return `${minutes}m ${secs}s`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  function parseUserAgent(ua: string | null) {
    if (!ua) return '—'
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Safari')) return 'Safari'
    if (ua.includes('Edge')) return 'Edge'
    return 'Other'
  }

  if (loading && visits.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-base font-semibold text-slate-900">Activity Tracking</h1>
            </div>
            <div className="text-xs text-slate-500">{pagination.total} visits</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-4 gap-3 mb-5">
            <div className="bg-slate-50 rounded-lg px-3 py-2.5">
              <div className="text-lg font-semibold text-slate-900">{stats.totalVisits}</div>
              <div className="text-[11px] text-slate-500">Visits</div>
            </div>
            <div className="bg-slate-50 rounded-lg px-3 py-2.5">
              <div className="text-lg font-semibold text-slate-900">{formatTime(stats.totalTimeSpent)}</div>
              <div className="text-[11px] text-slate-500">Total Time</div>
            </div>
            <div className="bg-slate-50 rounded-lg px-3 py-2.5">
              <div className="text-lg font-semibold text-slate-900">{stats.uniqueUsers}</div>
              <div className="text-[11px] text-slate-500">Users</div>
            </div>
            <div className="bg-slate-50 rounded-lg px-3 py-2.5">
              <div className="text-lg font-semibold text-slate-900">
                {stats.totalVisits > 0 ? formatTime(stats.totalTimeSpent / stats.totalVisits) : '0s'}
              </div>
              <div className="text-[11px] text-slate-500">Avg/Visit</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-2 mb-5">
          <input
            type="text"
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            placeholder="Filter by email..."
            className="flex-1 max-w-[200px] px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-300"
          />
          <input
            type="text"
            value={filterPathname}
            onChange={(e) => setFilterPathname(e.target.value)}
            placeholder="Filter by path..."
            className="flex-1 max-w-[200px] px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-300"
          />
          <button
            onClick={() => fetchData(1)}
            className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
          >
            Filter
          </button>
          {(filterUserId || filterPathname) && (
            <button
              onClick={() => { setFilterUserId(''); setFilterPathname(''); fetchData(1); }}
              className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Top Pages */}
        {stats && stats.mostVisitedPages.length > 0 && (
          <div className="mb-5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Top Pages</div>
            <div className="flex flex-wrap gap-2">
              {stats.mostVisitedPages.map((page, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 rounded-md text-xs">
                  <span className="text-slate-700 font-medium truncate max-w-[180px]">{page.pathname}</span>
                  <span className="text-slate-400">{page.visits}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Time</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">User</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Page</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Duration</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Location</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{formatDate(visit.created_at)}</td>
                    <td className="px-3 py-2 text-slate-700">{visit.email || '—'}</td>
                    <td className="px-3 py-2 text-slate-700 font-medium max-w-[200px] truncate">{visit.pathname}</td>
                    <td className="px-3 py-2 text-slate-700">{formatTime(visit.time_spent_seconds || 0)}</td>
                    <td className="px-3 py-2 text-slate-500">
                      {visit.city && visit.country ? `${visit.city}, ${visit.country}` : visit.country || '—'}
                    </td>
                    <td className="px-3 py-2 text-slate-400 font-mono text-xs">{visit.ip_address || '—'}</td>
                  </tr>
                ))}
                {visits.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-8 text-center text-slate-400">No visits found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="border-t border-slate-200 px-3 py-2 flex items-center justify-between bg-slate-50">
              <div className="text-xs text-slate-500">Page {pagination.page} of {pagination.totalPages}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => fetchData(pagination.page - 1)}
                  disabled={pagination.page <= 1 || loading}
                  className="px-2 py-1 text-xs border border-slate-200 rounded hover:bg-white disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => fetchData(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages || loading}
                  className="px-2 py-1 text-xs border border-slate-200 rounded hover:bg-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
