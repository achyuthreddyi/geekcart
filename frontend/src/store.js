import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailReducer,
  productListReducer
} from './reducers/productReducer'

// const reducer = {}
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer
})

const initialState = {}

const middlewares = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store