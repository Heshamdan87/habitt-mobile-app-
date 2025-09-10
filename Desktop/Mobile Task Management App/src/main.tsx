/**
 * HABITT - MOBILE HABIT TRACKER
 * 
 * Application Entry Point
 * 
 * This file serves as the main entry point for the React application.
 * It renders the root App component and applies global styles.
 * 
 * DEVELOPER: Hesham Al Dandan
 * LOCATION: Kassel, Germany
 * EMAIL: heshamdan2014@gmail.com
 * PHONE: +49 157 73127109
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)