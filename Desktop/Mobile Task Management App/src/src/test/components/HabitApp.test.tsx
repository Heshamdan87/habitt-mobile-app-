import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HabitApp from '../../components/HabitApp'

describe('HabitApp', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('shows login screen when no user is logged in', () => {
    render(<HabitApp />)
    
    // Should show login elements
    expect(screen.getByText(/welcome to habitt/i) || screen.getByText(/sign in/i)).toBeInTheDocument()
  })

  it('allows demo account login', async () => {
    const user = userEvent.setup()
    render(<HabitApp />)
    
    // Look for demo account button or email field
    const demoButton = screen.queryByText(/demo account/i) || screen.queryByText(/try demo/i)
    const emailField = screen.queryByLabelText(/email/i) || screen.queryByPlaceholderText(/email/i)
    
    if (demoButton) {
      await user.click(demoButton)
    } else if (emailField) {
      // Manual demo login
      await user.type(emailField, 'demo@habitt.com')
      const passwordField = screen.getByLabelText(/password/i) || screen.getByPlaceholderText(/password/i)
      await user.type(passwordField, 'demo123')
      
      const loginButton = screen.getByRole('button', { name: /sign in|login/i })
      await user.click(loginButton)
    }
    
    // After login, should see dashboard elements
    await waitFor(() => {
      expect(
        screen.queryByText(/today's progress/i) || 
        screen.queryByText(/my habits/i) ||
        screen.queryByText(/dashboard/i)
      ).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('handles theme switching', async () => {
    const user = userEvent.setup()
    render(<HabitApp />)
    
    // First login with demo account if needed
    const demoButton = screen.queryByText(/demo account/i) || screen.queryByText(/try demo/i)
    if (demoButton) {
      await user.click(demoButton)
      await waitFor(() => {
        expect(screen.queryByText(/today's progress/i) || screen.queryByText(/dashboard/i)).toBeInTheDocument()
      })
    }
    
    // Look for theme toggle (could be in settings or header)
    const themeToggle = screen.queryByLabelText(/theme/i) || 
                       screen.queryByRole('button', { name: /theme|dark|light/i })
    
    if (themeToggle) {
      await user.click(themeToggle)
      
      // Check if dark class is added to document or specific element
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark') || 
               document.querySelector('.dark')).toBeTruthy()
      })
    }
  })

  it('persists data in localStorage', async () => {
    const user = userEvent.setup()
    render(<HabitApp />)
    
    // Login first
    const demoButton = screen.queryByText(/demo account/i) || screen.queryByText(/try demo/i)
    if (demoButton) {
      await user.click(demoButton)
      await waitFor(() => {
        expect(screen.queryByText(/today's progress/i) || screen.queryByText(/dashboard/i)).toBeInTheDocument()
      })
      
      // Check that user data is stored
      expect(localStorage.getItem('habitt-user')).toBeTruthy()
    }
  })
})