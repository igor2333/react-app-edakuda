import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
} from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

const authContext = createContext({
  isAuthenticated: false,
  isUserLoading: true,
  user: null,
  loginWithEmailAndPassword: () => Promise.reject(null),
  loginWithPopup: () => Promise.reject(null),
  logOut: () => void 0,
})

export const ALLOWED_OAUTH_PROVIDERS = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
}

export const useAuth = () => useContext(authContext)

export const AuthContextProvider = ({ children, firebaseApp }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [auth] = useState(getAuth(firebaseApp))

  const loginWithEmailAndPassword = (email, password) => {
    setUser(null)
    setIsAuthenticated(null)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithPopup = (provider) => {
    setUser(null)
    setIsAuthenticated(null)
    return signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[provider])
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logOut = () => signOut(auth)

  const isUserAdmin = async (firebaseApp) => {
    const dataBase = getFirestore(firebaseApp)
    return await getDoc(doc(dataBase, '/internal/auth'))
  }

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence)
    auth.onAuthStateChanged((user) => {
      if (user) {
        isUserAdmin(firebaseApp)
          .then(() => {
            setIsAuthenticated(true)
            setUser(user)
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
        user,
        loginWithEmailAndPassword,
        logOut,
        loginWithPopup,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
