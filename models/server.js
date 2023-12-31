const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.path = {};


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use(cors());


        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {

        //this.app.use(this.path.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socket => {
            console.log('Cliente conectado', socket.id)

            socket.on('disconnect', () => {
                console.log('Cliente desconectado')
            });
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
