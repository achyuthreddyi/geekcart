const mongoose = require('mongoose')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')
const { error } = require('console')

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
    }
    // purchases: {
    //   type: Array,
    //   default: []
    // }
  },
  { timestamps: true }
)

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv4()
    this.hashed_password = this.securePassword(password)
  })
  .get(function () {
    return this._password
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

const user = mongoose.model('User', userSchema)

user.getUserById = async id => {
  console.log('coming in hte model ', id)
  try {
    const userDB = await user.findById(id).select('-hashed_password -salt')

    console.log('user from the getuserbyid', userDB)
    return userDB
  } catch (err) {
    return {
      error: 'error getting the user by Id',
      err
    }
  }
}

user.getUserByEmail = async email => {
  try {
    return await user.findOne({ email })
  } catch (err) {
    return {
      error: 'error getting the user by email',
      err
    }
  }
}

user.createUser = async newUser => {
  try {
    return await user.create(newUser)
  } catch (err) {
    return {
      error: 'error creating the new user',
      err
    }
  }
}

user.updateUser = async userData => {
  try {
    const { userId, newdata } = userData
    const userDB = await user.findById(userId).select('-hashed_password -salt')
    if (userDB) {
      userDB.name = newdata.name || userDB.name
      userDB.email = newdata.email || userDB.email
      if (newdata.password) {
        user.password = newdata.password
      }
      return await userDB.save()
    } else {
      return {
        error: ' user does not exists in our records'
      }
    }
  } catch (err) {
    return {
      error: 'user not being able to update  from the database',
      err
    }
  }
}

user.checkPassword = async userData => {
  const { email, password } = userData

  try {
    const userDB = await user.findOne({ email })
    if (!userDB.authenticate(password)) {
      return {
        error: 'user email and password did not match'
      }
    } else {
      return userDB
    }
  } catch (err) {
    return {
      error: 'user not being able to fetch from the database',
      err
    }
  }
}

user.removeUser = async email => {
  try {
    const userDB = await user.findOne({ email })
    return await userDB.remove()
  } catch (err) {
    return {
      error: 'error deleting the user from the database',
      err
    }
  }
}

user.getAllUsers = async _ => {
  try {
    return await user.find()
  } catch (err) {
    return {
      error: 'Error loading all the users',
      err
    }
  }
}

module.exports = user
