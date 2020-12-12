import express from 'express';
import {SERVER_PORT} from '../global/environment';
import socketIO from 'socket.io'
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: Function) {

        // @ts-ignore
        this.httpServer.listen(this.port, callback);
    }

    private escucharSockets() {
        console.log(`Escuchando conexiones - sockets`);
        this.io.on('connection', cliente => {

            // Conectar cliente
            socket.conectarCliente(cliente);

            // Escuchando los  mensajes del frontend con el evento configurar-usuario
            socket.configurarUsuario(cliente);

            // Escuchando los mensajes del frontend con el evento 'mensaje'
            socket.mensaje(cliente, this.io);

            // Para detectar cuando un usuario se desconecta
            socket.desconectar(cliente);

        });
    }
}
