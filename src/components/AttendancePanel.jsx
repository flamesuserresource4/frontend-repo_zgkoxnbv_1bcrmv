import React, { useEffect, useMemo, useState } from 'react'

export default function AttendancePanel() {
  const backend = import.meta.env.VITE_BACKEND_URL
  const [employees, setEmployees] = useState([])
  const [attendance, setAttendance] = useState([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadEmployees() {
    const res = await fetch(`${backend}/employees`)
    setEmployees(await res.json())
  }
  async function loadAttendance() {
    const url = selected ? `${backend}/attendance?employee_id=${selected}` : `${backend}/attendance`
    const res = await fetch(url)
    setAttendance(await res.json())
  }

  useEffect(() => { loadEmployees() }, [])
  useEffect(() => { if (backend) loadAttendance() }, [selected])

  async function checkIn() {
    if (!selected) return alert('Select an employee')
    setLoading(true)
    try {
      const res = await fetch(`${backend}/attendance/checkin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ employee_id: selected }) })
      if (!res.ok) throw new Error('Check-in failed')
      await loadAttendance()
    } catch (e) {
      alert(e.message)
    } finally { setLoading(false) }
  }

  async function checkOut(recId) {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/attendance/${recId}/checkout`, { method: 'POST' })
      if (!res.ok) throw new Error('Check-out failed')
      await loadAttendance()
    } catch (e) {
      alert(e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 text-white space-y-3">
        <div className="font-semibold">Attendance</div>
        <div className="grid grid-cols-2 gap-3">
          <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white" value={selected} onChange={e=>setSelected(e.target.value)}>
            <option value="">Select employee</option>
            {employees.map(e => <option key={e._id} value={e._id}>{e.first_name} {e.last_name}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={checkIn} disabled={loading} className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-lg px-3 py-2">Check in</button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {attendance.length === 0 && <div className="text-blue-300/70">No attendance records yet.</div>}
        {attendance.map(a => (
          <div key={a._id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-white flex items-center justify-between">
            <div>
              <div className="font-medium">{employees.find(e=>e._id===a.employee_id)?.first_name} {employees.find(e=>e._id===a.employee_id)?.last_name}</div>
              <div className="text-sm text-blue-300/70">{a.attendance_date} • In: {a.check_in || '-'} • Out: {a.check_out || '-'}</div>
            </div>
            <div>
              {!a.check_out && <button onClick={()=>checkOut(a._id)} disabled={loading} className="text-xs bg-blue-600/80 hover:bg-blue-600 text-white rounded px-2 py-1">Check out</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
