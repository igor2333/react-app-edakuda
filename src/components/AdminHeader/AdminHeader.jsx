import React from 'react'
import './AdminHeader.css'
import { NavLink } from 'react-router-dom'

export const AdminHeader = () => {
  return (
    <div className="admin-header">
      <div className="admin-header__wrapper">
        <div className="admin-header__logo-container">
          <img
            className="admin-header-logo"
            src={require('../../images/logo.png')}
            alt="logo"
          />
          <span className="admin-header__logo-text">Администратор</span>
        </div>
        <nav className="admin-header__nav">
          <ul className="admin-header__ul">
            <li>
              <NavLink>Пицца</NavLink>
            </li>
            <li>
              <NavLink>Торты</NavLink>
            </li>
            <li>
              <NavLink>Суши</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
