import SocketIO, {Socket} from "socket.io";
import {UsuarioLista} from "../classes/usuario-lista";
import {Usuario} from "../classes/Usuario";

export const usuariosConectados =  new UsuarioLista();

export function conectarCliente(cliente: SocketIO.Socket) {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log(`Cliente desconectado`);
        usuariosConectados.borrarUsuario(cliente.id);
    });
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log(`Mensaje recibido`, payload);

        // Emitiendo un mensaje desde el servidor hacia el front
        io.emit('mensaje-nuevo', payload);

    });
};

// Escuchar event configurar-usuario
export const configurarUsuario = (cliente: Socket) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        })
    });
};
