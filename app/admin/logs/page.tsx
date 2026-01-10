'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AuthLog {
  id: string
  user_id: string
  email: string
  event_type: 'sign_in' | 'sign_out' | 'failed_attempt'
  ip_address: string | null
  city: string | null
  country: string | null
  user_agent: string | null
  created_at: string
  session_duration_minutes: number | null
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function LogsPage() {
  const [logs, setLogs] = useState<AuthLog[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchLogs(1)
  }, [])

  async function fetchLogs(page: number) {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/logs?page=${page}&limit=50`)
      const data = await res.json()
      
      if (res.status === 403 || res.status === 401) {
        router.push('/knowledgebase/overview')
        return
      }
      
      setLogs(data.logs || [])
      setPagination(data.pagination || { page: 1, limit: 50, total: 0, totalPages: 0 })
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  function getEventStyle(eventType: string) {
    switch (eventType) {
      case 'sign_in': return 'bg-emerald-50 text-emerald-700'
      case 'sign_out': return 'bg-slate-100 text-slate-600'
      case 'failed_attempt': return 'bg-red-50 text-red-700'
      default: return 'bg-slate-100 text-slate-600'
    }
  }

  function getEventLabel(eventType: string) {
    switch (eventType) {
      case 'sign_in': return 'Login'
      case 'sign_out': return 'Logout'
      case 'failed_attempt': return 'Failed'
      default: return eventType
    }
  }

  function parseUserAgent(ua: string | null) {
    if (!ua) return '—'
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Safari')) return 'Safari'
    if (ua.includes('Edge')) return 'Edge'
    return 'Other'
  }

  if (loading && logs.length === 0) {
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
              <h1 className="text-base font-semibold text-slate-900">Authentication Logs</h1>
            </div>
            <div className="text-xs text-slate-500">{pagination.total} events</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        {/* Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Time</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Event</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">User</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Location</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">IP</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Browser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{formatDate(log.created_at)}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${getEventStyle(log.event_type)}`}>
                        {getEventLabel(log.event_type)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-700">{log.email || '—'}</td>
                    <td className="px-3 py-2 text-slate-500">
                      {log.city && log.country ? `${log.city}, ${log.country}` : log.country || '—'}
                    </td>
                    <td className="px-3 py-2 text-slate-400 font-mono text-xs">{log.ip_address || '—'}</td>
                    <td className="px-3 py-2 text-slate-500">{parseUserAgent(log.user_agent)}</td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-8 text-center text-slate-400">No logs found</td>
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
                  onClick={() => fetchLogs(pagination.page - 1)}
                  disabled={pagination.page <= 1 || loading}
                  className="px-2 py-1 text-xs border border-slate-200 rounded hover:bg-white disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => fetchLogs(pagination.page + 1)}
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
