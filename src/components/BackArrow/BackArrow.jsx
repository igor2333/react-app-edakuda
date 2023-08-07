import React from 'react'
import './BackArrow.css'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

export const BackArrow = ({ path = '/pizza' }) => {
  return (
    <NavLink to={path} className="back-arrow">
      <ArrowLeftOutlined />
    </NavLink>
  )
}
