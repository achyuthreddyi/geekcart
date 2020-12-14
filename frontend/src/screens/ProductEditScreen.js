import React, { useState, useEffect } from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listProductsDetails, updateProduct } from '../actions/productActions'
import { Form, Button } from 'react-bootstrap'
import ProgressBar from '../components/ProgressBar'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  // const [numReviews, setNumReviews] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const [file, setFile] = useState(null)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductsDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        description,
        price,
        image,
        brand,
        category,
        countInStock
      })
    )
  }

  const uploadFileHandler = e => {
    const selectedFile = e.target.files[0]
    console.log(selectedFile)
    const types = ['image/png', 'image/jpeg', 'image/jpg']

    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile)
      setUploadError('')
    } else {
      setFile(null)
      setUploadError('Please select an image file (png or jpg)')
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        <AiOutlineArrowLeft /> GoBack
      </Link>
      <h1>{name}</h1>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger' error={errorUpdate} />}

        {loading && <Loader />}
        {error && <Message variant='danger' error={error} />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label> Name</Form.Label>;
            <Form.Control
              type='name'
              placeholder='Please Enter Your Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Price'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Image url '
              value={image}
              onChange={e => setImage(e.target.value)}
            />

            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            />
            {file && <div>{file.name} </div>}
            {file && (
              <ProgressBar file={file} setFile={setFile} setImage={setImage} />
            )}
            {uploadError && <Message variant='danger' error={uploadError} />}

            {/* <Form.File id="exampleFormControlFile1" label="Example file input" /> */}

            {/* {uploading && <Loader /> }          */}
          </Form.Group>
          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={e => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Category'
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='countInStock'>
            <Form.Label>countInStock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={e => setCountInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
