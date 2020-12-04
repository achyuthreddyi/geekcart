require('dotenv').config()
const express = require('express')
const app = express()
const { connectDB } = require('./config/connectDB')

connectDB()

app.get('/', (req, res) => {
  res.send('hi')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`app working on port ${PORT}`))
