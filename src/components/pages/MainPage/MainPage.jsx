import React from 'react'
import './MainPage.css'
import { Header } from '../../Header/Header'
import { Footer } from '../../Footer/Footer'
import {
  CarOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

export const MainPage = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="main-page">
        <div className="main-page__info-container">
          <div className="main-page__logo-container">
            <img
              className="main-page__logo"
              src={require('../../../images/logo.png')}
              alt="logo"
            />
            <div className="main-page__logo-text-container">
              <span className="main-page__logo-text-primary">ЕдаКуда.бел</span>
              <span className="main-page__logo-text-secondary">
                Вкусные посылки
              </span>
            </div>
          </div>
          <div className="main-page__info-blocks">
            <div>
              <CarOutlined style={{ fontSize: '40px' }} />
              <span>Условия доставки</span>
            </div>
            <div>
              <PhoneOutlined style={{ fontSize: '40px' }} />
              <span>
                Быстрый заказ <br />
                <a href="tel:+375 44 556-10-10 ">
                  <span className="color-green">+375 44 556-10-10</span>
                </a>
              </span>
            </div>
            <div>
              <ClockCircleOutlined style={{ fontSize: '40px' }} />
              <span>
                Каждый день <br /> с <span className="color-green">10:00</span>{' '}
                до <span className="color-green">22:00</span>
              </span>
            </div>
            <div>
              <ShoppingCartOutlined style={{ fontSize: '40px' }} />
              <span>
                В корзине <br /> <span className="color-green">0</span> товаров
              </span>
            </div>
          </div>
        </div>
        <div className="main-page__hero-container">
          <div className="main-page__hero">
            <img
              className="main-page__pizza-icon"
              src={require('../../../images/pizza-piece-icon.png')}
              alt="pizza icon"
            />
            <span className="main-page__hero-text">
              Заказывайте пиццу прямо сейчас !
            </span>
            <NavLink to="/pizza" className="main-page__hero-button">
              Выбери пиццу!
            </NavLink>
          </div>
        </div>
        <div className="main-page__assortment-container">
          <NavLink to="/pizza" className="main-page__assortment-item">
            <img src={require('../../../images/pizzas.png')} alt="pizzas" />
            <div className="main-page__assortment-item-text-container">
              <span className="main-page__assortment-item-text-primary">
                Пицца
              </span>
              <span className="main-page__assortment-item-text-secondary">
                Лучшие ингридиенты, лучшая пицца!
              </span>
            </div>
          </NavLink>
          <NavLink to="/cakes" className="main-page__assortment-item">
            <img src={require('../../../images/cake.png')} alt="pizzas" />
            <div className="main-page__assortment-item-text-container">
              <span className="main-page__assortment-item-text-primary">
                Торт на заказ
              </span>
              <span className="main-page__assortment-item-text-secondary">
                Воспользуйтесь нашим конструктором тортов. Выберите наилучшее
                сочетание и оформите заказ
              </span>
            </div>
          </NavLink>
          <NavLink to="/rolls" className="main-page__assortment-item">
            <img src={require('../../../images/rolls.png')} alt="pizzas" />
            <div className="main-page__assortment-item-text-container">
              <span className="main-page__assortment-item-text-primary">
                Суши и роллы
              </span>
              <span className="main-page__assortment-item-text-secondary">
                Мы долго работали над тем, чтобы каждый ролл был идеальным по
                вкусу
              </span>
            </div>
          </NavLink>
          <div className="main-page__line"></div>
          <NavLink to="/" className="main-page__assortment-item">
            <img src={require('../../../images/bakery.png')} alt="pizzas" />
            <div className="main-page__assortment-item-text-container">
              <span className="main-page__assortment-item-text-primary">
                Свежая выпечка
              </span>
              <span className="main-page__assortment-item-text-secondary">
                Восхитительные лакомства, делают наш дом по-настоящему уютным.
              </span>
            </div>
          </NavLink>
          <NavLink to="/" className="main-page__assortment-item">
            <img src={require('../../../images/hamburger.png')} alt="pizzas" />
            <div className="main-page__assortment-item-text-container">
              <span className="main-page__assortment-item-text-primary">
                Быстрый перекус
              </span>
              <span className="main-page__assortment-item-text-secondary">
                Стритфуд с доставкой в Жлобине. Бургеры, хотдоги, картошечка
                фри, наггетсы
              </span>
            </div>
          </NavLink>
          <NavLink to="/" className="main-page__assortment-item">
            <img src={require('../../../images/rolls.png')} alt="pizzas" />
            <div className="main-page__assortment-item-text-container">
              <span className="main-page__assortment-item-text-primary">
                Кулинария
              </span>
              <span className="main-page__assortment-item-text-secondary">
                Собери свой обед сам! Огромный выбор готовых котлет, гарниров и
                салатов с доставкой.
              </span>
            </div>
          </NavLink>
          <div className="main-page__line"></div>
        </div>
        <div className="main-page__cakes-order-container">
          <NavLink to="/cakes">
            Заказать <br /> эксклюзивный торт!
          </NavLink>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}
