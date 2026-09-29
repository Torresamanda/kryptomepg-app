'use client'

import { ToastContainer } from 'react-toastify'

/** Renders the single application-wide region used for toast notifications. */
export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      theme="dark"
      autoClose={5000}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      draggable
    />
  )
}
