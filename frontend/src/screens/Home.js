import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import { Link } from 'react-router-dom'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import TitleHelmet from '../components/TitleHelmet'

const Home = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch])

  console.log(productList)
  return (
    <div>
      <TitleHelmet />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          {' '}
          <AiOutlineArrowLeft />
          Go Back
        </Link>
      )}

      {/* {!loading && <ProductCarousel />} */}
      {loading && <Loader />}
      {/* {error && <Message variant='success' children={error}></Message>} */}
      {/* eslint-disable */}
      {!keyword && <h1>Latest Products @ cheapest prices</h1>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='success' data={error}></Message>
      ) : (
        <Row>
          {/* {products.length === 0 && <h1>Error Loading products</h1>} */}
          {products &&
            products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={3} xlg={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  )
}

export default Home
