const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async(req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { statu: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        total,
        users
    });
}

const usersPut = async(req, res = response) => {
    
    const {id} = req.params;
    const {_id, password, google, email, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
}

const usersPost = async(req, res = response) => {

    const { username, email, password, rol } = req.body;
    const user = new User( { username, email, password, rol } );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    //Guardar en la base de datos
    await user.save();

    res.json({
        user
    });
}

const usersDelete = async(req, res = response) => {
    const { id } = req.params;

    //Borrar datos fisicos
    //const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { statu: false} );


    res.json({
        user
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}