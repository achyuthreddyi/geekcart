import axios from 'axios'
import {
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
