import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, error }) => {
  console.log('profile in the variant and data', variant, error)
  return <Alert variant={variant}> {error} </Alert>
}
Message.defaultProps = {
  variant: 'info'
}

export default Message
