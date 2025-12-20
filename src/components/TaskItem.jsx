import React from "react";
import AnimatedCheckbox from './ui/AnimatedCheckbox'
import { IconButton, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        opacity: task.removing ? 0 : 1,
        transform: task.removing ? 'translateX(-8px) scale(.995)' : 'none',
        transition: 'transform 240ms cubic-bezier(.2,.9,.2,1), opacity 240ms',
        borderRadius: 'var(--card-radius, 12px)',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: 'var(--glass-shadow)' },
      }}
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onEdit && onEdit(task)
        if (e.key === ' ') { e.preventDefault(); onToggle && onToggle(task.id) }
      }}
    >
      {/* Animated checkbox */}
      <Box sx={{ display: 'inline-block' }}>
        <AnimatedCheckbox checked={task.done} onChange={() => onToggle(task.id)} label={`Mark ${task.text} complete`} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 600, transition: 'opacity 240ms, transform 240ms, text-decoration-color 240ms', textDecoration: task.done ? 'line-through' : 'none', opacity: task.removing ? 0.6 : 1 }}>{task.text}</Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{task.dueDate ? `Due: ${task.dueDate}` : 'No due'} • Priority: {task.priority}</Typography>
      </Box>
      <IconButton color="primary" onClick={() => onEdit && onEdit(task)} sx={{ mr: 1 }} aria-label={`Edit ${task.text}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
      </IconButton>
      <IconButton color="error" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.text}`}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default React.memo(TaskItem);
