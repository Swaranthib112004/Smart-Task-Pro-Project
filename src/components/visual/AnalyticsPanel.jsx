import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material'

function Sparkline({ data = [], color = '#7dd3fc' }) {
  if (!data || !data.length) return null
  const w = 160, h = 40
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((d - min) / (max - min || 1)) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AnalyticsPanel({ stats = {} }) {
  const sample = stats.series || [12, 18, 14, 22, 28, 34, 24]
  const total = sample.reduce((a, b) => a + b, 0)
  const avg = Math.round(total / sample.length)

  const colors = ['#7dd3fc', '#f472b6', '#60a5fa', '#34d399', '#f59e0b']

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">Analytics</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Overview</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>{total}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Last 7 days</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
          <Sparkline data={sample} color={colors[0]} />
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {colors.map((c, i) => <Box key={i} sx={{ width: 10, height: 10, borderRadius: 2, background: c }} />)}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, mt: 2 }}>
          <Box>
            <Typography variant="subtitle2">Avg</Typography>
            <Typography sx={{ fontWeight: 700 }}>{avg}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Top</Typography>
            <Typography sx={{ fontWeight: 700 }}>{Math.max(...sample)}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Growth</Typography>
            <Typography sx={{ fontWeight: 700 }}>+{Math.round((sample[sample.length-1] - sample[0]) / (sample[0] || 1) * 100)}%</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
