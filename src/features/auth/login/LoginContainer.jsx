import React, { useReducer, useState } from 'react'
import { LoginForm } from '../../../components/LoginForm/LoginForm'
import { validateEmail } from './utils'
import { useAuth } from '../AuthContextProvider'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'

export const LoginContainer = () => {
  const { loginWithEmailAndPassword } = useAuth()
  const [authError, setAuthError] = useState('')

  const navigate = useNavigate()

  const reducer = (state, action) => {
    switch (action.type) {
      case 'change':
        return {
          ...state,
          value: action.value,
          error: false,
        }
      case 'error':
        return {
          ...state,
          error: true,
          helper: action.value,
        }

      default:
        break
    }
    return state
  }
  const [emailState, dispatchEmail] = useReducer(reducer, {
    name: 'email',
    value: '',
  })

  const [passwordState, dispatchPassword] = useReducer(reducer, {
    name: 'password',
    value: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    let isValid = true

    if (!validateEmail(emailState.value)) {
      isValid = false
      dispatchEmail({
        type: 'error',
        value: 'Введите корректный email',
      })
    }

    if (passwordState.value.length < 6) {
      isValid = false
      dispatchPassword({
        type: 'error',
        value: 'Длина пароля должна быть не меньше 6-ти символов',
      })
    }

    if (isValid) {
      loginWithEmailAndPassword(emailState.value, passwordState.value)
        .then(() => {
          navigate('/admin/pizza')
        })
        .catch((error) => {
          setAuthError(error.message)
        })
    }
  }

  return (
    <React.Fragment>
      {authError
        ? notification.error({
            message: authError,
          })
        : ''}
      <LoginForm
        email={{
          ...emailState,
          onChange: (e) =>
            dispatchEmail({ type: 'change', value: e.target.value }),
        }}
        password={{
          ...passwordState,
          onChange: (e) =>
            dispatchPassword({ type: 'change', value: e.target.value }),
        }}
        onSubmit={onSubmit}
      />
    </React.Fragment>
  )
}
