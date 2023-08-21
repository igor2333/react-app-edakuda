import React from 'react'
import './CartItem.css'
import { Dropdown, Button, notification } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { apiDelete } from '../../api'
import { useCart } from '../../store/CartContextProvider'
import { useAuth } from '../../features/auth/AuthContextProvider'

export const CartItem = ({
  productName,
  productSize,
  productPrice,
  productImage,
  id,
}) => {
  const { cartProducts, setCartProducts } = useCart()

  const { cartCount, setCartCount } = useAuth()

  const onDelete = () => {
    console.log(id)
    apiDelete(id, 'cart').then(() => {
      setCartProducts(cartProducts.filter((item) => item.id !== id))
      setCartCount(cartCount - 1)
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
