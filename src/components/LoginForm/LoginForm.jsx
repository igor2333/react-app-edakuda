import React from 'react'
import './LoginForm.css'
import { Input } from 'antd'
import { Header } from '../Header/Header'
import { GoogleOutlined } from '@ant-design/icons'
import { Footer } from '../Footer/Footer'
import {
  ALLOWED_OAUTH_PROVIDERS,
  useAuth,
} from '../../features/auth/AuthContextProvider'
import { useNavigate } from 'react-router-dom'

export const LoginForm = ({ email, password, onSubmit }) => {
  const navigate = useNavigate()

  const { loginWithPopup } = useAuth()

  const onOauthClick = (e) => {
    e.preventDefault()
    const dataset = e.target?.closest(
      '.login-form__buttons-container__item'
    )?.dataset

    if (dataset?.providerid) {
      loginWithPopup(dataset.providerid)
        .then(() => {
          navigate('/admin/pizza')
        })
        .catch((e) => {
          throw new Error(e)
        })
    }
  }

  return (
    <React.Fragment>
      <Header />
      <div className="login">
        <h1>Войти на ЕдаКуда.бай</h1>
        <form className="login-form" onSubmit={onSubmit} method="POST">
          <label>
            <span>Электронная почта:</span>
            <Input
              value={email.value}
              onChange={email.onChange}
              name={email.name}
              type="email"
            />
          </label>
          <label>
            <span>Пароль:</span>
            <Input
              value={password.value}
              onChange={password.onChange}
              name={password.name}
              type="password"
            />
          </label>
          <div className="login-form__buttons-container">
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              href="#"
              className="login-form__buttons-container__item"
              onClick={onOauthClick}
              data-providerid="google.com"
            >
              <GoogleOutlined style={{ color: '#64ab3d', fontSize: '50px' }} />
              <span></span>
            </a>
            <button className="login-form__button">Войти</button>
          </div>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  )
}
