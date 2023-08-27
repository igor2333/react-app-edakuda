import React from 'react'
import './CartItem.css'
import { Dropdown, Button, notification } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { apiUpdate } from '../../api'
import { useAuth } from '../../features/auth/ContextProvider'

export const CartItem = ({
  productName,
  productSize,
  productPrice,
  productImage,
  id,
}) => {
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
      notification.success({
        message: 'Товар успешно удалён из корзины',
      })
    })
  }

  const items = [
    {
      key: '1',
      label: (
        <Button onClick={onDelete} danger="true">
          Удалить
        </Button>
      ),
    },
  ]

  return (
    <div className="cart-item-container">
      <img
        className="cart-item__image"
        src={`${productImage}`}
        alt="cart item"
      />
      <div className="cart-item__text">
        <span>
          Пицца "{productName}" {productSize}г.
        </span>
        <span style={{ marginTop: '15px' }}>Цена: {productPrice}р.</span>
        <span style={{ marginTop: '15px', fontSize: '13px', color: '#ADA3A4' }}>
          Новый Континент
        </span>
      </div>
      <div className="cart-item__delete">
        <Dropdown menu={{ items }} placement="bottom">
          <Button
            shape="circle"
            danger="true"
            icon={<DeleteOutlined />}
          ></Button>
        </Dropdown>
      </div>
    </div>
  )
}
