import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useAuth } from '../../features/auth/ContextProvider'
import { NavLink } from 'react-router-dom'
import { ProductsCartModal } from '../ProductsCartModal/ProductsCartModal'
import { useNavigate } from 'react-router-dom'

export const MobileHeader = () => {
  const [isOpenMenu, toggleMenu] = useState(false)
  const [isOpenSubMenu, toggleSubMenu] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const onCartCancel = () => setIsCartOpen(false)

  const { cart, isAuthenticated, logOut, user } = useAuth()
  const navigate = useNavigate()

  const onLogoutClick = () => {
    navigate('/login')
    logOut()
  }

  const documentKeydownListener = (event) => {
    if (event.key === 'Escape') {
      toggleMenu(false)
    }
  }

  useEffect(() => {
    if (isOpenMenu) {
      document.documentElement.classList.add('--prevent-scroll')
    }

    return () => {
      document.documentElement.classList.remove('--prevent-scroll')
    }
  }, [isOpenMenu])

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener('keydown', documentKeydownListener)
    } else {
      document.removeEventListener('keydown', documentKeydownListener)
    }

    return () => {
      document.removeEventListener('keydown', documentKeydownListener)
    }
  }, [isOpenMenu])

  return (
    <header className="header">
      <div className="container header__mobile-container">
        <button
          className="header__mobile-button"
          onClick={() => toggleMenu(!isOpenMenu)}
        >
          {isOpenMenu ? (
            <div>
              <CloseOutlined style={{ marginRight: '10px' }} />
              <span>Меню</span>
            </div>
          ) : (
            <div>
              <MenuOutlined style={{ marginRight: '10px' }} />
              <span>Меню</span>
            </div>
          )}
        </button>
        <div>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => setIsCartOpen(true)}
          >
            Корзина: {cart.length}
          </span>
        </div>
      </div>
      <CSSTransition
        in={isOpenMenu}
        mountOnEnter
        unmountOnExit
        timeout={400}
        classNames="header-mobile-menu-animation"
      >
        <div className="header__mobile-overlay">
          <div className="header__mobile-backdrop" />
          <div className="header__mobile-menu">
            {isOpenSubMenu ? (
              <button
                className="header__mobile-back-button"
                onClick={() => toggleSubMenu(false)}
              >
                К меню
              </button>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <nav className="header__nav">
                  <ul className="header__mobile-ul">
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
                    {!isAuthenticated ? (
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? 'header__active-link' : ''
                          }
                          to="/login"
                        >
                          Войти
                        </NavLink>
                      </li>
                    ) : (
                      <>
                        <li>
                          <NavLink to="/login" onClick={onLogoutClick}>
                            Выйти из аккаунта
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/admin">Панель администратора</NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
                {isAuthenticated ? (
                  <span style={{ margin: '20px 0', fontSize: '15px' }}>
                    ({user.email})
                  </span>
                ) : null}
              </div>
            )}

            <div
              className={
                ('header__mobile-controls',
                {
                  'header__mobile-controls--hasMenu': isOpenSubMenu,
                })
              }
            ></div>
          </div>
        </div>
      </CSSTransition>
      <ProductsCartModal showModal={isCartOpen} onCancel={onCartCancel} />
    </header>
  )
}
