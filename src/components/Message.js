import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return (
    <Alert style={{ borderRadius: '6px' }} variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'danger',
}
export default Message
