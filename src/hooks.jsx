import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

const getVersion = () =>
  document.body.clientWidth < 628 ? 'mobile' : 'desktop'

export const useAdaptive = () => {
  const [version, setVersion] = useState(getVersion())
  const handleResize = throttle(() => {
    setVersion(getVersion())
  }, 100)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isMobile: version === 'mobile' ? true : false,
  }
}
