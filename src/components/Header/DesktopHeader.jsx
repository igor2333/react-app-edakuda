import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../features/auth/ContextProvider'
import { Dropdown } from 'antd'
import { useNavigate } from 'react-router-dom'

export const DesktopHeader = () => {
  const { isAuthenticated, user, logOut } = useAuth()

  const navigate = useNavigate()

  const onLogoutClick = () => {
    navigate('/login')
    logOut()
  }

  const items = [
    {
      key: 1,
      label: (
        <span onClick={() => navigate('/admin')}>Панель администратора</span>
      ),
    },
    {
      key: 2,
      label: <span onClick={onLogoutClick}>Выйти из аккаунта</span>,
      danger: true,
    },
  ]

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
          </ul>
        </nav>
        {isAuthenticated ? (
          <Dropdown menu={{ items }}>
            <span className="header__user-text">
              {isAuthenticated ? (
                <span style={{ fontFamily: 'var(--font-oswald)' }}>
                  {user.email}
                </span>
              ) : (
                'Войти'
              )}
            </span>
          </Dropdown>
        ) : (
          <NavLink className="header__user-text" to="/login">
            Войти
          </NavLink>
        )}
      </div>
    </div>
  )
}
