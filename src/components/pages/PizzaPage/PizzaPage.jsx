import React, { useEffect, useState } from 'react'
import './PizzaPage.css'
import { Header } from '../../Header/Header'
import { Footer } from '../../Footer/Footer'
import { PizzaItem } from '../../PizzaItem/PizzaItem'
import { apiGetPizza } from '../../../api'
import { Space, Button, Modal } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { PageLoader } from '../../PageLoader/PageLoader'
import { useAuth } from '../../../features/auth/AuthContextProvider'

export const PizzaPage = () => {
  const [pizzaData, setPizzaData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isAuthenticate } = useAuth()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    apiGetPizza()
      .then((pizza) => {
        setPizzaData(pizza)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <React.Fragment>
      <Header />
      <div className="pizza-page">
        <div>
          {isAuthenticate ? (
            <Button
              style={{ marginBottom: '50px' }}
              size="large"
              onClick={showModal}
            >
              <PlusCircleOutlined />
              Добавить, удалить или отредактировать пиццу
            </Button>
          ) : null}
        </div>
        <Space wrap="true" size="large">
          {loading ? (
            <PageLoader />
          ) : (
            pizzaData.map((pizza) => {
              return (
                <PizzaItem
                  key={pizza.id}
                  image={pizza.image}
                  name={pizza.name}
                  composition={pizza.composition}
                  smallSize={pizza.smallSize}
                  smallSizePrice={pizza.smallSizePrice}
                  mediumSize={pizza.mediumSize}
                  mediumSizePrice={pizza.mediumSizePrice}
                  largeSize={pizza.largeSize}
                  largeSizePrice={pizza.largeSizePrice}
                  manufacturer={pizza.manufacturer}
                  country={pizza.country}
                  conditions={pizza.conditions}
                  documents={pizza.documents}
                  recommendations={pizza.recommendations}
                />
              )
            })
          )}
        </Space>
      </div>
      <Footer />
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
