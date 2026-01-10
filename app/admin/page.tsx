'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminInfo {
  isAdmin: boolean
  email: string
  userId: string
}

export default function AdminDashboard() {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalUsers: 0, totalLogs: 0, recentLogins: 0 })
  const router = useRouter()

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch('/api/admin/check')
        const data = await res.json()
        
        if (!data.isAdmin) {
          router.push('/knowledgebase/overview')
          return
        }
        
        setAdminInfo(data)
        
        // Fetch stats
        const [usersRes, logsRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/logs?limit=100')
        ])
        
        const usersData = await usersRes.json()
        const logsData = await logsRes.json()
        
        const now = new Date()
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        const recentLogins = logsData.logs?.filter((log: any) => 
          log.event_type === 'sign_in' && new Date(log.created_at) > last24h
        ).length || 0
        
        setStats({
          totalUsers: usersData.users?.length || 0,
          totalLogs: logsData.pagination?.total || 0,
          recentLogins
        })
      } catch (error) {
        console.error('Admin check failed:', error)
        router.push('/knowledgebase/overview')
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    )
  }

  if (!adminInfo?.isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header */}
      <div className="border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-semibold text-slate-900">Admin</h1>
                <p className="text-xs text-slate-500">{adminInfo.email}</p>
              </div>
            </div>
            <Link 
              href="/knowledgebase/overview"
              className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-50 rounded-lg px-4 py-3">
            <div className="text-2xl font-semibold text-slate-900">{stats.totalUsers}</div>
            <div className="text-xs text-slate-500 mt-0.5">Users</div>
          </div>
          <div className="bg-slate-50 rounded-lg px-4 py-3">
            <div className="text-2xl font-semibold text-slate-900">{stats.totalLogs}</div>
            <div className="text-xs text-slate-500 mt-0.5">Auth Events</div>
          </div>
          <div className="bg-slate-50 rounded-lg px-4 py-3">
            <div className="text-2xl font-semibold text-slate-900">{stats.recentLogins}</div>
            <div className="text-xs text-slate-500 mt-0.5">Logins (24h)</div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="space-y-2">
          <Link 
            href="/admin/users"
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">Users</div>
                <div className="text-xs text-slate-500">Manage accounts and roles</div>
              </div>
            </div>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link 
            href="/admin/logs"
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-emerald-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900 group-hover:text-emerald-600 transition-colors">Auth Logs</div>
                <div className="text-xs text-slate-500">Sign-in history and events</div>
              </div>
            </div>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link 
            href="/admin/tracking"
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-violet-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900 group-hover:text-violet-600 transition-colors">Activity</div>
                <div className="text-xs text-slate-500">Page visits and time tracking</div>
              </div>
            </div>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
