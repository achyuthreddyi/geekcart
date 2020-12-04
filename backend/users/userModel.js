const mongoose = require('mongoose')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    userInfo: {
      type: String,
      trim: true
    },
    // TODO: hash the password
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
)

userSchema
  .virtual('password')
  .set(function (password) {
    this.password = password
    this.salt = uuidv4()
    this.hashed_password = this.securePassword(password)
  })
  .get(function () {
    return this.password
  })

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.hashed_password
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return ''
    } else {
      try {
        return crypto
          .createHmac('sha256', this.salt)
          .update(plainPassword)
          .digest('hex')
      } catch (err) {
        return ''
      }
    }
  }
}

module.exports = mongoose.model('User', userSchema)
