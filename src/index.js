import React from 'react'
import ReactDOM from 'react-dom/client'
import './common.css'
import App from '../src/components/App/App'
import { initializeAPI } from './api'
import { ContextProvider } from './features/auth/ContextProvider'

const firebaseApp = initializeAPI()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ContextProvider firebaseApp={firebaseApp}>
    <App />
  </ContextProvider>
)
