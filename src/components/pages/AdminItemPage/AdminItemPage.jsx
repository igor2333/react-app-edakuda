import React, { useEffect, useState, useRef } from 'react'
import './AdminItemPage.css'
import { useParams } from 'react-router-dom'
import {
  apiGetSinglePizza,
  uploadFile,
  apiUpdatePizza,
  apiCreatePizza,
  apiDeletePizza,
} from '../../../api'
import { AdminHeader } from '../../AdminHeader/AdminHeader'
import { Input, Modal, notification } from 'antd'
import { Footer } from '../../Footer/Footer'
import { getErrors, getImage } from './utils'
import { useNavigate } from 'react-router-dom'

export const AdminItemPage = () => {
  const params = useParams()

  const [inputValues, setInputValues] = useState({
    name: '',
    country: '',
    conditions: '',
    documents: '',
    composition: '',
    image: '',
    recommendations: '',
    manufacturer: '',
    smallSize: '',
    smallSizePrice: '',
    mediumSize: '',
    mediumSizePrice: '',
    largeSize: '',
    largeSizePrice: '',
  })
  const [inputErrors, setInputErrors] = useState({
    name: '',
    country: '',
    conditions: '',
    documents: '',
    composition: '',
    image: '',
    recommendations: '',
    manufacturer: '',
    smallSize: '',
    smallSizePrice: '',
    mediumSize: '',
    mediumSizePrice: '',
    largeSize: '',
    largeSizePrice: '',
  })
  const inputRefs = {
    name: useRef(),
    country: useRef(),
    conditions: useRef(),
    documents: useRef(),
    composition: useRef(),
    image: useRef(),
    recommendations: useRef(),
    manufacturer: useRef(),
    smallSize: useRef(),
    smallSizePrice: useRef(),
    mediumSize: useRef(),
    mediumSizePrice: useRef(),
    largeSize: useRef(),
    largeSizePrice: useRef(),
  }

  const showFile = async (event) => {
    const files = event.currentTarget.files

    if (files === null || !files.length) {
      return
    }

    const file = files[0]

    if (file.size === 0 || !file.type.startsWith('image/')) {
      setInputErrors({
        ...inputErrors,
        image: 'Добавьте изображение пиццы',
      })
      return
    } else {
      setInputErrors({
        ...inputErrors,
        image: '',
      })
    }

    const image = await getImage(file)

    if (image.width < 200 || image.height < 200) {
      setInputErrors({
        ...inputErrors,
        image: 'Изображение не должно быть меньше 200*200px шириной и высотой',
      })

      return
    }

    try {
      const url = await uploadFile(file)

      setInputValues({
        ...inputValues,
        image: url,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  const onChangeInput = (event) => {
    const input = event.currentTarget
    const name = input.name
    const value = input.value

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const navigate = useNavigate()

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Удалить пиццу?',
      content: 'Отменить удаление будет невозможно',
      cancelText: 'Отмена',
      okText: 'Удалить',
      onOk() {
        apiDeletePizza(params.pizzaId).then(() => {
          navigate('/admin/pizza')
        })
        notification.success({
          message: 'Пицца успешно удалена',
        })
      },
    })
  }

  useEffect(() => {
    if (!params.pizzaId) {
      return
    }

    ;(async () => {
      const data = await apiGetSinglePizza(params.pizzaId)

      setInputValues(data)
    })()
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

    if (params.pizzaId) {
      apiUpdatePizza(params.pizzaId, inputValues).then(() => {
        notification.success({
          message: 'Пицца успешно обновлена',
        })
        navigate('/admin/pizza')
      })
    } else {
      apiCreatePizza(inputValues).then(() => {
        notification.success({
          message: 'Пицца успешно создана',
        })
        navigate('/admin/pizza')
      })
    }
  }

  return (
    <React.Fragment>
      <AdminHeader />
      <div className="admin-item-page">
        <form className="admin-item-page__form" noValidate onSubmit={onSubmit}>
          <label>
            Название пиццы:
            <Input
              onChange={onChangeInput}
              name="name"
              value={inputValues['name']}
              ref={inputRefs['name']}
              placeholder="Название пиццы..."
            />
          </label>
          <span className="error">{inputErrors['name']}</span>
          <label>
            Страна:
            <Input
              onChange={onChangeInput}
              name="country"
              value={inputValues['country']}
              ref={inputRefs['country']}
              placeholder="Страна..."
            />
          </label>
          <span className="error">{inputErrors['country']}</span>
          <label>
            Нормативные документы:
            <Input
              onChange={onChangeInput}
              name="documents"
              value={inputValues['documents']}
              ref={inputRefs['documents']}
              placeholder="Нормативные документы..."
            />
          </label>
          <span className="error">{inputErrors['documents']}</span>
          <label>
            Состав пиццы:
            <Input
              onChange={onChangeInput}
              name="composition"
              value={inputValues['composition']}
              ref={inputRefs['composition']}
              placeholder="Состав пиццы..."
            />
          </label>
          <span className="error">{inputErrors['composition']}</span>
          <label>
            Условия хранения пиццы:
            <Input
              onChange={onChangeInput}
              name="conditions"
              value={inputValues['conditions']}
              ref={inputRefs['conditions']}
              placeholder="Условия хранения пиццы..."
            />
          </label>
          <span className="error">{inputErrors['conditions']}</span>
          <label>
            Производитель пиццы:
            <Input
              onChange={onChangeInput}
              name="manufacturer"
              value={inputValues['manufacturer']}
              ref={inputRefs['manufacturer']}
              placeholder="Производитель пиццы..."
            />
          </label>
          <span className="error">{inputErrors['manufacturer']}</span>
          <div className="admin-item-page__form-sizes">
            <h3>Размеры и цена:</h3>
            <div>
              <label>
                Вес маленького размера:
                <Input
                  onChange={onChangeInput}
                  name="smallSize"
                  value={inputValues['smallSize']}
                  ref={inputRefs['smallSize']}
                />
              </label>
              <span className="error">{inputErrors['smallSize']}</span>
              <label>
                Цена за маленький размер:
                <Input
                  onChange={onChangeInput}
                  name="smallSizePrice"
                  value={inputValues['smallSizePrice']}
                  ref={inputRefs['smallSizePrice']}
                />
              </label>
              <span className="error">{inputErrors['smallSizePrice']}</span>
            </div>
            <div>
              <label>
                Вес среднего размера:
                <Input
                  onChange={onChangeInput}
                  name="mediumSize"
                  value={inputValues['mediumSize']}
                  ref={inputRefs['mediumSize']}
                />
              </label>
              <span className="error">{inputErrors['mediumSize']}</span>
              <label>
                Цена за средний размер:
                <Input
                  onChange={onChangeInput}
                  name="mediumSizePrice"
                  value={inputValues['mediumSizePrice']}
                  ref={inputRefs['mediumSizePrice']}
                />
              </label>
              <span className="error">{inputErrors['mediumSizePrice']}</span>
            </div>
            <div>
              <label>
                Вес большого размера:
                <Input
                  onChange={onChangeInput}
                  name="largeSize"
                  value={inputValues['largeSize']}
                  ref={inputRefs['largeSize']}
                />
              </label>
              <span className="error">{inputErrors['largeSize']}</span>
              <label>
                Цена за большой размер:
                <Input
                  onChange={onChangeInput}
                  name="largeSizePrice"
                  value={inputValues['largeSizePrice']}
                  ref={inputRefs['largeSizePrice']}
                />
              </label>
              <span className="error">{inputErrors['largeSizePrice']}</span>
            </div>
          </div>
          <label>
            Рекомендации к пицце:
            <Input
              onChange={onChangeInput}
              name="recommendations"
              value={inputValues['recommendations']}
              ref={inputRefs['recommendations']}
              placeholder="Рекомендации к пицце..."
            />
          </label>
          <span className="error">{inputErrors['recommendations']}</span>
          {Boolean(inputValues.image.length) && (
            <img
              className="admit-item-page__image"
              src={inputValues['image']}
              alt="Пицца"
            />
          )}
          <label>
            Изображение пиццы:
            <Input
              style={{ cursor: 'pointer' }}
              onChange={showFile}
              name="image"
              ref={inputRefs['image']}
              type="file"
            />
          </label>
          <span className="error">{inputErrors['image']}</span>
          <div className="admin-item-page__buttons">
            <button type="submit" className="admin-item-page__button">
              {params.pizzaId ? 'Обновить пиццу' : 'Создать новую пиццу'}
            </button>
            {!params.pizzaId ? null : (
              <button
                type="button"
                onClick={showDeleteConfirm}
                className="admin-item-page__button"
                style={{ background: 'red', marginLeft: '20px' }}
              >
                Удалить пиццу
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  )
}
