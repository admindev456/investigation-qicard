'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-slate-600 hover:text-slate-900 font-medium"
    >
      Logout
    </button>
  )
}

