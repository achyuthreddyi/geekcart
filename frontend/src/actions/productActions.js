import axios from 'axios'
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS
} from '../constants/productConstants'

export const listProducts = () => async disapatch => {
  try {
    disapatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('http://localhost:5000/api/product/')
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
          : error.message
    })
  }
}
