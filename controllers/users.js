const { response, request } = require('express');

const usersGet = (req = request, res = response) => {
    
    const query = req.query;

    res.json({
        msg:'get API - Controllers', 
        query
    });
}

const usersPut = (req, res = response) => {
    
    const {id} = req.params;

    res.json({
        msg:'put API - Controllers',
        id
    });
}

const usersPost = (req, res = response) => {
    
    const {id, nombre, apellido, edad} = req.body;

    res.json({
        msg:'post API - Controllers',
        id, nombre, apellido, edad
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg:'delete API - Controllers'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}