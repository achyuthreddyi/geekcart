const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  }
})

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1500
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    reviews: [reviewSchema],
    // TODO: implement the brand of the product
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    // FIXME:  put this into s3 buckets and get the link
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
