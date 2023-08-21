import React, { useState } from 'react'
import { Modal, Radio, Button, notification } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import './PizzaInfoModal.css'
import uniqueid from 'uniqid'
import { apiCreate } from '../../../api'
import { useAuth } from '../../../features/auth/AuthContextProvider'
import { useCart } from '../../../store/CartContextProvider'

export const PizzaInfoModal = ({
  image,
  name,
  composition,
  conditions,
  showModal,
  onCancel,
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

  console.log(size)

  const { user, cartCount, setCartCount } = useAuth()
  const { setCartProducts, cartProducts } = useCart()

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

  return (
    <React.Fragment>
      <div className="pizza-info">
        <Modal
          width={'650px'}
          onCancel={onCancel}
          open={showModal}
          footer={null}
        >
          <div className="info-modal">
            <div className="info-modal__image-container">
              <span className="info-modal__image-text">Пицца {name}</span>
              <img className="info-modal__image" src={`${image}`} alt="pizza" />
            </div>
            <div>
              <div className="info-modal__info">
                <Radio.Group
                  options={sizesOptions}
                  optionType="button"
                  buttonStyle="solid"
                  value={price}
                  onChange={handleChangeValue}
                />
                <div className="info-block">
                  <span className="info-block__heading">Состав:</span>
                  <span className="info-block__content">{composition}</span>
                </div>
                <div className="info-block">
                  <span className="info-block__heading">Производитель:</span>
                  <span className="info-block__content">
                    ЧТПУП "ЭкономМаркет"
                  </span>
                </div>
                <div className="info-block">
                  <span className="info-block__heading">
                    Страна производства:
                  </span>
                  <span className="info-block__content">Беларусь</span>
                </div>
                <div className="info-block">
                  <span className="info-block__heading">
                    Условия и сроки хранения:
                  </span>
                  <span className="info-block__content">{conditions}</span>
                </div>
                <div className="info-block">
                  <span className="info-block__heading">
                    Нормативные документы:
                  </span>
                  <span className="info-block__content">СТБ 1210-2010</span>
                </div>
                <div className="info-block">
                  <span className="info-block__heading">Рекомендации:</span>
                  <span className="info-block__content">
                    Продукт готов к употреблению
                  </span>
                </div>
              </div>
              <Button
                onClick={() => {
                  addToCart()
                  onCancel()
                }}
                style={{ marginTop: '15px', float: 'right' }}
                shape="round"
              >
                <span>{price}р.</span>
                <PlusCircleOutlined />
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}
