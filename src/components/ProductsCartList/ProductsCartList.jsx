import React, { useState, useEffect } from 'react'
import { CartItem } from '../CartItem/CartItem'
import { apiGetAll } from '../../api'
import { Space } from 'antd'
import { PageLoader } from '../PageLoader/PageLoader'
import { useAuth } from '../../features/auth/AuthContextProvider'
import { useCart } from '../../store/CartContextProvider'
import './ProductsCartList.css'

export const ProductsCartList = () => {
  const [loading, setLoading] = useState(true)

  const { cartProducts, setCartProducts } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    apiGetAll('cart')
      .then((data) => {
        setCartProducts(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filterByUserEmail = (products) => {
    const result = products.filter((product) => {
      return product.user === user.email
    })

    return result
  }

  const products = loading ? [] : filterByUserEmail(cartProducts)

  const totalPrice = products.reduce(
    (acc, currentProduct) => acc + Number(currentProduct.productPrice),
    0
  )

  if (loading) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      <h2>Итого: {Math.round(totalPrice * 100) / 100}р.</h2>
      <Space
        direction="vertical"
        wrap
        size="large"
        style={{ marginTop: '20px' }}
      >
        {products.length === 0 ? (
          <span className="empty-cart-text">Ваша корзина пуста.</span>
        ) : (
          products.map((product) => {
            return (
              <CartItem
                key={product.id}
                productName={product.productName}
                productSize={product.productSize}
                productPrice={product.productPrice}
                productImage={product.productImage}
                id={product.id}
              />
            )
          })
        )}
      </Space>
    </React.Fragment>
  )
}
