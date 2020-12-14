import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <>
      <Spinner animation='border' variant='primary' />
      <Spinner animation='border' variant='secondary' />
      <Spinner animation='border' variant='success' />
      <Spinner animation='border' variant='danger' />
      <Spinner animation='border' variant='warning' />
      <Spinner animation='border' variant='info' />
      <Spinner animation='border' variant='light' />
      <Spinner animation='border' variant='dark' />
    </>

    // <div>
    //   <Spinner
    //     animation='grow'
    //     variant='primary'
    //     role='status'
    //     style={{
    //       width: '100px',
    //       height: '100px',
    //       margin: 'auto',
    //       display: 'block'
    //     }}
    //   >
    //     <span className='sr-only'>loading....</span>
    //   </Spinner>
    // </div>
  )
}

export default Loader
