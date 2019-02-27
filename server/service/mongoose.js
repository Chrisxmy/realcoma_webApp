const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/recruit'

mongoose.Promise = global.Promise

mongoose.connect(
  uri,
  { useMongoClient: true }
)

const db = mongoose.connection

db.on('disconnected', () => {})

db.on('err', (err, data) => {
  console.log(err)
})

db.once('open', () => {
  console.log('success connect')
})
