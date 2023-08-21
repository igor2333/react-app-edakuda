import React from 'react'
import './ProductsCartModal.css'
import { Modal, Button } from 'antd'
import { ProductsCartList } from '../ProductsCartList/ProductsCartList'
import { PizzaOrderModal } from '../PizzaOrderModal/PizzaOrderModal'

export const ProductsCartModal = ({ showModal, onCancel }) => {
  return (
    <Modal
      width={550}
      open={showModal}
      onCancel={onCancel}
      footer={[
        <Button onClick={onCancel}>Отмена</Button>,
        <Button type="primary">Заказать</Button>,
      ]}
    >
      <div className="products-cart-modal__content">
        <ProductsCartList />
      </div>
    </Modal>
  )
}
