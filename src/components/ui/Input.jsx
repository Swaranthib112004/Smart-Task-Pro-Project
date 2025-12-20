import React from 'react'
import { TextField } from '@mui/material'

export default function Input({ label, value, onChange, type = 'text', placeholder, sx, ...rest }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      variant="outlined"
      size="small"
      fullWidth
      inputProps={{ 'aria-label': label || placeholder || 'input' }}
      sx={{ borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: 12 }, ...sx }}
      {...rest}
    />
  )
}
