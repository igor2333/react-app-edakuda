import React from 'react'
import ReactDOM from 'react-dom/client'
import './common.css'
import App from '../src/components/App/App'
import { initializeAPI } from './api'
import { AuthContextProvider } from './features/auth/AuthContextProvider'
import { CartContextProvider } from './store/CartContextProvider'

const firebaseApp = initializeAPI()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthContextProvider firebaseApp={firebaseApp}>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </AuthContextProvider>
)
