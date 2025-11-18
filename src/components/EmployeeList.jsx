import React, { useEffect, useState } from 'react'

export default function EmployeeList({ refreshToken }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const backend = import.meta.env.VITE_BACKEND_URL

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/employees`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])
  useEffect(() => { if (refreshToken) load() }, [refreshToken])

  if (loading) return <div className="text-blue-200">Loading employees...</div>

  return (
    <div className="space-y-2">
      {items.length === 0 && <div className="text-blue-300/70">No employees yet.</div>}
      {items.map(e => (
        <div key={e._id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-white flex items-center justify-between">
          <div>
            <div className="font-semibold">{e.first_name} {e.last_name}</div>
            <div className="text-sm text-blue-300/70">{e.email} {e.role ? `• ${e.role}` : ''}</div>
          </div>
          <div className="text-xs text-blue-300/60">{e.status || 'active'}</div>
        </div>
      ))}
    </div>
  )
}
