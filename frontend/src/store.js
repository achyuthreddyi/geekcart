import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailReducer,
  productListReducer
} from './reducers/productReducer'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer'

// const reducer = {}
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
})
/* eslint-disable */
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: userInfoFromStorage
}

const middlewares = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
