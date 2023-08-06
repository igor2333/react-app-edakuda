import React from 'react'
import './Footer.css'
import {
  ShopOutlined,
  InstagramOutlined,
  ClockCircleOutlined,
  FacebookOutlined,
} from '@ant-design/icons'

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer__links">
          <a
            className="footer__links-cafekontinent"
            href="http://cafekontinent.by/"
          >
            <ShopOutlined />
            <span>cafekontinent.by</span>
          </a>
          <a
            className="footer__links-instagram"
            href="https://www.instagram.com/newkontinent_gastromarket/"
          >
            <InstagramOutlined />
            <span>newkontinent_gastromarket</span>
          </a>
        </div>
        <div className="footer__middle-container">
          <div className="main-page__logo-container">
            <img
              className="main-page__logo"
              src={require('../../images/logo.png')}
              alt="logo"
            />
            <div
              style={{ fontFamily: 'var(--font-zopa)' }}
              className="main-page__logo-text-container"
            >
              <span className="main-page__logo-text-primary">ЕдаКуда.бел</span>
              <span className="main-page__logo-text-secondary">
                Вкусные посылки
              </span>
            </div>
            <div className="footer__rights-text">
              <p>
                Все права защищены. Все права на материалы, находящиеся на
                сайте, охраняются в соответствии с законодательством РБ, в том
                числе об авторском праве и смежных правах.
              </p>
            </div>
          </div>
          <div className="footer__working-time">
            <ClockCircleOutlined
              style={{ fontSize: '42px', marginRight: '15px' }}
            />
            <div>
              <span>
                Каждый день <br /> с 10:00 до 22:00
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer__bottom-container">
          <span>ЧТПУП "ЭкономМаркет" г.Жлобин 2023</span>
          <div>
            <span
              style={{ fontWeight: 'bold', fontFamily: 'var(--font-zopa)' }}
            >
              Рекомендовать друзьям!
              <div className="footer__socials">
                <a
                  style={{ marginRight: '10px' }}
                  href="https://www.instagram.com/newkontinent_gastromarket/"
                >
                  <InstagramOutlined />
                </a>
                <a href="https://www.instagram.com/newkontinent_gastromarket/">
                  <FacebookOutlined />
                </a>
              </div>
            </span>
          </div>
          <span>Разработка сайта - iharaleynikov@gmail.com</span>
        </div>
      </div>
    </div>
  )
}
