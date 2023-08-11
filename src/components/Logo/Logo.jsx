import React from 'react'
import './Logo.css'

export const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo" src={require('../../images/logo.png')} alt="logo" />
      <div className="logo-text__container">
        <span className="logo-text__primary">ЕдаКуда.бел</span>
        <span className="logo-text__secondary">Вкусные посылки</span>
      </div>
    </div>
  )
}
