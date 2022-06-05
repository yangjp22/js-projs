const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/students', {useNewUrlParser: true})

const Schema = mongoose.Schema

let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    hobbies: {
        type: String
    }
})

module.exports = mongoose.model('Student', studentSchema)