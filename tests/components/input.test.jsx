import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Input from '../../src/components/ui/Input'

describe('Input', () => {
  it('renders with label and placeholder', () => {
    render(<Input label="Name" placeholder="Enter name" />)
    expect(screen.getByLabelText('Name')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter name')).toBeTruthy()
  })
})
