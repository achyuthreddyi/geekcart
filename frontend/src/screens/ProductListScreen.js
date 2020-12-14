import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'

import { deleteProduct, listProducts } from '../actions/productActions'

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete

  useEffect(() => {
    if (!userInfo || userInfo.role === 0) {
      history.push('/login')
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete
    // successCreate,
    // createdProduct
  ])
  const deleteHandler = id => {
    if (window.confirm('are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {}
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus px-1' />
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {products && (
        <Table striped boarded hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button>
                      <i className='fas fa-edit mx-2' />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm mx-2'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
