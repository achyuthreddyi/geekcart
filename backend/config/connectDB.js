const mongoose = require('mongoose')
require('colors')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log(`mongo db connected ${conn.connection.host}`.cyan.underline)
  } catch (err) {
    console.log(`error${err}`.red.underline.bold)
  }
}

module.exports = { connectDB }
