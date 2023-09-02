import React from 'react'
import './CartItem.css'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { apiUpdate } from '../../api'
import { useAuth } from '../../features/auth/ContextProvider'
import { useAdaptive } from '../../hooks'

export const CartItem = ({
  productName,
  productSize,
  productPrice,
  productImage,
  id,
}) => {
  const { isMobile } = useAdaptive()
  const { user, cart, setCart } = useAuth()

  const onDelete = () => {
    const filter = cart.filter((pizza) => {
      return pizza.id !== id
    })

    const cartData = {
      cart: [...filter],
    }

    apiUpdate(user.email, cartData, 'users').then(() => {
      setCart(filter)
    })
  }

  return (
    <div className="cart-item-container">
      <img
        className="cart-item__image"
        src={`${productImage}`}
        alt="cart item"
      />
      <div className="cart-item__text">
        <span>
          Пицца "{productName}" {productSize}.
        </span>
        <span style={{ marginTop: '15px' }}>Цена: {productPrice}р.</span>
        {isMobile ? null : (
          <span
            style={{ marginTop: '15px', fontSize: '13px', color: '#ADA3A4' }}
          >
            Новый Континент
          </span>
        )}
      </div>
      <div className="cart-item__delete">
        <Button
          onClick={onDelete}
          shape="circle"
          danger="true"
          icon={<DeleteOutlined />}
        ></Button>
      </div>
    </div>
  )
}
