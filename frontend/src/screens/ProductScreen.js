import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import {
  createProductReview,
  listProductsDetails
} from '../actions/productActions'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, product, error } = productDetails

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    error: errorProductReview,
    success: successProductReview,
    loading: loadingProductReview
  } = productReviewCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProductsDetails(match.params.id))
  }, [dispatch, successProductReview])

  const addToCart = () => {
    setQuantity(1)
    history.push(`/cart/${match.params.id}?qty=${quantity}`)
  }
  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment
      })
    )
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        {' '}
        <AiOutlineArrowLeft /> GoBack
      </Link>
      {loading && <Loader />}
      {product && (
        <>
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

                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews `}
                  />
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

          <Row>
            <Col md={6}>
              <h2>reviews</h2>
              {product.reviews.length === 0 && (
                <Message error='No reviews be the first one to review this product' />
              )}
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    {/* <p>{review.createdAt.substring(0, 10)}</p> */}
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>write your reviews</h2>
                  {errorProductReview && (
                    <Message variant='danger' error={errorProductReview} />
                  )}
                  {/* eslint-disable */

                  userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>;
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='danger' error='please login' />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
