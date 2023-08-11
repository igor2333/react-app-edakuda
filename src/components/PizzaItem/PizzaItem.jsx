import React, { useState } from 'react'
import './PizzaItem.css'
import { Radio, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import useSound from 'use-sound'
import cash_sound from '../../sounds/cash_sound.mp3'
import { PizzaOrderModal } from './PizzaOrderModal/PizzaOrderModal'
import { PizzaInfoModal } from './PizzaInfoModal/PizzaInfoModal'

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

  const handleChangeValue = ({ target: { value } }) => {
    setSizeValue(value)
  }

  const getSize = (collection) => {
    const filter = collection.filter((obj) => {
      return obj.value === sizeValue
    })

    return filter[0].label
  }

  const [playSound] = useSound(cash_sound, { volume: 0.15 })

  const [isModalInfoShown, setIsModalInfoShown] = useState(false)
  const [isModalOrderShown, setIsModalOrderShown] = useState(false)

  const showOrderModal = () => {
    setIsModalOrderShown(true)
    playSound()
  }
  const handleCancel = () => setIsModalOrderShown(false)
  const handleInfoCancel = () => setIsModalInfoShown(false)

  return (
    <React.Fragment>
      <div className="pizza-item">
        <img
          className="pizza-item__image"
          onClick={() => setIsModalInfoShown(true)}
          src={`${image}`}
          alt="pizza preview"
        />
        <span className="pizza-item__name">{name}</span>
        <Radio.Group
          options={sizesOptions}
          optionType="button"
          buttonStyle="solid"
          value={sizeValue}
          onChange={handleChangeValue}
        />
        <div className="pizza-item__location">
          <span>Новый континент</span>
          <span>Беларусь</span>
        </div>
        <div className="pizza-item__price">
          <Button onClick={showOrderModal} shape="round">
            <span>{sizeValue}</span>
            <PlusCircleOutlined />
          </Button>
        </div>
      </div>
      <PizzaOrderModal
        showModal={isModalOrderShown}
        onCancel={handleCancel}
        pizzaPrice={sizeValue}
        pizzaSize={getSize(sizesOptions)}
        name={name}
      />
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
