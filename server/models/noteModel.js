const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = { NoteSchema };