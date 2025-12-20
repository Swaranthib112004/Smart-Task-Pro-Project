import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AnimatedCheckbox from '../../src/components/ui/AnimatedCheckbox'

describe('AnimatedCheckbox', () => {
  it('renders and toggles', () => {
    const onChange = vi.fn()
    const { getByLabelText } = render(<AnimatedCheckbox checked={false} onChange={onChange} label="checkit" />)
    const label = getByLabelText('checkit')
    fireEvent.click(label)
    expect(onChange).toHaveBeenCalled()
  })
})
