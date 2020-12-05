const express = require('express')
const { check } = require('express-validator')
const { signOut, signUp, signIn } = require('./userController')
const router = express.Router()

router.get('/signout', signOut)
router.post(
  '/signup',
  [
    check('name')
      .isLength({ min: 3 })
      .withMessage('must be at least 3 chars long'),
    check('email')
      .isEmail()
      .withMessage('must be a proper email')
  ],
  signUp
)
router.post('/signin', signIn)

module.exports = router
