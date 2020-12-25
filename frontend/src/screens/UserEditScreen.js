import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getuserProfile, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(0)

  const dispatch = useDispatch()

  const userProfile = useSelector(state => state.userProfile)
  const { loading, error, user } = userProfile

  const userUpdate = useSelector(state => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    }
    if (!user.name || user._id !== userId) {
      dispatch(getuserProfile(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }
  }, [dispatch, user, userId, history, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name: name, email: email, role: role }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        <AiOutlineArrowLeft /> GoBack
      </Link>

      <FormContainer>
        <h1>Edit user</h1>

        {loading && <Loader />}
        {errorUpdate && <Message variant='danger' error={errorUpdate} />}
        {loadingUpdate ? (
          <Loader />
        ) : error ? (
          <Message variant='danger' error={error} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Please Enter Your Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='role'>
              <Form.Label>Change user Type</Form.Label>
              <Form.Control
                as='select'
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value={0}>Normal User</option>
                <option value={1}>Admin</option>
                <option value={2}>Seller</option>
              </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
