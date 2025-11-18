import React from 'react'

export default function Header() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold">HR</div>
        <div>
          <h1 className="text-2xl font-bold text-white">HRMS Portal</h1>
          <p className="text-sm text-blue-200/70">Minimal HR management system</p>
        </div>
      </div>
    </div>
  )
}
