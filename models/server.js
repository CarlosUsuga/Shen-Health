const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //conexión base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    routes(){
        
        this.app.use(this.usersPath, require('../routes/user'));
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());

        //Ditectorio publico
        this.app.use(express.static('public') );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('El servidor esta corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;