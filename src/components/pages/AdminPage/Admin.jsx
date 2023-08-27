import React, { useEffect, useState } from 'react'
import './Admin.css'
import { apiGetAll } from '../../../api'
import { AdminItem } from '../../AdminItem/AdminItem'
import { Space, Button } from 'antd'
import { AdminHeader } from '../../AdminHeader/AdminHeader'
import { Footer } from '../../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { PageLoader } from '../../PageLoader/PageLoader'
import { BackArrow } from '../../BackArrow/BackArrow'

export const Admin = () => {
  const [pizzaData, setPizzaData] = useState(null)
  const [loading, setLoading] = useState(true)
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

  return (
    <React.Fragment>
      <AdminHeader />
      <div className="admin-main">
        <div className="admin-main__pizza-list">
          <h1>Вся пицца:</h1>
          <Button
            onClick={() => navigate('/admin/pizza/create')}
            style={{ display: 'block', marginTop: '10px' }}
          >
            Создать новую пиццу
          </Button>
          <Space wrap="true" style={{ marginTop: '50px' }}>
            {loading ? (
              <PageLoader />
            ) : (
              pizzaData.map((pizza) => {
                return (
                  <AdminItem
                    isAvailable={pizza.isAvailable}
                    key={pizza.id}
                    image={pizza.image}
                    name={pizza.name}
                    id={pizza.id}
                  />
                )
              })
            )}
          </Space>
        </div>
      </div>
      <BackArrow />
      <Footer />
    </React.Fragment>
  )
}
