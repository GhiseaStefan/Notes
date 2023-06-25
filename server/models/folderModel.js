const mongoose = require('mongoose');
const { NoteSchema } = require('./noteModel');

const FolderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    noteList: {
        type: [NoteSchema],
        default: []
    }
});

const Folder = mongoose.model('Folder', FolderSchema);

module.exports = { Folder, FolderSchema };