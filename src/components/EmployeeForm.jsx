import React, { useState } from 'react'

export default function EmployeeForm({ onCreated }) {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', department_id: '', role: '' })
  const [loading, setLoading] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${backend}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to create employee')
      setForm({ first_name: '', last_name: '', email: '', department_id: '', role: '' })
      onCreated && onCreated()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="First name" value={form.first_name} onChange={e=>setForm({...form, first_name: e.target.value})} required />
        <input className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Last name" value={form.last_name} onChange={e=>setForm({...form, last_name: e.target.value})} required />
      </div>
      <input className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-white w-full" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
      <div className="grid grid-cols-2 gap-3">
        <input className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Department ID (optional)" value={form.department_id} onChange={e=>setForm({...form, department_id: e.target.value})} />
        <input className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Role" value={form.role} onChange={e=>setForm({...form, role: e.target.value})} />
      </div>
      <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg px-4 py-2">{loading ? 'Saving...' : 'Add Employee'}</button>
    </form>
  )
}
