import React, { useState } from 'react'
import './PizzaOrderModal.css'
import { Radio, Modal, Form, notification } from 'antd'
import { apiCreate, apiUpdate } from '../../api'
import { EnvironmentOutlined } from '@ant-design/icons'
import uniqueid from 'uniqid'
import { useAuth } from '../../features/auth/ContextProvider'

export const PizzaOrderModal = ({ showModal, onCancel }) => {
  const orderOptions = ['Наличными', 'Карточкой', 'Заберу сам =)']
  const [checkedOrderOption, setCheckedOrderOption] = useState(orderOptions[2])

  const { cart, setCart, user } = useAuth()

  const totalPriceCalc = cart.reduce(
    (acc, current) => acc + Number(current.pizzaPrice),
    0
  )

  const totalPrice = Math.round(totalPriceCalc * 100) / 100

  const onChangeOrderOptions = ({ target: { value } }) => {
    setCheckedOrderOption(value)
  }

  const [form] = Form.useForm()

  const onFinish = () => {
    const formData = form.getFieldValue()
    delete formData['remember']

    const id = uniqueid()

    const data = {
      ...formData,
      userEmail: user.email,
      totalPrice: totalPrice,
      orderedPizza: cart,
      orderOption: checkedOrderOption,
      id: id,
    }

    apiCreate(data, 'orders', id).then(() => {
      apiUpdate(user.email, { cart: [] }, 'users')
        .then(() => {
          setCart([])
        })
        .then(() => {
          notification.success({
            description:
              'Спасибо за покупку! В течении 10 минут ожидайте звонка оператора.',
            placement: 'top',
          })
        })
      onCancel()
    })
  }

  const onSubmit = () => {
    form.submit()
  }

  return (
    <Modal
      open={showModal}
      onCancel={onCancel}
      footer={[
        <div className="submit-button_container">
          <button className="submit-button" onClick={onSubmit}>
            Все верно, давайте закажем
          </button>
        </div>,
      ]}
    >
      <div className="order-modal">
        <div className="order-modal__header">
          <EnvironmentOutlined
            style={{
              fontSize: '30px',
              color: '#1677FF',
            }}
          />
          <span className="order-modal__header-text">Доставка и оплата</span>
        </div>
        <div className="order-modal__order-options">
          <Radio.Group
            options={orderOptions}
            onChange={onChangeOrderOptions}
            value={checkedOrderOption}
          ></Radio.Group>
        </div>
        <Form
          form={form}
          style={{ marginTop: '50px' }}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          name="pizza_order"
        >
          <Form.Item
            label="Имя получателя"
            name="name"
            rules={[{ required: true, message: 'Введите имя получателя' }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Номер телефона"
            name="phoneNumber"
            rules={[{ required: true, message: 'Введите номер телефона' }]}
          >
            <input type="tel" />
          </Form.Item>
          <div
            style={
              checkedOrderOption === 'Заберу сам =)'
                ? { display: 'none' }
                : { display: 'block' }
            }
          >
            <Form.Item
              label="Адрес получателя"
              name="adress"
              rules={[
                {
                  required:
                    checkedOrderOption === 'Заберу сам =)' ? false : true,
                  message: 'Введите адрес',
                },
              ]}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Дом"
              name="house_number"
              rules={[
                {
                  required:
                    checkedOrderOption === 'Заберу сам =)' ? false : true,
                  message: 'Введите номер дома',
                },
              ]}
            >
              <input type="number" />
            </Form.Item>
            <Form.Item
              label="Квартира"
              name="apartment_number"
              rules={[{ required: false }]}
            >
              <input type="number" />
            </Form.Item>
            <Form.Item
              label="Подъезд"
              name="entrance_number"
              rules={[{ required: false }]}
            >
              <input type="number" />
            </Form.Item>
            <Form.Item
              label="Этаж"
              name="floor_number"
              rules={[{ required: false }]}
            >
              <input type="number" />
            </Form.Item>
            <Form.Item
              label="Домофон"
              name="interphone_number"
              rules={[{ required: false }]}
            >
              <input type="number" />
            </Form.Item>
          </div>
          <Form.Item
            label="Комментарий к адресу"
            name="comment"
            rules={[{ required: false }]}
          >
            <input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
