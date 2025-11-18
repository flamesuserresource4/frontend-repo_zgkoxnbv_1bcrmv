import React, { useEffect, useState } from 'react'

export default function DepartmentPanel() {
  const backend = import.meta.env.VITE_BACKEND_URL
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '' })
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/departments`)
      setItems(await res.json())
    } catch (e) {
      console.error(e)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`${backend}/departments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed to create department')
      setForm({ name: '', description: '' })
      await load()
    } catch (e) { alert(e.message) } finally { setSaving(false) }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 text-white space-y-3">
        <div className="font-semibold">Create Department</div>
        <div className="grid grid-cols-2 gap-3">
          <input className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <input className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Description (optional)" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
        </div>
        <button disabled={saving} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg px-4 py-2">{saving ? 'Saving...' : 'Add Department'}</button>
      </form>

      <div className="space-y-2">
        {loading && <div className="text-blue-200">Loading departments...</div>}
        {!loading && items.length === 0 && <div className="text-blue-300/70">No departments yet.</div>}
        {!loading && items.map(d => (
          <div key={d._id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-white">
            <div className="font-semibold">{d.name}</div>
            {d.description && <div className="text-sm text-blue-300/70">{d.description}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
