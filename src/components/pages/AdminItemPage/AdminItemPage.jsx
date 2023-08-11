import React, { useEffect, useState } from 'react'
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
import { Modal, notification } from 'antd'
import { Footer } from '../../Footer/Footer'
import { getImage } from './utils'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export const AdminItemPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [imageUrl, setImageUrl] = useState('')
  const [imageInputError, setImageInputError] = useState(null)

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {},
  })

  const submit = (data) => {
    if (imageInputError !== '') {
      return
    }

    data.image = imageUrl

    if (params.pizzaId) {
      apiUpdatePizza(params.pizzaId, data).then(() => {
        notification.success({
          message: 'Пицца успешно обновлена',
        })
        navigate('/admin/pizza')
      })
    } else {
      apiCreatePizza(data).then(() => {
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

    apiGetSinglePizza(params.pizzaId).then((data) => {
      reset(data)
      setImageUrl(data.image)
      setImageInputError('')
    })
  }, [params.pizzaId])

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
                Вес маленького размера:
                <input
                  {...register('smallSize', { required: true })}
                  aria-invalid={errors.smallSize ? 'true' : 'false'}
                />
              </label>
              {errors.smallSize?.type === 'required' && (
                <p className="error" role="alert">
                  Введите массу маленького размера
                </p>
              )}
              <label>
                Цена за маленький размер:
                <input
                  {...register('smallSizePrice', { required: true })}
                  aria-invalid={errors.smallSizePrice ? 'true' : 'false'}
                />
              </label>
              {errors.smallSizePrice?.type === 'required' && (
                <p className="error" role="alert">
                  Введите цену маленького размера
                </p>
              )}
            </div>
            <div>
              <label>
                Вес среднего размера:
                <input
                  {...register('mediumSize', { required: true })}
                  aria-invalid={errors.mediumSize ? 'true' : 'false'}
                />
              </label>
              {errors.mediumSize?.type === 'required' && (
                <p className="error" role="alert">
                  Введите массу среднего размера
                </p>
              )}
              <label>
                Цена за средний размер:
                <input
                  {...register('mediumSizePrice', { required: true })}
                  aria-invalid={errors.mediumSize ? 'true' : 'false'}
                />
              </label>
              {errors.mediumSizePrice?.type === 'required' && (
                <p className="error" role="alert">
                  Введите цену среднего размера
                </p>
              )}
            </div>
            <div>
              <label>
                Вес большого размера:
                <input
                  {...register('largeSize', { required: true })}
                  aria-invalid={errors.largeSize ? 'true' : 'false'}
                />
              </label>
              {errors.largeSize?.type === 'required' && (
                <p className="error" role="alert">
                  Введите массу большого размера
                </p>
              )}
              <label>
                Цена за большой размер:
                <input
                  {...register('largeSizePrice', { required: true })}
                  aria-invalid={errors.largeSize ? 'true' : 'false'}
                />
              </label>
              {errors.largeSizePrice?.type === 'required' && (
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
