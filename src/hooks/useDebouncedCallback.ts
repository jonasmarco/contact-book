import React from 'react'

export const useDebouncedCallback = (callback: Function, delay: number) => {
  const [timerId, setTimerId] = React.useState<number | null>(null)

  const debouncedCallback = (...args: any[]) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    const newTimerId = window.setTimeout(() => {
      callback(...args)
    }, delay)
    setTimerId(newTimerId)
  }

  const cancel = () => {
    if (timerId) {
      clearTimeout(timerId)
      setTimerId(null)
    }
  }

  return { debouncedCallback, cancel }
}
