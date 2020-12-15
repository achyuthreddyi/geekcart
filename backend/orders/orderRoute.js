const express = require('express')
const { isSignedIn } = require('../middleware/authMiddleware')
const { createOrder } = require('./orderController')

const router = express.Router()

router.route('/').post(isSignedIn, createOrder)

module.exports = router
