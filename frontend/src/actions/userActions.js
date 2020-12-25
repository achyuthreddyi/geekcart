import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL
} from '../constants/userConstants'

import { MY_ORDER_DETAILS_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch, getState) => {
  console.log('in the dispatch of the user actions', dispatch)
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/user/signin',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    /* eslint-disable */

    localStorage.setItem('userInfo', JSON.stringify(data))
    /* eslint-enable */
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

// register a new user
export const register = (name, email, password) => async (
  dispatch,
  getState
) => {
  console.log('in the dispatch of the user actions', name)
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/user/signup',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    /* eslint-disable */

    localStorage.setItem('userInfo', JSON.stringify(data))
    /* eslint-enable */
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

export const logout = () => async dispatch => {
  console.log('in the logout of the user Action file of the a', dispatch)
  /* eslint-disable */
  localStorage.removeItem('userInfo')
  localStorage.removeItem('shippingAddress')
  /* eslint-enable */

  dispatch({
    type: USER_LOGOUT
  })
  dispatch({
    type: USER_REGISTER_LOGOUT
  })
  dispatch({
    type: USER_PROFILE_RESET
  })
  dispatch({
    type: MY_ORDER_DETAILS_RESET
  })
  dispatch({
    type: USER_LIST_RESET
  })
}

export const getuserProfile = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    console.log('hey man innova crysta')
    const { data } = await axios.get(
      `http://localhost:5000/api/user/${id}`,
      config
    )
    console.log('data from the get user profile', data)

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

// update the user profile
export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    console.log('user in the update user profiel method', user)
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(
      'http://localhost:5000/api/user/profile',
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

// get the user list for the admins
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(
      'http://localhost:5000/api/user/admin/userlist',
      config
    )

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

export const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(
      `http://localhost:5000/api/user/${user._id}`,
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS
    })

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

// delete a user based on the id of the user by the admin
export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`http://localhost:5000/api/user/${id}`, config)

    dispatch({
      type: USER_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}
