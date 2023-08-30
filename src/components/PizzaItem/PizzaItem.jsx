import React, { useState } from 'react'
import './PizzaItem.css'
import { Radio, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { PizzaInfoModal } from '../PizzaInfoModal/PizzaInfoModal'
import { apiUpdate } from '../../api'
import { useAuth } from '../../features/auth/ContextProvider'
import uniqueid from 'uniqid'
import { useAdaptive } from '../../hooks'

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

  const { user, cart, setCart } = useAuth()

  const [price, setPrice] = useState(sizesOptions[0].value)

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

  const [isModalInfoShown, setIsModalInfoShown] = useState(false)

  const addToCart = () => {
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

    apiUpdate(user.email, data, 'users')
  }

  const handleInfoCancel = () => setIsModalInfoShown(false)

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
            onClick={() => {
              addToCart()
            }}
            shape="round"
          >
            <span>{price}р.</span>
            <PlusCircleOutlined />
          </Button>
        </div>
      </div>
      <PizzaInfoModal
        composition={composition}
        conditions={conditions}
        name={name}
        image={image}
        smallPrice={smallPrice}
        mediumPrice={mediumPrice}
        largePrice={largePrice}
        showModal={isModalInfoShown}
        onCancel={handleInfoCancel}
      />
    </React.Fragment>
  )
}
