const express = require('express')
const { check } = require('express-validator')
const { signOut, signUp, signIn, isSignedIn } = require('./userController')
const router = express.Router()

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
router.post(
  '/signin',
  [
    check('password')
      .isLength({ min: 3 })
      .withMessage('must be at least 3 chars long'),

    check('email')
      .isEmail()
      .withMessage('must be a proper email')
  ],
  signIn
)
router.post('/signout', signOut)
router.get('/test', isSignedIn, (req, res) => {
  res.json(req.auth)
})

module.exports = router
