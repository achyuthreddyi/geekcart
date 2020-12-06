const express = require('express')
const { check } = require('express-validator')
const {
  signOut,
  signUp,
  signIn,
  isSignedIn,
  getUserById,
  getUser,
  isAuthenticated,
  updateUser,
  userPurchaseList
} = require('./userController')
const router = express.Router()

router.param('userId', getUserById)

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
// router.get('/:userId', isSignedIn, isAuthenticated, getUser)
router.get('/signout', signOut)
router
  .route('/:userId')
  .get(isSignedIn, isAuthenticated, getUser)
  .put(isSignedIn, isAuthenticated, updateUser)
router.get('/order/:userId', isSignedIn, isAuthenticated, userPurchaseList)

module.exports = router
