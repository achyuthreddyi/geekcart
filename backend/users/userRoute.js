const express = require('express')
const { signOut, signUp, signIn } = require('./userController')
const router = express.Router()

router.get('/signout', signOut)
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router
