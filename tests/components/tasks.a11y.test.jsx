import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Tasks from '../../src/pages/Tasks'

describe('Tasks page accessibility basics', () => {
  it('renders search and labeled list', () => {
    render(<Tasks />)
    expect(screen.getByPlaceholderText('Search tasks')).toBeTruthy()
    expect(screen.getByLabelText('Tasks list')).toBeTruthy()
  })
})
