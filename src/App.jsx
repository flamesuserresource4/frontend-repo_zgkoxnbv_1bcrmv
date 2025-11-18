import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import LeavePanel from './components/LeavePanel'
import Sidebar from './components/Sidebar'
import AttendancePanel from './components/AttendancePanel'
import DepartmentPanel from './components/DepartmentPanel'

function App() {
  const [refresh, setRefresh] = useState(0)
  const [tab, setTab] = useState('employees')

  const mainPanel = useMemo(() => {
    switch (tab) {
      case 'employees':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">Employees</h2>
                <button onClick={()=>setRefresh(x=>x+1)} className="text-xs px-3 py-1 rounded bg-slate-700 text-blue-200 hover:bg-slate-600">Refresh</button>
              </div>
              <EmployeeList refreshToken={refresh} />
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
              <LeavePanel />
            </div>
          </div>
        )
      case 'leaves':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <LeavePanel />
          </div>
        )
      case 'attendance':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <AttendancePanel />
          </div>
        )
      case 'departments':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <DepartmentPanel />
          </div>
        )
      default:
        return null
    }
  }, [tab, refresh])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative max-w-6xl mx-auto p-6">
        <Header />

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 order-2 md:order-1">
            {mainPanel}
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <Sidebar current={tab} onChange={setTab} />

            {tab==='employees' && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
                <h2 className="text-white font-semibold mb-4">Add Employee</h2>
                <EmployeeForm onCreated={() => setRefresh(x=>x+1)} />
              </div>
            )}

            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
              <div className="text-blue-200 text-sm">
                Set VITE_BACKEND_URL in environment for API connection. Features: employees, leave, attendance, departments.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
