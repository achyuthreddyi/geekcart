const { validationResult } = require('express-validator')
const { generateToken } = require('../config/generateToken')
const User = require('./userModel')
const Order = require('../orders/orderModel')
const expresJwt = require('express-jwt')

// database functionalities

// registering a new user
const registerUser = async user => {
  try {
    const email = user.email
    const userExists = await User.findOne({ email })

    if (userExists) {
      return {
        error: 'user already exists'
      }
    } else {
      return await User.create(user)
    }
  } catch (err) {
    return {
      error: 'user not able to get stored in the database'
    }
  }
}
// getting a user
const getUserByIdDB = async userId => {
  try {
    const user = await User.findById(userId).select('-hashed_password -salt')
    if (user) {
      return user
    } else {
      return {
        error: 'user not found in the database'
      }
    }
  } catch (err) {
    return {
      error: 'user not being able to fetch from the database',
      err
    }
  }
}

const checkPassword = async user => {
  const { email, password } = user
  try {
    const user = await User.findOne({ email })
    if (!user.authenticate(password)) {
      return {
        error: 'user email and password did not match'
      }
    } else {
      return user
    }
  } catch (err) {
    return {
      error: 'user not being able to fetch from the database',
      err
    }
  }
}
// FIXME: change the naming conventiosn
const updateUserDB = async data => {
  const { userId, newdata } = data
  console.log('in update user db ', userId, newdata)
  try {
    const user = await User.findById(userId).select('-hashed_password -salt')
    if (user) {
      user.name = String(newdata.name) || user.name
      user.email = String(newdata.email) || user.email
      if (newdata.password) {
        user.password = newdata.password
      }
    }
    const updatedUser = await user.save()
    return updatedUser
  } catch (err) {
    return {
      error: 'user not being able to update  from the database',
      err
    }
  }
}

const getOrdersDB = async userId => {
  try {
    const order = await Order.find({ user: userId })
    order.populate('user', '_id name email')
  } catch (err) {
    return {
      error: 'orders not being able to fetch  from the database',
      err
    }
  }
}

// controller functions
// @desc    register a new user
// @route   POST /api/users/
// @access  Public

exports.signUp = async (req, res) => {
  const result = await registerUser(req.body)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }

  if (!result.error) {
    res.status(201).json(result)
  } else {
    res.status(400).send(result)
  }
}

exports.signIn = async (req, res) => {
  const { email, password } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }

  const result = await checkPassword({ email, password })

  if (!result.error) {
    const payload = {
      _id: result._id
    }

    const token = generateToken(payload)
    const { _id, name, email, role } = result
    res.cookie('token', token, { expire: new Date() + 99999 })
    res.status(200).json({
      token,
      user: {
        _id,
        name,
        email,
        role
      }
    })
  } else {
    res.status(400).send(result)
  }
}

exports.signOut = (req, res) => {
  res.clearCookie('token')
  res.json({
    message: 'User Signout successfully'
  })
}

exports.updateUser = async (req, res) => {
  const newdata = req.body
  const userId = req.profile._id
  console.log('user id in the update use method ', newdata.name)

  const result = await updateUserDB({ userId, newdata })
  if (!result.error) {
    res.status(200).json(result)
  } else {
    res.status(400).json(result)
  }
}

exports.getUser = (req, res) => {
  return res.json(req.profile)
}

exports.userPurchaseList = async (req, res) => {
  const result = await getOrdersDB(req.profile._id)
  if (!result.error) {
    res.status(200).json(result)
  } else {
    res.status(400).json(result)
  }
}
// protected routes
exports.isSignedIn = expresJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
})

// custom middlewares

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id
  if (!checker) {
    return res.status(403).json({
      error: 'Access denied'
    })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'You are not an admin'
    })
  }
}

exports.getUserById = async (req, res, next, id) => {
  const result = await getUserByIdDB(id)

  if (!result.error) {
    req.profile = result
    next()
  } else {
    res.status(400).json(result)
  }
}

exports.pushOrderInPurchaseList = async (req, res, next) => {
  try {
    const purchases = []
    req.body.order.products.forEach(product => {
      purchases.push({
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id
      })
    })

    // store this in DB
    const orderList = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $push: { purchases: purchases } },
      { new: true }
    )
    console.log(orderList)
    next()
  } catch (error) {
    res.status(400).json({
      error: 'order list not updated to the user document'
    })
  }
}
