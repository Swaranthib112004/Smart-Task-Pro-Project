import React from 'react'
import { Card, Typography, Box } from '@mui/material'
import { loadTasks } from '../utils/tasks'

function getDailyCounts(tasks) {
  // naive fake dates: count by dueDate for demo, else use created day from id timestamp
  const map = {}
  tasks.forEach(t => {
    const day = t.completedAt ? new Date(t.completedAt).toISOString().slice(0,10) : (t.dueDate || new Date(t.id).toISOString().slice(0,10))
    map[day] = (map[day] || 0) + (t.done ? 1 : 0)
  })
  return map
}

export default function Stats() {
  const tasks = loadTasks();
  const counts = getDailyCounts(tasks)
  const days = Object.keys(counts).sort()
  const totalCompleted = Object.values(counts).reduce((a,b) => a+b, 0)
  const productivity = Math.min(100, Math.round((totalCompleted / (tasks.length || 1)) * 20 + 50))
  const insight = productivity > 80 ? 'Nice! You are on a strong streak.' : (productivity > 60 ? 'Good progress this week.' : 'Try focusing on top tasks today.')

  return (
    <Card sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box>
        <Typography variant="h6">Productivity</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>{productivity}<span style={{ fontSize: 12 }}>/100</span></Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{totalCompleted} tasks completed</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        {/* tiny sparkline */}
        <svg width="160" height="40" viewBox="0 0 160 40">
          <polyline fill="none" stroke="var(--accent, #7dd3fc)" strokeWidth="2" points={days.map((d,i)=>{
            const x = 10 + (i*(140/(Math.max(1,days.length-1))))
            const y = 30 - ((counts[d]||0)/Math.max(1,Math.max(...Object.values(counts))||1))*24
            return `${x},${y}`
          }).join(' ')} />
        </svg>
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{insight}</Typography>
      </Box>
    </Card>
  )
}
