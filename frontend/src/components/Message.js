import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, data }) => {
  return <Alert variant={variant}> {data} </Alert>
}
Message.defaultProps = {
  variant: 'info'
}

export default Message
