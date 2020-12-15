const order = require('./orderModel')

// @desc    create a new Order
// @route   POST /api/orders
// @access  Private

exports.createOrder = async (req, res) => {
  const createdOrder = await order.createDocument({
    orderDetails: req.body,
    userId: req.user._id
  })
  if (!createdOrder.error) {
    res.status(200).json(createdOrder)
  } else {
    res.status(400).json(createdOrder)
  }
}
