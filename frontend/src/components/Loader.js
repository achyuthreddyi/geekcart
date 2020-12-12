import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div>
      <Spinner
        animation='grow'
        variant='primary'
        role='status'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block'
        }}
      >
        <span className='sr-only'>loading....</span>
      </Spinner>
    </div>
  )
}

export default Loader
