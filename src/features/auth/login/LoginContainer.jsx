import React from 'react'
import { useAuth } from '../AuthContextProvider'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Header } from '../../../components/Header/Header'
import { Footer } from '../../../components/Footer/Footer'
import { GoogleOutlined } from '@ant-design/icons'
import './LoginContainer.css'

export const LoginContainer = () => {
  const { loginWithEmailAndPassword, loginWithPopup } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {},
  })

  const submit = (data) => {
    loginWithEmailAndPassword(data.email, data.password)
      .then(() => {
        navigate('/admin/pizza')
      })
      .catch((error) => {
        notification.error({
          message: error.message,
        })
      })
  }

  const onOauthClick = (event) => {
    event.preventDefault()
    const dataset = event.target?.closest(
      '.login-form__buttons-container__item'
    )?.dataset

    if (dataset?.providerid) {
      loginWithPopup(dataset.providerid)
        .then(() => {
          navigate('/admin/pizza')
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  return (
    <React.Fragment>
      <Header />
      <div className="login">
        <h1>Войти на ЕдаКуда.бай</h1>
        <form onSubmit={handleSubmit(submit)} className="login-form">
          <label>
            <span>Электронная почта:</span>
            <div style={{ width: '100%' }}>
              <input
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                })}
                aria-invalid={errors.name ? 'true' : 'false'}
                type="email"
              />
              {errors.email?.type === 'required' && (
                <p className="error" role="alert">
                  Введите почту
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="error" role="alert">
                  Введите корректную почту
                </p>
              )}
            </div>
          </label>
          <label>
            <span>Пароль:</span>
            <div style={{ width: '100%' }}>
              <input
                {...register('password', { required: true, minLength: 6 })}
                aria-invalid={errors.composition ? 'true' : 'false'}
                type="password"
              />
              {errors.password?.type === 'required' && (
                <p className="error" role="alert">
                  Введите пароль
                </p>
              )}
              {errors?.password?.type === 'minLength' && (
                <p className="error">Пароль должен быть не меньше 6 символов</p>
              )}
            </div>
          </label>
          <div className="login-form__buttons-container">
            <a
              href="#"
              className="login-form__buttons-container__item"
              data-providerid="google.com"
              onClick={onOauthClick}
            >
              <GoogleOutlined style={{ color: '#64ab3d', fontSize: '50px' }} />
            </a>
            <button className="login-form__button">Войти</button>
          </div>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  )
}
