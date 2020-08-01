'use strict'

const { graphql, buildSchema } = require('graphql')

// definimos el esquema
const schema = buildSchema(`
    type Query {
        hello: String
        saludo: String
    }
`)

// Configurar los resolvers
const resolvers = {
  hello: () => {
    return 'hello world'
  },
  saludo: () => {
    return 'Hola a todos'
  },
}

// Ejecutamos el query hello
graphql(schema, '{saludo}', resolvers).then((data) => {
  console.log(data)
})
