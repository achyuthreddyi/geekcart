require('dotenv').config()
const express = require('express')
const app = express()
const { connectDB } = require('./config/connectDB')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoute = require('./users/userRoute')
const categoryRoute = require('./categories/categoryRoute')

connectDB()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/api/user', userRoute)
app.use('/api/category', categoryRoute)

// error handlers
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('hi')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`app working on port ${PORT}`))

function errorHandler (err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message
  })
}
