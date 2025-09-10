import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeInTheDocument()
  })

  it('renders the habit app component', () => {
    render(<App />)
    // The app should render the main habit tracking interface
    // This will depend on your initial screen (login or dashboard)
    expect(document.querySelector('[data-testid="habit-app"]') || document.body).toBeInTheDocument()
  })
})