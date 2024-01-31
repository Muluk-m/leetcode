import { useMemo, useRef, useEffect } from 'react'

/**
 * useInterval
 */
const useInterval = (delay: number, callback: () => void) => {
  const latestCallback = useRef(callback)
  const timer = useRef()

  latestCallback.current = callback

  useEffect(() => {
    const timer = setInterval(() => {
      latestCallback.current()
    }, delay)

    return () => {
      clearInterval(timer)
    }
  }, [delay])
}