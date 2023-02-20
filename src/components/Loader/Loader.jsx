import React from 'react'
import { Spin } from 'antd'

const Loader = (props) => {
  const { size = "large", className = "mb-3", ...rest } = props
  return (
    <Spin
      size={size}
      className={className}
      {...rest}
    />
  )
}

export default Loader