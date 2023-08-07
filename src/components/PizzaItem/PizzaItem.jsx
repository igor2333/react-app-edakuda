import React, { useState } from 'react'
import './PizzaItem.css'
import { Radio, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

export const PizzaItem = ({
  image,
  name,
  sizesPerPrices,
  composition,
  manufacturer,
  country,
  conditions,
  documents,
  recommendations,
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

  return (
    <div className="pizza-item">
      <img className="pizza-item__image" src={`${image}`} alt="pizza preview" />
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
        <span>{country}</span>
      </div>
      <div className="pizza-item__price">
        <Button shape="round">
          <span>{sizeValue}</span>
          <PlusCircleOutlined />
        </Button>
      </div>
    </div>
  )
}
