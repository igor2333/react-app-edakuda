import React from 'react'
import { useAuth } from '../ContextProvider'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Header } from '../../../components/Header/Header'
import { Footer } from '../../../components/Footer/Footer'
import { apiCreate } from '../../../api'
import { getDoc, doc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { NavLink } from 'react-router-dom'
import './RegistrationContainer.css'

export const RegistrationContainer = () => {
  const { createWithEmailAndPassword } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {},
  })

  const submit = async (data) => {
    const dataBase = getFirestore()
    const querySnapshot = await getDoc(doc(dataBase, 'users', data.email))

    const userData = {
      email: data.email,
      password: data.password,
      cart: [],
    }

    if (querySnapshot.exists()) {
      notification.error({
        message: 'Аккаунт с такой же почтой уже существует',
      })
    } else {
      createWithEmailAndPassword(data.email, data.password)
        .then(() => {
          apiCreate(userData, 'users', data.email)
          navigate('/admin/pizza')
        })
        .catch((error) => {
          notification.error({
            message: error.message,
          })
        })
    }
  }

  return (
    <React.Fragment>
      <Header />
      <div className="registration">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit(submit)} className="registration-form">
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
          <div className="registration-form__buttons-container">
            <button className="form__button">Создать новый аккаунт</button>
          </div>
          <NavLink
            style={{
              float: 'right',
              textDecoration: 'underline',
              fontFamily: 'var(--font-oswald)',
              fontSize: '20px',
              marginTop: '10px',
            }}
            to="/login"
          >
            Войти
          </NavLink>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  )
}
