import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TaskItem from '../../src/components/TaskItem'

describe('TaskItem', () => {
  const task = { id: 1, text: 'Test', done: false, dueDate: '', priority: 'Normal' }

  it('renders text and actions', () => {
    const onToggle = vi.fn()
    const onDelete = vi.fn()
    render(<TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />)
    expect(screen.getByText('Test')).toBeTruthy()
    fireEvent.click(screen.getByLabelText('Delete Test'))
    expect(onDelete).toHaveBeenCalled()
  })
})
