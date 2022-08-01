const Rol = require('../models/rol');
const User = require('../models/user');

const rolValido = async(rol = '') => {
    const existRole= await Rol.findOne({ rol });
    if(!existRole){
        throw new Error(`El rol ${ rol } no existe en la base de datos`);
    }
}

const emailValido = async( email = '') => {
    //Verificar si el correo existe
    const existEmail = await User.findOne({ email });
    if(existEmail){
        throw new Error(`El correo ${email}, ya esta registrado`);
    }
}

const userValidoID = async(id) => {
    //Verificar si el correo existe
    const existUser = await User.findById(id);
    if(existUser){
        throw new Error(`El id: ${id}, no se encuentra registrado`);
    }
}

module.exports = {
    rolValido,
    emailValido,
    userValidoID
}