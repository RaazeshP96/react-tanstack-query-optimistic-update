import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { renderWithClient } from '../../test/setup'
import ChangeBgButton from '../ChangeBgButton'

// Mock the API functions
vi.mock('../../api/color', () => ({
  fetchColor: vi.fn(() => Promise.resolve('#ffedd5')),
  setColor: vi.fn(() => Promise.resolve('#dbeafe')),
}))

describe('ChangeBgButton', () => {
  it('renders without crashing', async () => {
    renderWithClient(<ChangeBgButton />)
    
    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Change Background')).toBeInTheDocument()
  })
})
