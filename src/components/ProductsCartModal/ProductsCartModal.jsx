import React from 'react'
import './ProductsCartModal.css'
import { Modal } from 'antd'
import { ProductsCartList } from '../ProductsCartList/ProductsCartList'

export const ProductsCartModal = ({ showModal, onCancel }) => {
  return (
    <Modal width={550} open={showModal} onCancel={onCancel} footer={null}>
      <div className="products-cart-modal__content">
        <ProductsCartList />
      </div>
    </Modal>
  )
}
