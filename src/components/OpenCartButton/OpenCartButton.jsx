import React from 'react'
import './OpenCartButton.css'
import { ShoppingOutlined } from '@ant-design/icons'
import { useAuth } from '../../features/auth/ContextProvider'

export const OpenCartButton = ({ onClick }) => {
  const { cart } = useAuth()

  return (
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
