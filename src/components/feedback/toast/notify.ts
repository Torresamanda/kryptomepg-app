'use client'

import { toast, type Id } from 'react-toastify'

interface AsyncNotificationMessages {
  error: string
  loading: string
  success: string
}

async function promise<T>(operation: Promise<T>, messages: AsyncNotificationMessages): Promise<T> {
  const toastId: Id = toast.loading(messages.loading)

  try {
    const result = await operation

    toast.update(toastId, {
      render: messages.success,
      type: 'success',
      isLoading: false,
      autoClose: 5000,
      closeButton: true,
    })

    return result
  } catch (error) {
    toast.update(toastId, {
      render: messages.error,
      type: 'error',
      isLoading: false,
      autoClose: 5000,
      closeButton: true,
    })

    throw error
  }
}

/**
 * Application notification API for meaningful asynchronous mutations.
 *
 * It presents a loading toast immediately and replaces it with either the success or error state.
 */
export const notify = { promise }
