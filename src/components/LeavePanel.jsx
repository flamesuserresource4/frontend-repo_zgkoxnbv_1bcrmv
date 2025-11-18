import React, { useEffect, useMemo, useState } from 'react'

export default function LeavePanel() {
  const backend = import.meta.env.VITE_BACKEND_URL
  const [employees, setEmployees] = useState([])
  const [leaves, setLeaves] = useState([])
  const [form, setForm] = useState({ employee_id: '', start_date: '', end_date: '', leave_type: 'annual', reason: '' })

  async function loadEmployees() {
    const res = await fetch(`${backend}/employees`)
    setEmployees(await res.json())
  }
  async function loadLeaves() {
    const res = await fetch(`${backend}/leaves`)
    setLeaves(await res.json())
  }

  useEffect(() => { loadEmployees(); loadLeaves() }, [])

  async function submit(e) {
    e.preventDefault()
    const res = await fetch(`${backend}/leaves`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) {
      setForm({ employee_id: '', start_date: '', end_date: '', leave_type: 'annual', reason: '' })
      loadLeaves()
    } else {
      alert('Failed to submit leave')
    }
  }

  async function action(id, act) {
    const res = await fetch(`${backend}/leaves/${id}/action`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: act }) })
    if (res.ok) loadLeaves()
  }

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 text-white space-y-3">
        <div className="font-semibold">Request Leave</div>
        <div className="grid grid-cols-2 gap-3">
          <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" value={form.employee_id} onChange={e=>setForm({...form, employee_id: e.target.value})} required>
            <option value="">Select employee</option>
            {employees.map(e => <option key={e._id} value={e._id}>{e.first_name} {e.last_name}</option>)}
          </select>
          <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" value={form.leave_type} onChange={e=>setForm({...form, leave_type: e.target.value})}>
            <option value="annual">Annual</option>
            <option value="sick">Sick</option>
            <option value="unpaid">Unpaid</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input type="date" className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" value={form.start_date} onChange={e=>setForm({...form, start_date: e.target.value})} required />
          <input type="date" className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" value={form.end_date} onChange={e=>setForm({...form, end_date: e.target.value})} required />
        </div>
        <input className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white w-full" placeholder="Reason (optional)" value={form.reason} onChange={e=>setForm({...form, reason: e.target.value})} />
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2">Submit</button>
      </form>

      <div className="space-y-2">
        {leaves.length === 0 && <div className="text-blue-300/70">No leave requests yet.</div>}
        {leaves.map(l => (
          <div key={l._id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-white flex items-center justify-between">
            <div>
              <div className="font-medium">{employees.find(e=>e._id===l.employee_id)?.first_name} {employees.find(e=>e._id===l.employee_id)?.last_name} • {l.leave_type}</div>
              <div className="text-sm text-blue-300/70">{l.start_date} → {l.end_date}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${l.status==='approved' ? 'bg-green-500/20 text-green-300' : l.status==='rejected' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{l.status}</span>
              {l.status==='pending' && (
                <>
                  <button onClick={()=>action(l._id,'approve')} className="text-xs bg-green-600/80 hover:bg-green-600 text-white rounded px-2 py-1">Approve</button>
                  <button onClick={()=>action(l._id,'reject')} className="text-xs bg-red-600/80 hover:bg-red-600 text-white rounded px-2 py-1">Reject</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
