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
      course = await db.collection('courses').findOne({ title: input.title })
      if (course) throw new Error('Ya existe un curso con el mismo titulo')
      // InsertOne agrega datos nuevos a mongodb
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.error(error)
    }
    return newCourse
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

  createStudent: async (root, { input }) => {
    let db
    let student
    try {
      db = await connectDB()
      const person = await db
        .collection('students')
        .findOne({ email: input.email })
      if (person) throw new Error('Ya existe un estudiante con el mismo email')
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      console.error(error)
    }
    return input
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

  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course

    try {
      db = await connectDB()
      course = await db
        .collection('courses')
        .findOne({ _id: ObjectId(courseID) })
      person = await db
        .collection('students')
        .findOne({ _id: ObjectId(personID) })

      if (!course || !person) throw new Error('La persona o el curso no existe')

      await db.collection('courses').updateOne(
        { _id: ObjectId(courseID) },
        // Para indicar el elemento del query que se va a actualizar con una persona nueva
        { $addToSet: { people: ObjectId(personID) } }
      )
    } catch (error) {
      console.error(error)
    }
    return course
  },
}
