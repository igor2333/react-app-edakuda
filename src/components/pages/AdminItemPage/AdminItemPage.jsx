import React, { useEffect, useState } from 'react'
import './AdminItemPage.css'
import { useParams } from 'react-router-dom'
import {
  apiGetSingle,
  uploadFile,
  apiUpdate,
  apiCreate,
  apiDelete,
} from '../../../api'
import { AdminHeader } from '../../AdminHeader/AdminHeader'
import { Modal, notification, Switch } from 'antd'
import { Footer } from '../../Footer/Footer'
import { getImage } from './utils'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import uniqueid from 'uniqid'
import { PageLoader } from '../../PageLoader/PageLoader'

export const AdminItemPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [imageUrl, setImageUrl] = useState('')
  const [imageInputError, setImageInputError] = useState(null)
  const [loading, setLoading] = useState(true)

  const {
    register,
    getValues,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {},
  })

  const [inputValues, setInputValues] = useState({})
  const [isAvailable, setIsAvailable] = useState(true)

  const submit = (data) => {
    if (imageInputError !== '') {
      return
    }
    const id = uniqueid()

    data.image = imageUrl
    data.id = params.pizzaId ? params.pizzaId : id
    data.isAvailable = isAvailable

    setInputValues(data)

    if (params.pizzaId) {
      apiUpdate(params.pizzaId, data, 'pizza').then(() => {
        notification.success({
          message: 'Пицца успешно обновлена',
        })
        navigate('/admin/pizza')
      })
    } else {
      apiCreate(data, 'pizza', id).then(() => {
        notification.success({
          message: 'Пицца успешно создана',
        })
        navigate('/admin/pizza')
      })
    }
  }

  const showImage = async (event) => {
    const files = event.currentTarget.files

    if (files === null || !files.length) {
      return
    }

    const file = files[0]

    if (file.size === 0 || !file.type.startsWith('image/')) {
      setImageInputError('Файл должен быть изображением')
      return
    }

    const image = await getImage(file)

    if (image.width < 200 || image.height < 200) {
      setImageInputError('Изображение должно быть 200*200 пикселей')
      return
    } else {
      setImageInputError('')
    }

    const url = await uploadFile(file)
    setImageUrl(url)
  }

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Удалить пиццу?',
      content: 'Отменить удаление будет невозможно',
      cancelText: 'Отмена',
      okText: 'Удалить',
      onOk() {
        apiDelete(params.pizzaId, 'pizza').then(() => {
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
      setLoading(false)
      return
    }

    apiGetSingle(params.pizzaId, 'pizza')
      .then((data) => {
        console.log(data)
        setIsAvailable(data.isAvailable)
        setInputValues(data)
        reset(data)
        setImageUrl(data.image)
        setImageInputError('')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [params.pizzaId])

  const onChangeSwitch = (checked) => {
    const data = {
      ...inputValues,
      isAvailable: true,
    }

    if (checked) {
      setIsAvailable(true)
      apiUpdate(params.pizzaId, data, 'pizza')
    } else {
      setIsAvailable(false)
      apiUpdate(params.pizzaId, { ...data, isAvailable: false }, 'pizza')
    }
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      <AdminHeader />
      <div className="admin-item-page">
        <form
          className="admin-item-page__form"
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <label>
            Название пиццы:
            <input
              {...register('name', { required: true })}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </label>
          {errors.name?.type === 'required' && (
            <p className="error" role="alert">
              Введите название пиццы
            </p>
          )}
          <label>
            Состав пиццы:
            <input
              {...register('composition', { required: true })}
              aria-invalid={errors.composition ? 'true' : 'false'}
            />
          </label>
          {errors.composition?.type === 'required' && (
            <p className="error" role="alert">
              Введите состав пиццы
            </p>
          )}
          <label>
            Условия хранения пиццы:
            <input
              {...register('conditions', { required: true })}
              aria-invalid={errors.conditions ? 'true' : 'false'}
            />
          </label>
          {errors.conditions?.type === 'required' && (
            <p className="error" role="alert">
              Введите условия хранения пиццы
            </p>
          )}
          <div className="admin-item-page__form-sizes">
            <h3>Размеры и цена:</h3>
            <div>
              <label>
                Цена за маленький размер:
                <input
                  type="number"
                  {...register('smallPrice', { required: true })}
                  aria-invalid={errors.smallSizePrice ? 'true' : 'false'}
                />
              </label>
              {errors.smallPrice?.type === 'required' && (
                <p className="error" role="alert">
                  Введите цену маленького размера
                </p>
              )}
            </div>
            <div>
              <label>
                Цена за средний размер:
                <input
                  type="number"
                  {...register('mediumPrice', { required: true })}
                  aria-invalid={errors.mediumSize ? 'true' : 'false'}
                />
              </label>
              {errors.mediumPrice?.type === 'required' && (
                <p className="error" role="alert">
                  Введите цену среднего размера
                </p>
              )}
            </div>
            <div>
              <label>
                Цена за большой размер:
                <input
                  type="number"
                  {...register('largePrice', { required: true })}
                  aria-invalid={errors.largeSize ? 'true' : 'false'}
                />
              </label>
              {errors.largePrice?.type === 'required' && (
                <p className="error" role="alert">
                  Введите цену большого размера
                </p>
              )}
            </div>
          </div>
          {Boolean(imageUrl) && (
            <img
              className="admit-item-page__image"
              src={imageUrl}
              alt="Пицца"
            />
          )}
          <label>
            Изображение:
            <input onChange={showImage} type="file" />
          </label>
          <p className="error" role="alert">
            {imageInputError}
          </p>
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
      <Footer />
    </React.Fragment>
  )
}
