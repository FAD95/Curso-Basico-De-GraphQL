'use strict'

const { MongoClient } = require('mongodb')
const { DB_USER, DB_PASSWD, DB_NAME, DB_HOST } = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

let connection

async function connectDB() {
  if (connection) return connection

  let client

  try {
    client = await MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    connection = await client.connect()
  } catch (error) {
    console.error("Can't connect to database", mongoUrl, error)
    process.exit(1)
  }
  return connection
}

module.exports = connectDB
