import React from 'react'
import './AdminItem.css'
import { NavLink } from 'react-router-dom'

export const AdminItem = ({ image, id, name }) => {
  return (
    <NavLink to={id}>
      <div className="admin-item">
        <img className="admin-item__image" src={`${image}`} alt="admin-item" />
        <span>{name}</span>
      </div>
    </NavLink>
  )
}
