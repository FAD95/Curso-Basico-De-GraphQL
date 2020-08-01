'use strict'

const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { graphql, buildSchema } = require('graphql')

const app = express()
const port = process.env.PORT || 3000

// definimos el esquema
const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

// Configurar los resolvers
const resolvers = {
  hello: () => {
    return 'hello world'
  },

}

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
