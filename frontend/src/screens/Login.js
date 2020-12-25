import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(
    _ => {
      if (userInfo) {
        history.push(redirect)
      }
    },
    [history, userInfo, redirect]
  )

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Loader />}
      {error && <Message variant='danger' error={error} />}
      {/* eslint-disable */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          SignIn
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer ?
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Login
