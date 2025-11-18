import React from 'react'

const items = [
  { key: 'employees', label: 'Employees' },
  { key: 'leaves', label: 'Leaves' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'departments', label: 'Departments' },
]

export default function Sidebar({ current, onChange }) {
  return (
    <aside className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4 shadow-xl h-full">
      <div className="mb-4">
        <div className="text-xs uppercase tracking-wide text-blue-300/60">Navigation</div>
      </div>
      <nav className="space-y-2">
        {items.map(it => (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${current===it.key ? 'bg-blue-600/20 text-blue-200 border border-blue-500/30' : 'text-blue-200/80 hover:text-blue-200 hover:bg-slate-700/60 border border-transparent'}`}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
