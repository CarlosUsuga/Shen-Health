const express = require('express');
const cors = require('cors');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
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