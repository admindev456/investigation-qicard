'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  role: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState<'user' | 'admin'>('user')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      
      if (res.status === 403 || res.status === 401) {
        router.push('/knowledgebase/overview')
        return
      }
      
      setUsers(data.users || [])
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setCreating(true)

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create user')
      } else {
        setSuccess(`User created successfully`)
        setNewEmail('')
        setNewPassword('')
        setNewRole('user')
        setShowCreateForm(false)
        fetchUsers()
      }
    } catch {
      setError('Failed to create user')
    } finally {
      setCreating(false)
    }
  }

  async function handleDeleteUser(userId: string, email: string) {
    if (!confirm(`Delete ${email}? This cannot be undone.`)) return

    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to delete user')
      } else {
        setSuccess(`User deleted`)
        fetchUsers()
      }
    } catch {
      setError('Failed to delete user')
    }
  }

  function formatDate(dateString: string | null) {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  if (loading) {
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-base font-semibold text-slate-900">Users</h1>
              <span className="text-xs text-slate-400">{users.length}</span>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-3 py-1.5 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
            >
              {showCreateForm ? 'Cancel' : 'Add User'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
        {/* Messages */}
        {error && (
          <div className="mb-4 px-3 py-2 bg-red-50 border border-red-100 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-md text-emerald-700 text-sm">
            {success}
          </div>
        )}

        {/* Create User Form */}
        {showCreateForm && (
          <div className="mb-5 p-4 border border-slate-200 rounded-lg bg-slate-50">
            <form onSubmit={handleCreateUser} className="flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[180px]">
                <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-300"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-300"
                  placeholder="Min 6 chars"
                  minLength={6}
                  required
                />
              </div>
              <div className="w-[100px]">
                <label className="block text-xs font-medium text-slate-600 mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'user' | 'admin')}
                  className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-300"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Email</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Role</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Created</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-500">Last Login</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-slate-700">{user.email}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${
                      user.role === 'admin' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-500">{formatDate(user.created_at)}</td>
                  <td className="px-3 py-2 text-slate-500">{formatDate(user.last_sign_in_at)}</td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => handleDeleteUser(user.id, user.email || '')}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-slate-400">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
