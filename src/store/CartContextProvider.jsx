import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiGetAll } from '../api'
import { useAuth } from '../features/auth/AuthContextProvider'

const cartContext = createContext({
  cartProducts: null,
  cartProductsCount: 0,
})

export const useCart = () => useContext(cartContext)

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(null)

  useEffect(() => {
    apiGetAll('cart').then((data) => {
      setCartProducts(data)
    })
  }, [])

  return (
    <cartContext.Provider
      value={{
        cartProducts: cartProducts,
        setCartProducts: (products) => setCartProducts(products),
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export const Context = React.createContext([])
