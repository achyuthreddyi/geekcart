const { generateToken } = require('../config/generateToken')
const User = require('./userModel')

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

exports.signUp = async (req, res) => {
  const result = await registerUser(req.body)

  if (!result.error) {
    res.status(201).json(result)
  } else {
    res.status(400).send(result)
  }
}

exports.signIn = async (req, res) => {
  const result = await getUser(req.body)
  if (!result.error) {
    const payload = {
      _id: result._id
    }

    const token = generateToken(payload)
    res.status(200).json(token)
  } else {
    res.status(400).send(result)
  }
}

exports.signOut = (req, res) => {
  res.json('hi')
}
