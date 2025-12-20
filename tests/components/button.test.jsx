import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../../src/components/ui/Button'

describe('Button', () => {
  it('renders children and responds to click', () => {
    const handle = vi.fn()
    const { getByText } = render(<Button onClick={handle}>Save</Button>)
    const btn = getByText('Save')
    expect(btn).toBeTruthy()
    fireEvent.click(btn)
    expect(handle).toHaveBeenCalled()
  })

  it('defaults to type=button to prevent accidental form submit', () => {
    const { getByText } = render(<Button>Click</Button>)
    const btn = getByText('Click')
    expect(btn.getAttribute('type')).toBe('button')
  })
})
