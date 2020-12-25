import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listUsers, deleteUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.role > 0) {
      dispatch(listUsers())
    } else {
      history.pushState('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = id => {
    dispatch(deleteUser(id))
  }

  return (
    <>
      <h1>Users</h1>
      {loading && <Loader />}
      {error && <Message variant='danger' error={error} />}
      {users && users.length > 0 && (
        <Table striped boarded hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Admin</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>
                  {' '}
                  <a href={`mailto:${user.email}`}>{user.email} </a>
                </td>
                <td>{user.name}</td>
                <td>
                  {/* eslint-disable */

                  user.role > 0 ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )
                  /* eslint-enable */
                  }
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    {' '}
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

export default UserListScreen
