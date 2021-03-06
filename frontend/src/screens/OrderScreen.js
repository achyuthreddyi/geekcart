import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getOrderDetails,
  payOrder,
  deliverOrder
} from '../actions/orderActions'
import CheckoutSteps from '../components/CheckOutSteps'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  if (!loading) {
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    // calculate prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price + item.quantity,
        0
      )
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        'http://localhost:5000/api/config/paypal'
      )
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, userInfo])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  const successPaymentHandler = paymentResult => {
    console.log('paymentResult', paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger' error={error} />}
      <h1>Order screen</h1>
      {order && order.orderItems.length === 0 && (
        <Message
          variant='danger'
          error='you dont have any orders to be delivered from our end'
        />
      )}
      {order && (
        <>
          <h1>Order {order._id}</h1>
          <CheckoutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <Link to='/profile'>profile: {order.user.name}</Link>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}
                    {', '}
                    {order.shippingAddress.city}
                    {', '}
                    {order.shippingAddress.postalCode}
                    {', '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message
                      variant='success'
                      error={`Delivered on ${order.deliveredAt}`}
                    />
                  ) : (
                    <Message variant='secondary' error='Not Delivered' />
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message
                      variant='success'
                      error={`Paid on ${order.paidAt}`}
                    />
                  ) : (
                    <Message variant='danger' error='Not Paid' />
                  )}
                </ListGroup.Item>

                {userInfo &&
                  !(userInfo.role === 0) &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        className='btn btn-block'
                        type='button'
                        onClick={deliverHandler}
                      >
                        Delver Item
                      </Button>
                    </ListGroup.Item>
                  )}

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <>
                      <Message>Order is empty</Message>
                      Try our products ?<Link to='/'>main Page</Link>
                    </>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.quantity} x &#x20B9; {item.price} = $
                              {item.quantity * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>&#x20B9; {order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>&#x20B9; {order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>&#x20B9; {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>&#x20B9; {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <>
                      <ListGroup.Item>
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                        // onClick = {instaMojoPay}
                        >
                          Pay via instamojo
                        </Button>
                      </ListGroup.Item>
                    </>
                  )}

                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.role === 1 &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default OrderScreen
