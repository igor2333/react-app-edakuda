import React from 'react'
import { useAuth } from '../../features/auth/AuthContextProvider'
import { Navigate } from 'react-router-dom'
import { PageLoader } from '../PageLoader/PageLoader'

export const PrivateRoute = ({ children }) => {
  const { isAuthenticate } = useAuth()

  if (isAuthenticate === null) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      {isAuthenticate ? children : <Navigate replace to="/login" />}
    </React.Fragment>
  )
}
