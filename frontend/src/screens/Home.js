import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'

const Home = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, products } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  console.log(productList)
  return (
    <div>
      <h1>Latest Products @ cheapest prices</h1>
      <Row>
        {/* {products.length === 0 && <h1>Error Loading products</h1>} */}
        {products &&
          products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={3} xlg={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default Home
