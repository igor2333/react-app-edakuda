import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { apiGetSingle } from '../../api'

const authContext = createContext({
  isAuthenticated: false,
  isUserLoading: true,
  cartCount: null,
  user: null,
  cart: [],
  setCart: void 0,
  createWithEmailAndPassword: () => Promise.reject(null),
  loginWithEmailAndPassword: () => Promise.reject(null),
  logOut: () => void 0,
})

export const useAuth = () => useContext(authContext)

export const ContextProvider = ({ children, firebaseApp }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [auth] = useState(getAuth(firebaseApp))

  const [cart, setCart] = useState([])

  const createWithEmailAndPassword = (email, password) => {
    setUser(null)
    setIsAuthenticated(null)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginWithEmailAndPassword = (email, password) => {
    setUser(null)
    setIsAuthenticated(null)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logOut = () => signOut(auth)

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence)
    auth.onAuthStateChanged((user) => {
      if (user) {
        apiGetSingle(user.email, 'users')
          .then((data) => {
            setCart(data.cart)
            setUser(data)
          })
          .then(() => {
            setIsAuthenticated(true)
          })
          .catch((error) => {
            logOut()
            setIsAuthenticated(false)
            setUser(null)
          })
          .finally(() => {
            setIsUserLoading(false)
          })
      } else {
        setIsAuthenticated(false)
        setIsUserLoading(false)
        setUser(null)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  return (
    <authContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        isUserLoading: isUserLoading,
        setCartCount: (count) => setCartCount(count),
        cartCount: cartCount,
        cart: cart,
        setCart: (pizza) => setCart(pizza),
        user,
        createWithEmailAndPassword,
        loginWithEmailAndPassword,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
