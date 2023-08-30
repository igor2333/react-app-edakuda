import React from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

export const Page = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  )
}
