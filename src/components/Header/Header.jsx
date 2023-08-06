import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

export const Header = () => {
  return (
    <div className="header">
      <div className="header-wrapper">
        <nav className="header__nav">
          <ul className="header__ul">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'header__active-link' : ''
                }
                to="/"
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'header__active-link' : ''
                }
                to="/pizza"
              >
                Пицца
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'header__active-link' : ''
                }
                to="/rolls"
              >
                Суши
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'header__active-link' : ''
                }
                to="/cakes"
              >
                Торты
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'header__active-link' : ''
                }
                to="/delivery"
              >
                Доставка
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'header__active-link' : ''
                }
                to="/about"
              >
                О нас
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/profile" className="header__user">
          <UserOutlined style={{ fontSize: '28px', marginRight: '15px' }} />
          <span className="header__user-text">Личный кабинет</span>
        </NavLink>
      </div>
    </div>
  )
}
