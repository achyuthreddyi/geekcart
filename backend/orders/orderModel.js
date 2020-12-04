const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product'
  },
  name: String,
  count: Number,
  price: Number
})
const ProductCart = mongoose.model('ProductCart', ProductCartSchema)

const orderSchema = new mongoose.Schema(
  {
    // TODO: work on other stuff like address and other stuff
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
      type: Number
    },
    address: {
      type: String,
      maxlength: 1000
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = { Order, ProductCart }
