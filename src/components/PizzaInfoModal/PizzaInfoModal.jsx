import React, { useState } from 'react'
import { Modal, Radio, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import './PizzaInfoModal.css'
import uniqueid from 'uniqid'
import { apiUpdate } from '../../api'
import { useAuth } from '../../features/auth/ContextProvider'
import { useAdaptive } from '../../hooks'

export const PizzaInfoModal = ({
  image,
  name,
  composition,
  conditions,
  showModal,
  onCancel,
  smallPrice,
  mediumPrice,
  largePrice,
}) => {
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

  const [price, setPrice] = useState(sizesOptions[0].value)

  const { isMobile } = useAdaptive()

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

  const { user, cart, setCart } = useAuth()

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
                  size={isMobile ? 'small' : 'medium'}
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
