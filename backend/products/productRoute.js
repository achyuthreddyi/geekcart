const express = require('express')
const { isSignedIn, isAdmin } = require('../middleware/authMiddleware')
const { updateProduct } = require('../middleware/updateProduct')
const { uploadProduct } = require('../middleware/uploadProduct')
const {
  getProductById,
  getAllProducts,
  getProduct,
  photo,
  deleteProduct
} = require('./productController')
const router = express.Router()

router.param('productId', getProductById)

router.route('/').get(getAllProducts)
router
  .route('/:productId')
  .get(getProduct)
  .put(isSignedIn, isAdmin, updateProduct)
  .delete(isSignedIn, isAdmin, deleteProduct)

router.route('/photo/:productId').get(photo)

router.route('/admin/create').post(isSignedIn, isAdmin, uploadProduct)

module.exports = router
