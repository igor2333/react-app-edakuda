import React from 'react'
import './OpenCartButton.css'
import { ShoppingOutlined } from '@ant-design/icons'
import { useAuth } from '../../features/auth/AuthContextProvider'

export const OpenCartButton = ({ onClick }) => {
  const { cartCount } = useAuth()
  console.log(cartCount)

  return (
    <div className="open-cart-button" onClick={onClick}>
      <div>
        <ShoppingOutlined style={{ fontSize: '35px' }} />
        <div className="open-cart-button__count">
          <span>{cartCount}</span>
        </div>
      </div>
    </div>
  )
}
