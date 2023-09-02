import React, { useEffect, useState, useRef } from 'react'
import './AdminItemPage.css'
import { useParams } from 'react-router-dom'
import {
  apiGetSingle,
  uploadFile,
  apiUpdate,
  apiCreate,
  apiDelete,
} from '../../../api'
import { Modal, notification, Switch } from 'antd'
import { getImage, getErrors } from './utils'
import { useNavigate } from 'react-router-dom'
import uniqueid from 'uniqid'
import { PageLoader } from '../../PageLoader/PageLoader'
import { Page } from '../../Page/Page'

export const AdminItemPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const inputRefs = {
    name: useRef(),
    composition: useRef(),
    conditions: useRef(),
    smallPrice: useRef(),
    mediumPrice: useRef(),
    largePrice: useRef(),
    image: useRef(),
  }

  const [inputValues, setInputValues] = useState({
    name: '',
    composition: '',
    conditions: '',
    smallPrice: '',
    mediumPrice: '',
    largePrice: '',
    image: '',
  })

  const [inputErrors, setInputErrors] = useState({
    name: '',
    composition: '',
    conditions: '',
    smallPrice: '',
    mediumPrice: '',
    largePrice: '',
    image: '',
  })

  const [isAvailable, setIsAvailable] = useState(true)

  const onChangeInput = (event) => {
    const input = event.currentTarget
    const name = input.name
    const value = input.value

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const showImage = async (event) => {
    const files = event.currentTarget.files

    if (files === null || !files.length) {
      return
    }

    const file = files[0]

    if (file.size === 0 || !file.type.startsWith('image/')) {
      setInputErrors({ ...inputErrors, image: 'Файл должен быть изображением' })
      return
    }

    const image = await getImage(file)

    if (image.width < 200 || image.height < 200) {
      setInputErrors({
        ...inputErrors,
        image: 'Изображение должно быть 200*200 пикселей',
      })
      return
    } else {
      setInputErrors('')
    }

    const url = await uploadFile(file)

    setInputValues({ ...inputValues, image: url })
  }

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Удалить пиццу?',
      content: 'Отменить удаление будет невозможно',
      cancelText: 'Отмена',
      okText: 'Удалить',
      onOk() {
        apiDelete(params.pizzaId, 'pizza').then(() => {
          navigate('/admin')
        })
        notification.success({
          message: 'Пицца успешно удалена',
        })
      },
    })
  }

  useEffect(() => {
    if (!params.pizzaId) {
      setLoading(false)
      return
    }

    apiGetSingle(params.pizzaId, 'pizza')
      .then((data) => {
        setIsAvailable(data.isAvailable)
        setInputValues(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [params.pizzaId])

  const onSubmit = async (event) => {
    event.preventDefault()

    const data = new FormData()

    Object.entries(inputValues).forEach(([name, value]) => {
      data.append(name, value)
    })

    const errors = await getErrors(Array.from(data.entries()))
    const errorsEntries = Object.entries(errors)

    setInputErrors(errors)

    const errorInput = errorsEntries.find(([, value]) => value.length > 0)

    if (errorInput) {
      const name = errorInput[0]
      const inputRef = inputRefs[name]

      if (inputRef.current) {
        inputRef.current.focus()
      }

      return
    }

    inputValues.isAvailable = isAvailable
    const id = uniqueid()

    if (params.pizzaId) {
      apiUpdate(params.pizzaId, inputValues, 'pizza').then(() => {
        notification.success({
          message: 'Пицца успешно обновлена',
        })
        navigate('/admin')
      })
    } else {
      apiCreate(inputValues, 'pizza', id).then(() => {
        notification.success({
          message: 'Пицца успешно создана',
        })
        navigate('/admin')
      })
    }
  }

  const onChangeSwitch = (checked) => {
    if (checked) {
      setIsAvailable(true)
      apiUpdate(params.pizzaId, { ...inputValues, isAvailable: true }, 'pizza')
    } else {
      setIsAvailable(false)
      apiUpdate(params.pizzaId, { ...inputValues, isAvailable: false }, 'pizza')
    }
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <Page>
      <div className="admin-item-page">
        <h1>Редактирование</h1>
        <form className="admin-item-page__form" noValidate onSubmit={onSubmit}>
          <label>
            Название пиццы:
            <input
              name="name"
              ref={inputRefs.name}
              value={inputValues.name}
              onChange={onChangeInput}
            />
          </label>
          <span className="error">{inputErrors.name}</span>
          <label>
            Состав пиццы:
            <input
              name="composition"
              ref={inputRefs.composition}
              value={inputValues.composition}
              onChange={onChangeInput}
            />
          </label>
          <span className="error">{inputErrors.composition}</span>
          <label>
            Условия хранения пиццы:
            <input
              name="conditions"
              ref={inputRefs.conditions}
              value={inputValues.conditions}
              onChange={onChangeInput}
            />
          </label>
          <span className="error">{inputErrors.conditions}</span>
          <div className="admin-item-page__form-sizes">
            <h3 style={{ marginTop: '20px' }}>Размеры и цена:</h3>
            <div>
              <label>
                Цена за маленький размер:
                <input
                  name="smallPrice"
                  ref={inputRefs.smallPrice}
                  type="number"
                  value={inputValues.smallPrice}
                  onChange={onChangeInput}
                />
              </label>
            </div>
            <span className="error">{inputErrors.smallPrice}</span>
            <div>
              <label>
                Цена за средний размер:
                <input
                  name="mediumPrice"
                  ref={inputRefs.mediumPrice}
                  type="number"
                  value={inputValues.mediumPrice}
                  onChange={onChangeInput}
                />
              </label>
            </div>
            <span className="error">{inputErrors.mediumPrice}</span>
            <div>
              <label>
                Цена за большой размер:
                <input
                  name="largePrice"
                  ref={inputRefs.largePrice}
                  type="number"
                  value={inputValues.largePrice}
                  onChange={onChangeInput}
                />
              </label>
            </div>
            <span className="error">{inputErrors.largePrice}</span>
          </div>
          {Boolean(inputValues.image) && (
            <img
              className="admit-item-page__image"
              src={inputValues.image}
              alt="Пицца"
            />
          )}
          <label>
            Изображение:
            <input
              name="image"
              ref={inputRefs.image}
              onChange={showImage}
              type="file"
            />
          </label>
          <span className="error">{inputErrors.image}</span>
          <div className="admin-item-page__buttons">
            <button type="submit" className="admin-item-page__button">
              {params.pizzaId ? 'Обновить пиццу' : 'Создать новую пиццу'}
            </button>
            {!params.pizzaId ? null : (
              <>
                <button
                  type="button"
                  onClick={showDeleteConfirm}
                  className="admin-item-page__button"
                  style={{ background: 'red' }}
                >
                  Удалить пиццу
                </button>
              </>
            )}
            <div className="admin-item-page__toggler">
              <span>Товар доступен в наличии:</span>
              <Switch
                defaultChecked={isAvailable ? true : false}
                onChange={onChangeSwitch}
                style={{ marginLeft: '10px' }}
              />
            </div>
          </div>
        </form>
      </div>
    </Page>
  )
}
