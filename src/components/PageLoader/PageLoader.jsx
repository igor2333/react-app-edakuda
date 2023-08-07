import React from 'react'
import './PageLoader.css'
import { Spin } from 'antd'

export const PageLoader = () => {
  return (
    <div className="page-loader">
      <Spin size="large" />
    </div>
  )
}
