import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { useAuth } from '../../features/auth/ContextProvider'
import { PageLoader } from '../PageLoader/PageLoader'

export const Header = () => {
  const { isAuthenticated, user, isUserLoading } = useAuth()

  if (isUserLoading) {
    return <PageLoader />
  }

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
                to="/about"
              >
                О нас
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink
          to={isAuthenticated ? '/admin/pizza' : '/login'}
          className="header__user"
        >
          <UserOutlined style={{ fontSize: '28px', marginRight: '5px' }} />
          <span className="header__user-text">
            {isAuthenticated ? (
              <span style={{ fontFamily: 'var(--font-oswald)' }}>
                {user.email}
              </span>
            ) : (
              'Войти'
            )}
          </span>
        </NavLink>
      </div>
    </div>
  )
}
