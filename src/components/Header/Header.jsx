import React from 'react'
import './Header.css'
import { useAdaptive } from '../../hooks'
import { DesktopHeader } from './DesktopHeader'
import { MobileHeader } from './MobileHeader'

export const Header = () => {
  const { isMobile } = useAdaptive()

  return isMobile ? <MobileHeader /> : <DesktopHeader />
}
