import React, { useEffect } from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from './actions/productActions'

const App = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  console.log(productList)
  console.log(axios.get('http://localhost:5000/api/product/'))

  return <h1>achyuth Reddy</h1>
}

export default App
