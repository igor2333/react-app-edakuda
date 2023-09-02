import React from 'react'
import './OpenCartButton.css'
import { ShoppingOutlined } from '@ant-design/icons'
import { useAuth } from '../../features/auth/ContextProvider'
import { useAdaptive } from '../../hooks'

export const OpenCartButton = ({ onClick }) => {
  const { cart } = useAuth()
  const { isMobile } = useAdaptive()

  return isMobile ? null : (
    <div className="open-cart-button" onClick={onClick}>
      <div>
        <ShoppingOutlined style={{ fontSize: '35px' }} />
        <div className="open-cart-button__count">
          <span>{cart.length}</span>
        </div>
      </div>
    </div>
  )
}
