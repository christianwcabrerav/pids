"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_lista_1 = require("../classes/usuario-lista");
const Usuario_1 = require("../classes/Usuario");
exports.usuariosConectados = new usuario_lista_1.UsuarioLista();
function conectarCliente(cliente) {
    const usuario = new Usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
}
exports.conectarCliente = conectarCliente;
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log(`Cliente desconectado`);
        exports.usuariosConectados.borrarUsuario(cliente.id);
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log(`Mensaje recibido`, payload);
        // Emitiendo un mensaje desde el servidor hacia el front
        io.emit('mensaje-nuevo', payload);
    });
};
// Escuchar event configurar-usuario
exports.configurarUsuario = (cliente) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
