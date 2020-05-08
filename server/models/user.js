const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

    img: {
        type: String,
        required: false
    },

    status: {
        type: Boolean,
        default: true
    }
});

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.');

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin( uniqueValidator, {
    message: '{PATH} debe de ser unico'
} );

module.exports = mongoose.model('User', userSchema);