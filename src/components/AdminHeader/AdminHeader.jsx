import React from 'react'
import './AdminHeader.css'
import { NavLink } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useAuth } from '../../features/auth/ContextProvider'
import { useNavigate } from 'react-router-dom'

export const AdminHeader = () => {
  const { logOut } = useAuth()

  const navigate = useNavigate()

  const onLogoutClick = () => {
    navigate('/login')
    logOut()
  }

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
              <Button
                onClick={onLogoutClick}
                style={{ marginLeft: '40px' }}
                shape="circle"
                icon={<LogoutOutlined />}
              ></Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
