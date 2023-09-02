import React, { useState } from 'react'
import { CartItem } from '../CartItem/CartItem'
import { Space, Button } from 'antd'
import { PageLoader } from '../PageLoader/PageLoader'
import { useAuth } from '../../features/auth/ContextProvider'
import { PizzaOrderModal } from '../PizzaOrderModal/PizzaOrderModal'
import './ProductsCartList.css'

export const ProductsCartList = () => {
  const [isOrderModalShown, setIsOrderModalShown] = useState(false)

  const { cart, isUserLoading } = useAuth()

  const totalPriceCalc = cart.reduce(
    (acc, current) => acc + Number(current.pizzaPrice),
    0
  )

  const totalPrice = Math.round(totalPriceCalc * 100) / 100

  if (isUserLoading) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      <h2>Итого: {totalPrice}р.</h2>
      {cart.length === 0 ? (
        <span className="empty-cart-text">Ваша корзина пуста.</span>
      ) : (
        <>
          <Space
            direction="vertical"
            wrap
            size="large"
            style={{ marginTop: '20px' }}
          >
            {cart.length === 0 ? (
              <span className="empty-cart-text">Ваша корзина пуста.</span>
            ) : (
              cart.map((pizza) => {
                return (
                  <CartItem
                    key={pizza.id}
                    productName={pizza.pizzaName}
                    productSize={pizza.pizzaSize}
                    productPrice={pizza.pizzaPrice}
                    productImage={pizza.pizzaImage}
                    id={pizza.id}
                  />
                )
              })
            )}
          </Space>
          <Button
            style={{ marginTop: '20px' }}
            onClick={() => {
              setIsOrderModalShown(true)
            }}
            type="primary"
            shape="round"
            className="order-button"
          >
            Оплатить
          </Button>
        </>
      )}
      <PizzaOrderModal
        showModal={isOrderModalShown}
        onCancel={() => setIsOrderModalShown(false)}
      />
    </React.Fragment>
  )
}
