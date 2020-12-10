const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const formidable = require('formidable')
// const _ = require('lodash')
const fs = require('fs')

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
      ref: 'product',
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

productSchema.methods = {
  createProduct: async function (req) {
    try {
      const form = new formidable.IncomingForm()
      form.keepExtensions = true

      form.parse(req, async (err, fields, file) => {
        if (err) {
          console.log('place 101')
          return {
            error: 'problem with image'
          }
        }
        const { price, name, description, category, stock } = fields

        if (!price || !name || !description || !category || !stock) {
          console.log('place102')
          return {
            error: 'please include all fields '
          }
        }
        this.name = name
        this.price = price
        this.description = description
        this.category = category
        this.stock = stock

        if (file.photo) {
          if (file.photo.size > 3000000) {
            return {
              error: 'file size is big '
            }
          } else {
            this.photo.data = fs.readFileSync(file.photo.path)
            this.photo.contentType = file.photo.type
          }
        }

        const uploadedProduct = await this.save()
        console.log('uploaded documnet ', uploadedProduct)
        return uploadedProduct
        // save to the database
      })

      // return await product.create(newproduct)
    } catch (err) {
      return {
        error: 'error creating a new product',
        err
      }
    }
  }
}

const product = mongoose.model('Product', productSchema)

product.createDocument = async req => {
  try {
    return await product().createProduct(req)
  } catch (err) {
    return {
      error: 'product not able to upload to the database',
      err
    }
  }
}

product.getAllDocuments = async _ => {
  try {
    return await product.find()
  } catch (err) {
    return {
      error: 'No products found in the database',
      err
    }
  }
}

product.getDocumentById = async id => {
  try {
    return await product.findById(id)
  } catch (err) {
    return {
      error: 'error getting the product by id',
      err
    }
  }
}

product.getDocumentByName = async name => {
  try {
    return await product.find({ name })
  } catch (err) {
    return {
      error: 'error getting the product by name',
      err
    }
  }
}

product.updateDocument = async productData => {
  try {
    const { productId, newproduct } = productData
    console.log('product Id in updateDocument', productId)
    const productDB = await product.findById(productId)
    if (productDB) {
      productDB.name = newproduct.name || product.name
      productDB.description = newproduct.description || product.description
      productDB.price = newproduct.price || product.price
      productDB.category = newproduct.category || product.category
      productDB.stock = newproduct.stock || product.stock
      productDB.photo = newproduct.photo || product.photo

      const updatedproduct = await productDB.save()
      return updatedproduct
    } else {
      return {
        error: 'product product does not exists in our records'
      }
    }
  } catch (err) {
    return {
      error: 'error updateing the product by id',
      err
    }
  }
}

product.deleteDocument = async id => {
  try {
    return await product.deleteOne({ _id: id })
  } catch (err) {
    return {
      error: 'error deleting the product from the database',
      err
    }
  }
}

module.exports = product
