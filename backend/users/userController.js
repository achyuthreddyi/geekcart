const { validationResult } = require('express-validator')
const { generateToken } = require('../config/generateToken')
const User = require('./userModel')
const expresJwt = require('express-jwt')
const router = require('./userRoute')

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
const getUser = async user => {
  const email = user.emaild
  try {
    const user = await User.findOne({ email })
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

// protected routes
exports.isSignedIn = expresJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
})

// custom middlewares

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id === req.auth._id
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
