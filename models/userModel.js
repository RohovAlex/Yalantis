const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        
    },
    croppedPhotoLink: {

    }
});

const model = mongoose.model('user', userSchema);

module.exports = model;