'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')

// Las mutaciones sirven para insertar datos a GraphQL
module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: '',
    }
    const newCourse = Object.assign(defaults, input)
    let db
    let course
    try {
      db = await connectDB()
      // InsertOne agrega datosn nuevos a graphql
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.error(error)
    }
    return newCourse
  },
  createStudent: async (root, { input }) => {
    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      console.error(error)
    }
    return input
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course
    try {
      db = await connectDB()
      // Se utiliza updateOne para editar un elemento
      await db
        .collection('courses')
        .updateOne({ _id: ObjectId(_id) }, { $set: input })
      course = await db.collection('courses').findOne({ _id: ObjectId(_id) })
    } catch (error) {
      console.error(error)
    }
    return course
  },
  editStudent: async (root, { _id, input }) => {
    let db
    let student
    try {
      db = await connectDB()
      // Se utiliza updateOne para editar un elemento
      await db
        .collection('students')
        .updateOne({ _id: ObjectId(_id) }, { $set: input })
      student = await db.collection('students').findOne({ _id: ObjectId(_id) })
    } catch (error) {
      console.error(error)
    }
    return student
  },
  deleteCourse: async (root, { _id }) => {
    let db, info
    try {
      db = await connectDB()
      info = await db.collection('courses').deleteOne({ _id: ObjectId(_id) })
    } catch (error) {
      console.error(error)
    }
    return info.deletedCount
      ? `El curso con id ${_id} fue eliminado exitosamente`
      : 'No existe el curso con el id indicado'
  },
  deleteStudent: async (root, { _id }) => {
    let db, info
    try {
      db = await connectDB()
      info = await db.collection('students').deleteOne({ _id: ObjectId(_id) })
    } catch (error) {
      console.error(error)
    }
    return info.deletedCount
      ? `El estudiante con id ${_id} fue eliminado exitosamente`
      : 'No existe el estudiante con el id indicado'
  },
}
