import axios from 'axios'
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS
} from '../constants/productConstants'

export const listProducts = () => async disapatch => {
  try {
    disapatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('http://localhost:5000/api/product/')
    console.log(await axios.get('http://localhost:5000/api/product/'))
    disapatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    disapatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response
    })
  }
}

export const listProductsDetails = id => async dispatch => {
  console.log('inside tht listProduct details', id)
  try {
    console.log('dispatch ', dispatch)
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`http://localhost:5000/api/product/${id}`)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error.data.error
          : error.error
    })
  }
}

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`http://localhost:5000/api/product/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/product/admin/create',
      {},
      config
    )

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })

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
      `http://localhost:5000/api/product/${product._id}`,
      product,
      config
    )

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    // console.log(
    //   await axios.post(
    //     `http://localhost:5000/api/product/${productId}/reviews`,
    //     review,
    //     config
    //   )
    // )

    await axios.post(
      `http://localhost:5000/api/product/${productId}/reviews`,
      review,
      config
    )

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}

export const listTopProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })
    const { data } = await axios.get('http://localhost:5000/api/product/top')
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    })
  }
}
