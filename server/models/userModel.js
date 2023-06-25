const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    folderList: {
        type: [mongoose.Types.ObjectId],
        ref: 'Folder'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };