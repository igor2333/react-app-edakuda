import React, { useState } from 'react'
import './PizzaItem.css'
import { Radio, Button, notification, Modal } from 'antd'
import { PlusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { PizzaInfoModal } from '../PizzaInfoModal/PizzaInfoModal'
import { apiUpdate } from '../../api'
import { useAuth } from '../../features/auth/ContextProvider'
import uniqueid from 'uniqid'
import { useAdaptive } from '../../hooks'
import { useNavigate } from 'react-router-dom'

export const PizzaItem = ({
  image,
  name,
  composition,
  conditions,
  smallPrice,
  mediumPrice,
  largePrice,
}) => {
  const { isMobile } = useAdaptive()

  const sizesOptions = [
    {
      label: `24см`,
      value: smallPrice,
    },
    {
      label: `32см`,
      value: mediumPrice,
    },
    {
      label: `42см`,
      value: largePrice,
    },
  ]

  const { user, cart, setCart, isAuthenticated } = useAuth()
  const [isModalInfoShown, setIsModalInfoShown] = useState(false)
  const [isErrorModalShown, setIsErrorModalShown] = useState(false)
  const [price, setPrice] = useState(sizesOptions[0].value)

  const navigate = useNavigate()

  const handleChangeValue = ({ target: { value } }) => {
    setPrice(value)
  }

  const getSize = (collection) => {
    const filtered = collection.filter((obj) => {
      return obj.value === price
    })

    return filtered[0].label
  }

  const size = getSize(sizesOptions)

  const onAddClick = () => {
    const id = uniqueid()

    const data = {
      cart: [
        ...cart,
        {
          pizzaName: name,
          pizzaSize: size,
          pizzaPrice: price,
          pizzaImage: image,
          id: id,
        },
      ],
    }

    setCart([
      ...cart,
      {
        pizzaName: name,
        pizzaSize: size,
        pizzaPrice: price,
        pizzaImage: image,
        id: id,
      },
    ])

    apiUpdate(user.email, data, 'users').then(() => {
      notification.success({
        description: 'Пицца добавлена в корзину',
        placement: 'top',
        duration: 1,
      })
    })
  }

  const handleInfoModalCancel = () => setIsModalInfoShown(false)
  const handleErrorModalCancel = () => setIsErrorModalShown(false)

  return (
    <React.Fragment>
      <div className="pizza-item">
        <div className="pizza-item__img-container">
          <img
            className="pizza-item__image"
            onClick={() => setIsModalInfoShown(true)}
            src={`${image}`}
            alt="pizza preview"
          />
        </div>
        <span className="pizza-item__name">{name}</span>
        <Radio.Group
          options={sizesOptions}
          optionType="button"
          size={isMobile ? 'small' : 'medium'}
          buttonStyle="solid"
          value={price}
          onChange={handleChangeValue}
        />
        <div className="pizza-item__location">
          <span>Новый континент</span>
          <span>Беларусь</span>
        </div>
        <div className="pizza-item__price">
          <Button
            onClick={() => setIsModalInfoShown(true)}
            style={{ marginRight: '10px' }}
            shape="round"
          >
            <InfoCircleOutlined />
          </Button>
          <Button
            onClick={() => {
              isAuthenticated ? onAddClick() : setIsErrorModalShown(true)
            }}
            shape="round"
          >
            <span>{price}р.</span>
            <PlusCircleOutlined />
          </Button>
        </div>
      </div>
      <Modal
        title="Корзина доступна после авторизации"
        open={isErrorModalShown}
        onCancel={handleErrorModalCancel}
        footer={[]}
      >
        <button className="form-button " onClick={() => navigate('/login')}>
          Авторизоваться
        </button>
      </Modal>
      <PizzaInfoModal
        composition={composition}
        conditions={conditions}
        name={name}
        image={image}
        smallPrice={smallPrice}
        mediumPrice={mediumPrice}
        largePrice={largePrice}
        showModal={isModalInfoShown}
        onCancel={handleInfoModalCancel}
      />
    </React.Fragment>
  )
}
