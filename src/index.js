import React from 'react'
import ReactDOM from 'react-dom/client'
import './common.css'
import App from '../src/components/App/App'
import { initializeAPI } from './api'

initializeAPI()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
