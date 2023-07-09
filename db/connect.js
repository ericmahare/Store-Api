const mongoose = require('mongoose')

  const DB = process.env.LOCAL_DB
  const connectDB = mongoose.connect(DB)

module.exports = connectDB
