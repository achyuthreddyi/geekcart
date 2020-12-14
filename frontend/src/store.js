import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailReducer,
  productListReducer
} from './reducers/productReducer'
import {
  userListReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateProfileReducer
} from './reducers/userReducer'

// const reducer = {}
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer
})
/* eslint-disable */
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
/* eslint-enable */
console.log('userInfoFromStorage', userInfoFromStorage)
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
}

const middlewares = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
