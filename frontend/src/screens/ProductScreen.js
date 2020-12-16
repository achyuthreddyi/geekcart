import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import { listProductsDetails } from '../actions/productActions'
import Loader from '../components/Loader'

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, product, error } = productDetails

  useEffect(() => {
    dispatch(listProductsDetails(match.params.id))
  }, [dispatch])

  const addToCart = () => {
    setQuantity(1)
    history.push(`/cart/${match.params.id}?qty=${quantity}`)
  }
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        {' '}
        <AiOutlineArrowLeft /> GoBack
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              ;
              <ListGroup.Item>
                <h2>rating</h2>
              </ListGroup.Item>
              <ListGroup.Item>Price: &#x20B9; {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong> &#x20B9; {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'inStock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col> QTY </Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={quantity}
                          onChange={e => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCart}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
