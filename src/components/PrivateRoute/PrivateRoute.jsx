import React from 'react'
import { useAuth } from '../../features/auth/AuthContextProvider'
import { Navigate } from 'react-router-dom'
import { PageLoader } from '../PageLoader/PageLoader'

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === null) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      {isAuthenticated ? children : <Navigate replace to="/login" />}
    </React.Fragment>
  )
}
