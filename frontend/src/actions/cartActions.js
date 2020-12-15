import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants'
const axios = require('axios')

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/product/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity
    }
  })
  /* eslint-disable */
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  /* eslint-enable */
}

export const removeCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
  /* eslint-disable */
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  /* eslint-enable */
}

export const saveShippingAddress = data => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })
  /* eslint-disable */
  localStorage.setItem('shippingAddress', JSON.stringify(data))
  /* eslint-enable */
}
