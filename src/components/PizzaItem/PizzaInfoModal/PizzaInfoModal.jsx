import React, { useState } from 'react'
import { Modal, Radio, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import './PizzaInfoModal.css'
import { PizzaOrderModal } from '../PizzaOrderModal/PizzaOrderModal'

export const PizzaInfoModal = ({
  image,
  name,
  sizesPerPrices,
  composition,
  manufacturer,
  country,
  conditions,
  documents,
  recommendations,
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
      label: smallSize,
      value: smallSizePrice,
    },
    {
      label: mediumSize,
      value: mediumSizePrice,
    },
    {
      label: largeSize,
      value: largeSizePrice,
    },
  ]

  const [sizeValue, setSizeValue] = useState(sizesOptions[0].value)
  const [isModalOrderShown, setIsModalOrderShown] = useState(false)
  const showOrderModal = () => {
    setIsModalOrderShown(true)
  }

  const getSize = (collection) => {
    const filter = collection.filter((obj) => {
      return obj.value === sizeValue
    })

    return filter[0].label
  }

  const handleChangeValue = ({ target: { value } }) => {
    setSizeValue(value)
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
                  style={{ marginBottom: '15px' }}
                  options={sizesOptions}
                  optionType="button"
                  buttonStyle="solid"
                  value={sizeValue}
                  onChange={handleChangeValue}
                />
                <div className="info-block">
                  <span className="info-block__heading">Состав:</span>
                  <span className="info-block__content">{composition}</span>
                </div>
                <div className="info-block">
                  <span className="info-block__heading">Производитель:</span>
                  <span className="info-block__content">{manufacturer}</span>
                </div>
                <div className="info-block">
                  <span className="info-block__heading">
                    Страна производства:
                  </span>
                  <span className="info-block__content">{country}</span>
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
                  <span className="info-block__content">{documents}</span>
                </div>
                <div className="info-block">
                  <span className="info-block__heading">Рекомендации:</span>
                  <span className="info-block__content">{recommendations}</span>
                </div>
              </div>
              <Button
                onClick={() => {
                  showOrderModal()
                  onCancel()
                }}
                style={{ marginTop: '15px', float: 'right' }}
                shape="round"
              >
                <span>{sizeValue}</span>
                <PlusCircleOutlined />
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <PizzaOrderModal
        showModal={isModalOrderShown}
        onCancel={() => setIsModalOrderShown(false)}
        pizzaPrice={sizeValue}
        pizzaSize={getSize(sizesOptions)}
        name={name}
      />
    </React.Fragment>
  )
}
