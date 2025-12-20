import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../src/utils/api', () => {
  return {
    fetchTasks: vi.fn(() => Promise.resolve([{ id: 1, text: 'Hello', done: false, dueDate: '', priority: 'Normal' }])),
    addTaskApi: vi.fn((t) => Promise.resolve(t)),
    updateTaskApi: vi.fn((t) => Promise.resolve(t)),
    deleteTaskApi: vi.fn((id) => Promise.resolve(id)),
  }
})

import Tasks from '../../src/pages/Tasks'
import * as api from '../../src/utils/api'

describe('Tasks page', () => {
  it('fetches and shows tasks initially', async () => {
    render(<Tasks />)
    await waitFor(() => expect(screen.getByText('Hello')).toBeTruthy())
  })

  it('adds a task and shows it', async () => {
    render(<Tasks />)
    const input = screen.getByLabelText('New task') || screen.getByPlaceholderText('New task') || screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Todo' } })
    const addBtn = screen.getByText('Add')
    fireEvent.click(addBtn)
    await waitFor(() => expect(api.addTaskApi).toHaveBeenCalled())
  })
})
