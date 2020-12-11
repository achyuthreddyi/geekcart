const product = require('./productModel')

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
  req.product.photo = undefined
  return res.status(200).json(req.product)
}

// @desc    updating a product
// @route   PUT /api/products/admin
// @access  Private/Admin

// exports.updateProduct = async (req, res) => {
//   const updatedProduct = await product.updateDocument({
//     productId: req.product._id,
//     newproduct: req.body
//   })
//   if (!updatedProduct.error) {
//     res.status(200).json(updatedProduct)
//   } else {
//     res.status(400).json(updatedProduct)
//   }
// }

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

// middleware

exports.getProductById = async (req, res, next, id) => {
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