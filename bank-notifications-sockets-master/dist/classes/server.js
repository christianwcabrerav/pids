"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/sockets"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    start(callback) {
        // @ts-ignore
        this.httpServer.listen(this.port, callback);
    }
    escucharSockets() {
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
exports.default = Server;
