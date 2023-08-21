import React, { useState } from 'react'
import './PizzaItem.css'
import { Radio, Button, notification } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { PizzaInfoModal } from './PizzaInfoModal/PizzaInfoModal'
import { apiCreate } from '../../api'
import { useAuth } from '../../features/auth/AuthContextProvider'
import { useCart } from '../../store/CartContextProvider'
import uniqueid from 'uniqid'

export const PizzaItem = ({
  image,
  name,
  sizesPerPrices,
  composition,
  conditions,
  smallSize,
  smallSizePrice,
  mediumSize,
  mediumSizePrice,
  largeSize,
  largeSizePrice,
}) => {
  const sizesOptions = [
    {
      label: `${smallSize}г`,
      value: smallSizePrice,
    },
    {
      label: `${mediumSize}г`,
      value: mediumSizePrice,
    },
    {
      label: `${largeSize}г`,
      value: largeSizePrice,
    },
  ]

  const { user, cartCount, setCartCount } = useAuth()
  const { setCartProducts, cartProducts } = useCart()

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

  const size = Number(getSize(sizesOptions).slice(0, -1))

  const [isModalInfoShown, setIsModalInfoShown] = useState(false)

  const addToCart = () => {
    const id = uniqueid()

    const data = {
      productName: name,
      productSize: size,
      productPrice: price,
      productImage: image,
      user: user.email,
      id: id,
    }

    apiCreate(data, 'cart', id).then(() => {
      setCartProducts([...cartProducts, data])
      setCartCount(cartCount + 1)
      notification.success({
        message: 'Товар успешно добавлен в корзину',
        placement: 'bottomRight',
      })
    })
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
        smallSize={smallSize}
        smallSizePrice={smallSizePrice}
        mediumSize={mediumSize}
        mediumSizePrice={mediumSizePrice}
        largeSize={largeSize}
        largeSizePrice={largeSizePrice}
        conditions={conditions}
        name={name}
        sizesPerPrices={sizesPerPrices}
        image={image}
        showModal={isModalInfoShown}
        onCancel={handleInfoCancel}
      />
    </React.Fragment>
  )
}
