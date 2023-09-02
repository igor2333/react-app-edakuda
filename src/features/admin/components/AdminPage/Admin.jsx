import React, { useEffect, useState } from 'react'
import './Admin.css'
import { Page } from '../../Page/Page'
import { apiGetAll } from '../../../api'
import { AdminItem } from '../../AdminItem/AdminItem'
import { Space, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PageLoader } from '../../PageLoader/PageLoader'

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
    <Page>
      <div className="admin-main">
        <div className="admin-main__pizza-list">
          <h1>Панель администратора</h1>
          <Button
            onClick={() => navigate('/admin/create')}
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
    </Page>
  )
}
