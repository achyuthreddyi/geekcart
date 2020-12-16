const express = require('express')
const { isSignedIn, isAdmin } = require('../middleware/authMiddleware')
const {
  createOrder,
  updateOrderToPaid,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders
} = require('./orderController')

const router = express.Router()

router.route('/').post(isSignedIn, createOrder)
router.route('/myorders').get(isSignedIn, getMyOrders)
router.route('/:id').get(isSignedIn, getOrderById)
router.route('/:id/pay').put(isSignedIn, updateOrderToPaid)
router.route('/:id/deliver').put(isSignedIn, isAdmin, updateOrderToDelivered)

module.exports = router
