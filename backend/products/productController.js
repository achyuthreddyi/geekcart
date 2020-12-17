const product = require('./productModel')

// @desc    creating a product
// @route   POST /api/products/admin
// @access  Private/Admin

exports.createProduct = async (req, res) => {
  const createdProduct = await product.createDocument(req.user._id)
  if (!createdProduct.error) {
    res.status(200).json(createdProduct)
  } else {
    res.status(400).json(createdProduct)
  }
}

// @desc    get all products
// @route   POST /api/products/
// @access  Public

exports.getAllProducts = async (req, res) => {
  const products = await product.getAllDocuments()
  if (!products.error) {
    res.status(200).json(products)
  } else {
    res.status(400).json(products)
  }
}

// @desc    getting product by id
// @route   GET /api/products/:productId
// @access  Public

exports.getProduct = async (req, res) => {
  // req.product.photo = undefined
  console.log('inside the getProduct')
  return res.status(200).json(req.product)
}

// @desc    updating a product
// @route   PUT /api/products/admin
// @access  Private/Admin

exports.updateProduct = async (req, res) => {
  console.log('coming in update product method')
  const updatedProduct = await product.updateDocument({
    productId: req.product._id,
    newProductDetails: req.body
  })
  if (!updatedProduct.error) {
    res.status(200).json(updatedProduct)
  } else {
    res.status(400).json(updatedProduct)
  }
}

// @desc    deleting a product
// @route   PUT /api/products/admin
// @access  Private/Admin

exports.deleteProduct = async (req, res) => {
  const updatedProduct = await product.deleteDocument(req.product._id)
  if (!updatedProduct.error) {
    res.status(200).json({
      success: 'deletion of the product is succeess ful'
    })
  } else {
    res.status(400).json(updatedProduct)
  }
}

// @desc    Create a new review
// @route   POST / api/products/:id/reviews
// @access  Private

exports.createProductReview = async (req, res) => {
  const reviewedProduct = await product.addReviewDocument(req)
  if (!reviewedProduct.error) {
    res.status(201).json(reviewedProduct)
  } else {
    res.status(400).json(reviewedProduct)
  }
}

// @desc    Get top rated products
// @route   GET / api/products/top
// @access  Public
exports.getTopProducts = async (req, res) => {
  const topProducts = await product.getTopDocuments()
  if (topProducts) {
    res.status(200).json(topProducts)
  } else {
    res.status(400).json({
      error: 'error loading top products'
    })
  }
}

// middleware

exports.getProductById = async (req, res, next, id) => {
  console.log('inside the getProductById', id)
  const productDB = await product.getDocumentById(id)
  if (!productDB) {
    return res.status(404).json({
      error: 'product not found in the database'
    })
  }
  if (!productDB.error) {
    req.product = productDB
    next()
  } else {
    res.status(400).json(productDB)
  }
}

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next()
}
