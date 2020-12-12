"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuarioLista {
    constructor() {
        this.lista = [];
    }
    // Agregar un usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log(` ==== Actualizando usuario ===`);
        console.log(this.lista);
    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista;
    }
    getUsuario(id) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }
    // Por regla de negocio solo puede haber un correo por cuenta
    getUsuarioPorUsername(username) {
        return this.lista.find(usuario => {
            return usuario.nombre === username;
        });
    }
    // Obtener usuarios en una sala en particular
    getUsuarioEnSala(sala) {
        return this.lista.filter(usuario => {
            return usuario.sala === sala;
        });
    }
    // Borrar usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.id != id;
        });
        console.log(this.lista);
        return tempUsuario;
    }
}
exports.UsuarioLista = UsuarioLista;
