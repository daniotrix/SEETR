const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correp es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    telefono: {
        type: String,
        required: false,
        maxlength: 25
    },
    descripcion: {
        type: String,
        required: false,
        maxlength: 12000
    },
    descripcionCorta: {
        type: String,
        required: false,
        maxlength: 6000
    },
    fechanacimiento: {
        type: String,
        required: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})

module.exports = mongoose.model('Usuario', usuarioSchema);