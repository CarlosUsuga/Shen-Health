const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username:{
        type:String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['SUPER_USER_ADMIN_ROLE', 'ADMIN_ROLE', 'USER_ROLE']
    },
    statu: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);