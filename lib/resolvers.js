'use strict'
'use strict'

const queries = require('./queries')
const mutations = require('./mutations')
const types = require('./types')

module.exports = {
  Query: queries,
  Mutation: mutations,
  // Para que se puedan traer los datos de las personas que estan anidadas 
  ...types
}
