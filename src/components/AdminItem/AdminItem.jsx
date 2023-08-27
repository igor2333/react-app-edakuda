import React from 'react'
import './AdminItem.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../features/auth/ContextProvider'

export const AdminItem = ({ image, id, name, isAvailable }) => {
  const { user } = useAuth()

  console.log(user)
  return (
    <NavLink to={id}>
      <div
        className={
          isAvailable ? 'admin-item' : 'admin-item admin-item__not-available'
        }
      >
        <img className="admin-item__image" src={`${image}`} alt="admin-item" />
        <span>{name}</span>
      </div>
    </NavLink>
  )
}
