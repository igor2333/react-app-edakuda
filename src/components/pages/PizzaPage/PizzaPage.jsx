import React, { useEffect, useState } from 'react'
import './PizzaPage.css'
import { Header } from '../../Header/Header'
import { Footer } from '../../Footer/Footer'
import { PizzaItem } from '../../PizzaItem/PizzaItem'
import { apiGetAll } from '../../../api'
import { Space, Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PageLoader } from '../../PageLoader/PageLoader'
import { ProductsCartModal } from '../../ProductsCartModal/ProductsCartModal'
import { OpenCartButton } from '../../OpenCartButton/OpenCartButton'

export const PizzaPage = () => {
  const [pizzaData, setPizzaData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    apiGetAll('pizza')
      .then((pizza) => {
        setPizzaData(pizza)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const [showCartModal, setShowCartModal] = useState(false)

  const handleCartModalCancel = () => {
    setShowCartModal(false)
  }

  const filterByAvailable = loading
    ? []
    : pizzaData.filter((pizza) => {
        if (pizza.isAvailable === true) {
          return pizza
        }
      })

  return (
    <React.Fragment>
      <Header />
      <OpenCartButton onClick={() => setShowCartModal(true)} />
      <div className="pizza-page">
        <h1 style={{ marginBottom: '20px' }}>Вся пицца:</h1>
        <Space wrap="true" size="large">
          {loading ? (
            <PageLoader />
          ) : (
            filterByAvailable.map((pizza) => {
              return (
                <PizzaItem
                  key={pizza.id}
                  id={pizza.id}
                  image={pizza.image}
                  name={pizza.name}
                  composition={pizza.composition}
                  smallPrice={pizza.smallPrice}
                  mediumPrice={pizza.mediumPrice}
                  largePrice={pizza.largePrice}
                  conditions={pizza.conditions}
                />
              )
            })
          )}
        </Space>
      </div>
      <Footer />
      <ProductsCartModal
        showModal={showCartModal}
        onCancel={handleCartModalCancel}
      />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Остаться</Button>,
          <Button onClick={() => navigate('/admin/pizza')} type="primary">
            Перейти
          </Button>,
        ]}
      >
        <h2>Перейти в панель администратора?</h2>
      </Modal>
    </React.Fragment>
  )
}
