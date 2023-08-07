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
  isAuthenticate: null,
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
  const [isAuthenticate, setIsAuthenticate] = useState(null)
  const [user, setUser] = useState(null)
  const [auth] = useState(getAuth(firebaseApp))

  const loginWithEmailAndPassword = (email, password) => {
    setUser(null)
    setIsAuthenticate(null)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithPopup = (provider) => {
    setUser(null)
    setIsAuthenticate(null)
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
            setIsAuthenticate(true)
            setUser(user)
          })
          .catch((error) => {
            logOut()
            setIsAuthenticate(false)
            setUser(null)
          })
      } else {
        setIsAuthenticate(false)
        setUser(null)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  return (
    <authContext.Provider
      value={{
        isAuthenticate,
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
