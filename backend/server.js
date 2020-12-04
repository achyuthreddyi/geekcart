const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hi')
})

app.listen(5000, console.log('app working on port 5000'))
